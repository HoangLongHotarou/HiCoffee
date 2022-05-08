from rest_framework.viewsets import ModelViewSet
from .models import CoffeeShop
from .serializers import CoffeeShopSerializer
# Create your views here.

class CoffeeShopViewSet(ModelViewSet):
    queryset = CoffeeShop.objects.all()
    serializer_class = CoffeeShopSerializer