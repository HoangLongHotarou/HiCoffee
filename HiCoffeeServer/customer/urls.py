from rest_framework_nested import routers
from .views import *
from location.views import ImageCoffeeShopViewSet

router = routers.DefaultRouter()
router.register('information', InformationViewSet, basename="information")
router.register('hobbies', HobbyViewSet, basename="hobbies")
# router.register('checkins', CheckInViewSet,
#                 basename="checkins")
# router.register('favorites', FavoriteViewSet,
#                 basename="favorites")
router.register('marker', CheckInOrFavoriteMakerViewSet, basename='marker')
router.register('cfsowner', CoffeeShopOwnerViewSet, basename='cfsowner')

coffeeshop_router = routers.NestedDefaultRouter(
    router, 'cfsowner', lookup='coffeeshop')
coffeeshop_router.register(
    'cfstypes', CoffeeShopCategoryOwnerViewSet, basename='cfstypes')
coffeeshop_router.register(
    'imagecfs', ImageCoffeeShopViewSet, basename='imagecfs')
urlpatterns = router.urls + coffeeshop_router.urls
