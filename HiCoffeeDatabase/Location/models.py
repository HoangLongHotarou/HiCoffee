from django.db import models
from django.conf import settings


class CoffeeShop(models.Model):
    name = models.CharField(max_length=1024)
    description = models.CharField(max_length=2048, blank=True)
    total_rate = models.FloatField()
    image_represent = models.ImageField(upload_to='images/', blank=True)
    open_time = models.TimeField()
    closed_time = models.TimeField()
    create_at = models.DateTimeField(auto_created=True)
    phone_number = models.CharField(max_length=20)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.SET_NULL, null=True)


class Category(models.Model):
    type = models.CharField(max_length=1024)


class CoffeeShopCategory(models.Model):
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='cfs')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name='ctg',null=True)


class ImageCoffeeShop(models.Model):
    image = models.ImageField(upload_to='images/', blank=True)
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='img_cfs')


class Information(models.Model):
    image_link = models.CharField(max_length=1000)
    birthday = models.DateTimeField(auto_now_add=True)
    user_name = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class FeedBack(models.Model):
    vote_rate = models.IntegerField()
    feedback = models.CharField(max_length=1000)
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='fb_cfs')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)
