from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('coffeeshop', CoffeeShopViewSet,basename="coffeeshop")

urlpatterns = router.urls