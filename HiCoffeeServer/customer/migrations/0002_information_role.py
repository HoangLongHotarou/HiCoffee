# Generated by Django 4.0.3 on 2022-05-19 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='information',
            name='role',
            field=models.IntegerField(choices=[(1, 'Customer'), (2, 'Owner')], default=1),
        ),
    ]
