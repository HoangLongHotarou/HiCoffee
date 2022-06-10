from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import *
from .models import *
from .pagination import DefaultPagination
from location.serializers import *
from .permissions import IsAdminOwnerOrReadOnly
from location.views import CoffeeShopViewSet, CoffeeShopCategoryViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .filters import CheckInOrFavoriteFilter


class InformationViewSet(ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    pagination_class = DefaultPagination

    def get_queryset(self):
        print(self.kwargs)
        return Information.objects.prefetch_related(
            "info_marks", "info_hobbies").all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return InformationSerializer
        if (self.request.method == 'POST' or self.request.method == 'PUT') and self.request.user.is_staff:
            return PostOrPutForAdminInformationSerializer
        return PutForUserInformationSerializer

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        info = Information.objects.prefetch_related(
            "info_marks", "info_hobbies").get(user_id=request.user.pk)
        if request.method == 'GET':
            serializer = InformationSerializer(info)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = PutForUserInformationSerializer(
                info, data=request.data)
            serializer.is_valid(raise_exception=True)
            info = serializer.save(me=True, id_user=request.user.pk)
            serializer = InformationSerializer(info)
            return Response(serializer.data)

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def role(self, request):
        info = Information.objects.get(user_id=request.user.pk)
        if request.method == 'GET':
            serializer = InformationSerializer(info)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = RoleSerializer(info, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class HobbyViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        INFO_ID = Information.objects.only(
            'id').filter(user_id=user.id).first()
        return Hobby.objects.select_related('category').filter(information_id=INFO_ID)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddHobbyUserSerializer
        return HobbySerializer

    def create(self, request, *args, **kwargs):
        serializers = AddHobbyUserSerializer(
            data=request.data)
        serializers.is_valid(raise_exception=True)
        INFO = Information.objects.only(
            'id').filter(user_id=request.user.pk).first()
        data = serializers.save(info_id=INFO.id)
        serializers = HobbySerializer(data, many=True)
        return Response(serializers.data)


class CheckInViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=1)
    serializer_class = CheckInOrFavoriteSerializer


class FavoriteViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=2)
    serializer_class = CheckInOrFavoriteSerializer


class CheckInOrFavoriteMakerViewSet(ModelViewSet):
    # http_method_names = ['get', 'delete', 'post']
    pagination_class = DefaultPagination
    permission_classes = [permissions.IsAuthenticated]
    # serializer_class = CheckInMarkerSerializer
    filter_backends = [DjangoFilterBackend]
    filter_class = CheckInOrFavoriteFilter

    INFO_ID = None

    def get_queryset(self):
        user = self.request.user
        self.INFO_ID = Information.objects.only(
            'id').filter(user_id=user.id).first()
        return CheckInOrFavorite.objects.select_related('coffee_shop').filter(information_id=self.INFO_ID)

    def get_serializer_context(self):
        return {'info': Information.objects.only('id').filter(user_id=self.request.user.id).first()}

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MarkerSerializer
        return AddCheckInOfFavoriteSerializer


class CoffeeShopOwnerViewSet(CoffeeShopViewSet):
    permission_classes = [IsAdminOwnerOrReadOnly]

    def get_queryset(self):
        return CoffeeShop.objects.prefetch_related(
            'types_cfs__category', 'imgs_cfs').filter(owner_id=self.request.user.pk)

    def create(self, request, *args, **kwargs):
        serializers = PostOrPutCoffeeShopSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        data = serializers.save()
        data.owner_id = self.request.user.pk
        data.save()
        serializer = CoffeeShopSerializer(data)
        return Response(serializer.data)


class CoffeeShopCategoryOwnerViewSet(CoffeeShopCategoryViewSet):
    permission_classes = [IsAdminOwnerOrReadOnly]
    http_method_names = ['get', 'post', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetCoffeeShopCategorySerializer
        return PostAndPutCoffeeShopTypeOwnerSerializer

    def create(self, request, *args, **kwargs):
        serializers = PostAndPutCoffeeShopTypeOwnerSerializer(
            data=request.data)
        serializers.is_valid(raise_exception=True)
        data = serializers.save(coffee_shop_id=kwargs['coffeeshop_pk'])
        serializers = GetCoffeeShopCategorySerializer(data, many=True)
        return Response(serializers.data)

