from rest_framework import serializers
from .models import CofferShop


class CoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = CofferShop
        fields = ('id', 'name', 'rate')
