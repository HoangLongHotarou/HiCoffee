from rest_framework import serializers
from .models import *
from django.db import transaction
from django.shortcuts import get_object_or_404


class CoffeeShopNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('name',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('type',)


class GetCoffeeShopCategorySerializer(serializers.ModelSerializer):
    coffee_shop = CoffeeShopNameSerializer()
    category = CategorySerializer()

    class Meta:
        model = CoffeeShopCategory
        fields = ('id', 'coffee_shop', 'category')


class GetNameCoffeeShopCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = CoffeeShopCategory
        fields = ('category',)


class CoffeeShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShopCategory
        fields = ('id', 'coffee_shop', 'category')


class GetImageCoffeeShopSerializer(serializers.ModelSerializer):
    coffee_shop = CoffeeShopNameSerializer()

    class Meta:
        model = ImageCoffeeShop
        fields = ('id', 'coffee_shop', 'image')


class GetSubImageCoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageCoffeeShop
        fields = ('image',)


class ImageCoffeeShopSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageCoffeeShop
        fields = ('id', 'coffee_shop', 'image')


class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = ('id', 'image_link', 'birthday', 'user_name')


class GetFeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = ('id', 'vote_rate', 'feedback', 'user', 'customer_fake')


class FeedBackSerializer(serializers.ModelSerializer):

    class Meta:
        model = FeedBack
        fields = ('id', 'vote_rate', 'feedback', 'user', 'customer_fake')


class CoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'description', 'total_rate', 'max_price', 'minimun_price',
                  'image_represent', 'open_time', 'closed_time',
                  'phone_number', 'location', 'latitude', 'longitude')


class GetCoffeeShopSerializer(serializers.ModelSerializer):
    types_cfs = GetNameCoffeeShopCategorySerializer(many=True)
    imgs_cfs = GetSubImageCoffeeShopSerializer(many=True)

    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'description', 'total_rate', 'max_price', 'minimun_price',
                  'image_represent', 'open_time', 'closed_time', 'updated_at',
                  'phone_number', 'location', 'latitude', 'longitude', 'types_cfs', 'imgs_cfs')


class PostFeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = ('vote_rate', 'feedback', 'user', 'customer_fake')

    def save(self, **kwargs):
        with transaction.atomic():
            self.instance = FeedBack.objects.create(
                vote_rate=self.validated_data['vote_rate'],
                feedback=self.validated_data['feedback'],
                customer_fake=self.validated_data['customer_fake'],
                user=self.validated_data['user'],
                coffee_shop_id=kwargs['coffee_shop_id']
            )
            return self.instance

    def modify(self, **kwargs):
        with transaction.atomic():
            self.instance = get_object_or_404(FeedBack, pk=kwargs['id'])
            self.instance = FeedBack(
                vote_rate=self.validated_data['vote_rate'],
                feedback=self.validated_data['feedback'],
                customer_fake=self.validated_data['customer_fake'],
                user=self.validated_data['user'],
                coffee_shop_id=kwargs['coffee_shop_id']
            )
            return self.instance
