from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register('coffeeshops', CoffeeShopViewSet, basename="coffeeshops")
router.register('categories', CategoryViewSet, basename="categories")
router.register('coffeeshopcategories', CoffeeShopCategoryViewSet,
                basename="coffeeshopcategories")
router.register('imagecoffeeshops', ImageCoffeeShopViewSet,
                basename="imagecoffeeshops")
# router.register('feedback', FeedBackViewSet, basename="feedback")
# router.register('information',InformationViewSet,basename="information")
coffeeshop_router = routers.NestedDefaultRouter(router,'coffeeshops',lookup='coffeeshop')
coffeeshop_router.register('feedbacks', FeedBackViewSet, basename='feedbacks')
urlpatterns = router.urls + coffeeshop_router.urls
