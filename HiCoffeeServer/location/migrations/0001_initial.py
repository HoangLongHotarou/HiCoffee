# Generated by Django 4.0.3 on 2022-05-08 04:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=1024)),
            ],
        ),
        migrations.CreateModel(
            name='CoffeeShop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=1024)),
                ('description', models.CharField(blank=True, max_length=2048)),
                ('total_rate', models.FloatField()),
                ('image_represent', models.ImageField(blank=True, upload_to='images/')),
                ('open_time', models.TimeField()),
                ('closed_time', models.TimeField()),
                ('phone_number', models.CharField(max_length=20)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Information',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_link', models.CharField(max_length=1000)),
                ('birthday', models.DateTimeField(auto_now_add=True)),
                ('user_name', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ImageCoffeeShop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='images/')),
                ('coffee_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='img_cfs', to='location.coffeeshop')),
            ],
        ),
        migrations.CreateModel(
            name='FeedBack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vote_rate', models.IntegerField()),
                ('feedback', models.CharField(max_length=1000)),
                ('coffee_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fb_cfs', to='location.coffeeshop')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CoffeeShopCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ctg', to='location.category')),
                ('coffee_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cfs', to='location.coffeeshop')),
            ],
        ),
    ]