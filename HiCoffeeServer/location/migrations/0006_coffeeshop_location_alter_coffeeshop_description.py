# Generated by Django 4.0.3 on 2022-05-09 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0005_alter_coffeeshop_latitude_alter_coffeeshop_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='coffeeshop',
            name='location',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='coffeeshop',
            name='description',
            field=models.TextField(null=True),
        ),
    ]
