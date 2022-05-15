from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from .pagination import DefaultPagination
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
# Create your views here.


class CoffeeShopViewSet(ModelViewSet):
    queryset = CoffeeShop.objects.prefetch_related(
        'types_cfs__category', 'imgs_cfs').all()
    pagination_class = DefaultPagination
    # serializer_class = CoffeeShopSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetCoffeeShopSerializer
        return CoffeeShopSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CoffeeShopCategoryViewSet(ModelViewSet):
    queryset = CoffeeShopCategory.objects.select_related(
        'coffee_shop', 'category').all()

    pagination_class = DefaultPagination

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetCoffeeShopCategorySerializer
        return CoffeeShopCategorySerializer


class ImageCoffeeShopViewSet(ModelViewSet):
    pagination_class = DefaultPagination
    queryset = ImageCoffeeShop.objects.select_related('coffee_shop').all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetImageCoffeeShopSerializer
        return ImageCoffeeShopSerializer


class InformationViewSet(ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class FeedBackViewSet(ModelViewSet):
    pagination_class = DefaultPagination

    def get_queryset(self):
        return FeedBack.objects.filter(coffee_shop_id=self.kwargs['coffeeshop_pk'])

    def get_serializer_context(self):
        return {"request": self.request}

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetFeedBackSerializer
        return PostFeedBackSerializer

    def create(self, request, *args, **kwargs):
        serializers = PostFeedBackSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        data = serializers.save(coffee_shop_id=kwargs['coffeeshop_pk'])
        serializer = GetFeedBackSerializer(data)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        serializers = PostFeedBackSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        data = serializers.modify(
            coffee_shop_id=kwargs['coffeeshop_pk'], id=kwargs['pk'])
        serializer = GetFeedBackSerializer(data)
        return Response(serializer.data)
