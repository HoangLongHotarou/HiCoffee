from django.db import models
from django.conf import settings
from location.models import *
# Create your models here.


# class Information(models.Model):
#     image_link = models.ImageField(upload_to='images/users/', blank=True)
#     birthday = models.DateTimeField(auto_now_add=True)
#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Information(models.Model):
    image_link = models.ImageField(upload_to='images/users/', blank=True)
    birthday = models.DateField(auto_now_add=True)
    TYPE = ((1, 'Customer'), (2, 'Owner'))
    role = models.IntegerField(choices=TYPE, default=1)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Hobby(models.Model):
    information = models.ForeignKey(
        Information, on_delete=models.CASCADE, related_name='info_hobbies')
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='ctg_hobbies')


class CheckInOrFavorite(models.Model):
    information = models.ForeignKey(
        Information, on_delete=models.CASCADE, related_name='info_checkins')
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='cfs_checkins')
    TYPE = ((1, 'CheckIn'), (2, 'Favorites'))
    type = models.IntegerField(choices=TYPE)
