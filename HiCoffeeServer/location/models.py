from django.db import models
from django.conf import settings


class CoffeeShop(models.Model):
    name = models.CharField(max_length=1024)
    description = models.TextField(null=True)
    total_rate = models.FloatField(null=True)
    max_price = models.BigIntegerField(null=True)
    minimun_price = models.BigIntegerField(null=True)
    image_represent = models.ImageField(
        upload_to='images/coffeshops/', blank=True)
    open_time = models.TimeField()
    closed_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20)
    location = models.CharField(max_length=1024, null=True, unique=True)
    latitude = models.CharField(max_length=50, null=True, verbose_name="Vĩ độ")
    longitude = models.CharField(
        max_length=50, null=True, verbose_name="Kinh độ")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    type = models.CharField(max_length=1024)

    def __str__(self):
        return self.type


class CoffeeShopCategory(models.Model):
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='types_cfs')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name='ctg', null=True)


class ImageCoffeeShop(models.Model):
    image = models.ImageField(upload_to='images/coffeshops/', blank=True)
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='imgs_cfs')
    created_at = models.DateTimeField(auto_now_add=True)


class FeedBack(models.Model):
    customer_fake = models.CharField(max_length=100, null=True)
    vote_rate = models.IntegerField()
    feedback = models.CharField(max_length=1000)
    coffee_shop = models.ForeignKey(
        CoffeeShop, on_delete=models.CASCADE, related_name='fb_cfs')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User: {customer_fake if user == None else user.first_name} - {feedback}"


class FeedBackImage(models.Model):
    feed_back = models.ForeignKey(
        FeedBack, on_delete=models.CASCADE, related_name='fb_images')
    image = models.ImageField(
        upload_to='images/feedbackCFS/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
