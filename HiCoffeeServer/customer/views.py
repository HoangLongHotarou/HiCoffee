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


class InformationViewSet(ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        info = Information.objects.get(user_id=request.user.pk)
        if request.method == 'GET':
            serializer = InformationSerializer(info)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = InformationSerializer(info, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
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
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer


class CheckInViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=1)
    serializer_class = CheckInOrFavoriteSerializer


class FavoriteViewSet(ModelViewSet):
    queryset = CheckInOrFavorite.objects.filter(type=2)
    serializer_class = CheckInOrFavoriteSerializer


class CheckInMakerViewSet(ModelViewSet):
    http_method_names = ['get']
    pagination_class = DefaultPagination
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CheckInMarkerSerializer

    def get_queryset(self):
        user = self.request.user
        info_id = Information.objects.only(
            'id').filter(user_id=user.id).first()
        return CheckInOrFavorite.objects.select_related('coffee_shop').filter(information_id=info_id, type=1)


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
