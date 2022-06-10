from rest_framework import serializers, fields
from .models import *
from core.models import *
from location.models import *
from location.serializers import *
from django.db import transaction
from core.serializers import UserSerializer


class PutForUserInformationSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(input_formats=['%Y-%m-%d'])
    first_name = serializers.CharField(
        max_length=50, write_only=True, allow_blank=True)
    last_name = serializers.CharField(
        max_length=50, write_only=True, allow_blank=True)

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday',
                  'role', 'first_name', 'last_name')

    def save(self, **kwargs):
        if kwargs['me'] == True:
            first_name = self.validated_data['first_name']
            last_name = self.validated_data['last_name']
            if first_name or last_name:
                user = User.objects.get(id=kwargs['id_user'])
                if first_name:
                    user.first_name = first_name
                if last_name:
                    user.last_name = last_name
                user.save()
        return super().save(**kwargs)


class PostOrPutForAdminInformationSerializer(serializers.ModelSerializer):
    birthday = fields.DateField(input_formats=['%Y-%m-%d'])

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday', 'user', 'role')


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = ('role',)


class HobbySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Hobby
        fields = ('category',)


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
        fields = ('id', 'coffee_shop', 'type')


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
    info_hobbies = SubHobbySerializer(many=True)
    info_marks = GetMarksSerializer(many=True)

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'user', 'birthday',
                  'role', 'info_hobbies', 'info_marks')


class ResponseInfoUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday', 'user',
                  'role')


class AddHobbyUserSerializer(serializers.Serializer):
    id_categories = serializers.CharField(max_length=50)

    def save(self, **kwargs):
        with transaction.atomic():
            info_id = kwargs['info_id']
            ids = self.validated_data['id_categories'].split(',')
            hobbies = [Hobby(
                information_id=info_id, category_id=id) for id in ids]
            Hobby.objects.filter(
                information_id=info_id).delete()
            hobbies_user = Hobby.objects.bulk_create(
                hobbies)
            return hobbies_user
