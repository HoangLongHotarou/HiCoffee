# Generated by Django 4.0.3 on 2022-05-09 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0003_alter_information_image_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='coffeeshop',
            name='latitude',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='coffeeshop',
            name='longitude',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='coffeeshop',
            name='image_represent',
            field=models.ImageField(blank=True, upload_to='images/coffeshops/'),
        ),
        migrations.AlterField(
            model_name='imagecoffeeshop',
            name='image',
            field=models.ImageField(blank=True, upload_to='images/coffeshops/'),
        ),
    ]
