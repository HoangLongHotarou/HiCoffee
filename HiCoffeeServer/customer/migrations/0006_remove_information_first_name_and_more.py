# Generated by Django 4.0.3 on 2022-06-10 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0005_information_first_name_information_last_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='information',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='information',
            name='last_name',
        ),
    ]
