# Generated by Django 4.0.3 on 2022-05-19 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_information_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='birthday',
            field=models.DateField(auto_now_add=True),
        ),
    ]
