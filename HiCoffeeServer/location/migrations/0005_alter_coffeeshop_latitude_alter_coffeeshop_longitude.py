# Generated by Django 4.0.3 on 2022-05-09 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0004_coffeeshop_latitude_coffeeshop_longitude_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coffeeshop',
            name='latitude',
            field=models.CharField(max_length=50, null=True, verbose_name='Vĩ độ'),
        ),
        migrations.AlterField(
            model_name='coffeeshop',
            name='longitude',
            field=models.CharField(max_length=50, null=True, verbose_name='Kinh độ'),
        ),
    ]