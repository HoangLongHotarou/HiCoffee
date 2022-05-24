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
        fields = ('id','type',)


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


class PostOrPutCoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('name', 'description', 'max_price', 'minimum_price',
                  'image_represent', 'open_time', 'closed_time',
                  'phone_number', 'location', 'latitude', 'longitude')


class CoffeeShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'description', 'max_price', 'minimum_price',
                  'image_represent', 'open_time', 'closed_time',
                  'phone_number', 'location', 'latitude', 'longitude', 'owner')


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


class PostAndPutCoffeeShopTypeOwnerSerializer(serializers.Serializer):
    id_categories = serializers.CharField(max_length=50)
    type = serializers.BooleanField()

    def save(self, **kwargs):
        with transaction.atomic():
            coffee_shop_id = kwargs['coffee_shop_id']
            ids = self.validated_data['id_categories'].split(',')
            categories = [CoffeeShopCategory(
                category_id=id, coffee_shop_id=coffee_shop_id) for id in ids]
            if self.validated_data['type'] == True:
                cfs_categories = CoffeeShopCategory.objects.bulk_create(
                    categories)
            else:
                CoffeeShopCategory.objects.filter(coffee_shop_id=coffee_shop_id).delete()
                cfs_categories = CoffeeShopCategory.objects.bulk_create(
                    categories)
            return cfs_categories


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
    # total_rate = serializers.SerializerMethodField(
    #     method_name='calculate_rate')

    class Meta:
        model = CoffeeShop
        fields = ('id', 'name', 'description', 'total_rate', 'max_price', 'minimum_price',
                  'image_represent', 'open_time', 'closed_time', 'updated_at',
                  'phone_number', 'location', 'latitude', 'longitude', 'types_cfs', 'imgs_cfs')


class PostAndPutFeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = ('vote_rate', 'feedback', 'user', 'customer_fake')

    def calculate_rate(self, coffee_shop_id):
        cf = CoffeeShop.objects.get(pk=coffee_shop_id)
        vote_rates = FeedBack.objects.select_related('coffee_shop').filter(
            coffee_shop=cf).values_list('vote_rate', flat=True)
        count = len(vote_rates)
        mean_rate = round(sum(vote_rates)/count, 2) if count > 0 else 0
        cf.total_rate = mean_rate
        cf.save()

    def save(self, **kwargs):
        with transaction.atomic():
            self.instance = FeedBack.objects.create(
                vote_rate=self.validated_data['vote_rate'],
                feedback=self.validated_data['feedback'],
                customer_fake=self.validated_data['customer_fake'],
                user=self.validated_data['user'],
                coffee_shop_id=kwargs['coffee_shop_id']
            )
            self.calculate_rate(kwargs['coffee_shop_id'])
            return self.instance

    def modify(self, **kwargs):
        with transaction.atomic():
            self.instance = get_object_or_404(FeedBack, pk=kwargs['id'])
            self.instance.vote_rate = self.validated_data['vote_rate']
            self.instance.feedback = self.validated_data['feedback']
            self.instance.customer_fake = self.validated_data['customer_fake']
            self.instance.user = self.validated_data['user']
            self.instance.save()
            self.calculate_rate(kwargs['coffee_shop_id'])
            return self.instance
