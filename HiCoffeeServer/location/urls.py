from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register('coffeeshops', CoffeeShopViewSet, basename="coffeeshops")
router.register('categories', CategoryViewSet, basename="categories")
coffeeshop_router = routers.NestedDefaultRouter(
    router, 'coffeeshops', lookup='coffeeshop')
coffeeshop_router.register('feedbacks', FeedBackViewSet, basename='feedbacks')
coffeeshop_router.register(
    'cfscategories', CoffeeShopCategoryViewSet, basename='cfscategories')
coffeeshop_router.register(
    'imagecoffeeshops', ImageCoffeeShopViewSet, basename='imagecoffeeshops')

feedback_router = routers.NestedDefaultRouter(
    coffeeshop_router, 'feedbacks', lookup='feedback')
feedback_router.register('images', ImagesFeedBackViewSet, basename='images')

urlpatterns = router.urls + coffeeshop_router.urls + feedback_router.urls
