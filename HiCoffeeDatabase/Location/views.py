from rest_framework.viewsets import ModelViewSet
from .models import CofferShop
from .serializers import CoffeeShopSerializer
# Create your views here.

class CoffeeShopViewSet(ModelViewSet):
    queryset = CofferShop.objects.all()
    serializer_class = CoffeeShopSerializer