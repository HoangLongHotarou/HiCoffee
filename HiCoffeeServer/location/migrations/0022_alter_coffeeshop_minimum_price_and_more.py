# Generated by Django 4.0.3 on 2022-06-10 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0021_alter_coffeeshop_minimum_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coffeeshop',
            name='minimum_price',
            field=models.BigIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='coffeeshop',
            name='total_rate',
            field=models.FloatField(default=0),
        ),
    ]
