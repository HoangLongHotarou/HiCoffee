from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('coffeeshop', CoffeeShopViewSet, basename="coffeeshop")
router.register('category', CategoryViewSet, basename="category")
router.register('coffeeshopcategory', CoffeeShopCategoryViewSet,
                basename="coffeeshopcategory")
router.register('imagecoffeeshop', ImageCoffeeShopViewSet,
                basename="imagecoffeeshop")
router.register('feedback', FeedBackViewSet, basename="feedback")
# router.register('information',InformationViewSet,basename="information")

urlpatterns = router.urls
