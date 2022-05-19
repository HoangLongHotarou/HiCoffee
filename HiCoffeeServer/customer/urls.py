from rest_framework_nested import routers
from .views import *

router = routers.DefaultRouter()
router.register('information', InformationViewSet, basename="information")
router.register('hobbies', HobbyViewSet, basename="hobbies")
router.register('checkins', CheckInViewSet,
                basename="checkins")
router.register('favorites', FavoriteViewSet,
                basename="favorites")
router.register('checkinmarker', CheckInMakerViewSet, basename='checkinmarker')
urlpatterns = router.urls
