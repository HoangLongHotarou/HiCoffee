from django.db import models

class CofferShop(models.Model):
    name = models.CharField(max_length=1024)
    rate = models.IntegerField()
