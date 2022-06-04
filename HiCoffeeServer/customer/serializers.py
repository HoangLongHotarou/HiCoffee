from rest_framework import serializers, fields
from .models import *
from location.models import *
from location.serializers import *
from django.db import transaction
from core.serializers import UserSerializer


class PostOrPutInformationSerializer(serializers.ModelSerializer):
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


class SubHobbySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Hobby
        fields = ('id', 'category')


class AddHobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ('id', 'information', 'category')


class CheckInOrFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'information', 'coffee_shop', 'type')


class GetSubCheckInOrFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInOrFavorite
        fields = ('id','coffee_shop','type')

class MarkerSerializer(serializers.ModelSerializer):
    coffee_shop = CoffeeShopLocationSerializer()

    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'coffee_shop', 'type')


class GetMarksSerializer(serializers.ModelSerializer):

    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'coffee_shop', 'type')


class AddCheckInOfFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInOrFavorite
        fields = ('id', 'coffee_shop', 'type')

    def save(self, **kwargs):
        with transaction.atomic():
            coffee_shop = self.validated_data['coffee_shop']
            type = self.validated_data['type']
            info = self.context['info']
            self.instance = CheckInOrFavorite.objects.create(
                coffee_shop=coffee_shop,
                type=type,
                information_id=info.id
            )
            return self.instance


class InformationSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(input_formats=['%Y-%m-%d'])
    user = UserSerializer()
<<<<<<< HEAD
    info_mark = GetSubCheckInOrFavoriteSerializer(many=True)

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday',
                  'user', 'role','info_hobbies','info_mark')
=======
    info_hobbies = SubHobbySerializer(many=True)
    info_marks = GetMarksSerializer(many=True)

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday', 'user',
                  'role', 'info_hobbies', 'info_marks')
>>>>>>> api
