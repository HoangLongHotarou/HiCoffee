from rest_framework import serializers
from .models import *
from django.db import transaction
from django.shortcuts import get_object_or_404


class CoffeeShopNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('name',)


class CoffeeShopLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'image_represent',
                  'location', 'latitude', 'longitude')


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


class GetImageCoffeeShopSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageCoffeeShop
        fields = ('id', 'image')


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


class PostAndPutImageCoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageCoffeeShop
        fields = ('id', 'image')

    def save(self, **kwargs):
        with transaction.atomic():
            self.instance = ImageCoffeeShop.objects.create(
                image=self.validated_data['image'],
                coffee_shop_id=kwargs['coffee_shop_id']
            )
            return self.instance

    def modify(self, **kwargs):
        with transaction.atomic():
            self.instance = get_object_or_404(
                ImageCoffeeShop, pk=kwargs['id'])
            self.instance.image = self.validated_data['image']
            self.instance.save()
            return self.instance


class GetCoffeeShopCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = CoffeeShopCategory
        fields = ('id', 'category')


class PostAndPutCoffeeShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShopCategory
        fields = ('category',)

    def save(self, **kwargs):
        with transaction.atomic():
            self.instance = CoffeeShopCategory.objects.create(
                category=self.validated_data['category'],
                coffee_shop_id=kwargs['coffee_shop_id']
            )
            return self.instance

    def modify(self, **kwargs):
        with transaction.atomic():
            self.instance = get_object_or_404(
                CoffeeShopCategory, pk=kwargs['id'])
            self.instance.category = self.validated_data['category']
            self.instance.save()
            return self.instance


class GetCoffeeShopSerializer(serializers.ModelSerializer):
    types_cfs = GetNameCoffeeShopCategorySerializer(many=True)
    imgs_cfs = GetSubImageCoffeeShopSerializer(many=True)

    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'description', 'total_rate', 'max_price', 'minimun_price',
                  'image_represent', 'open_time', 'closed_time', 'updated_at',
                  'phone_number', 'location', 'latitude', 'longitude', 'types_cfs', 'imgs_cfs')


class PostAndPutFeedBackSerializer(serializers.ModelSerializer):
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
            self.instance.vote_rate = self.validated_data['vote_rate']
            self.instance.feedback = self.validated_data['feedback']
            self.instance.customer_fake = self.validated_data['customer_fake']
            self.instance.user = self.validated_data['user']
            self.instance.save()
            return self.instance
