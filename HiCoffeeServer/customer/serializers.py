from rest_framework import serializers, fields
from .models import *
from location.models import *
from location.serializers import *


class InformationSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(input_formats=['%Y-%m-%d'])

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday', 'user', 'role')

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = ('role',)

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ('id', 'information', 'category')


class CheckInOrFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'information', 'coffee_shop', 'type')


class CheckInMarkerSerializer(serializers.ModelSerializer):
    coffee_shop = CoffeeShopLocationSerializer()

    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'coffee_shop')

