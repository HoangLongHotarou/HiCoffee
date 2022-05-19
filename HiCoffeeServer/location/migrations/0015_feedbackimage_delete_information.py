# Generated by Django 4.0.3 on 2022-05-17 18:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0014_alter_coffeeshop_location_alter_coffeeshop_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedBackImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='images/feedbackCFS/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('feed_back', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fb_images', to='location.feedback')),
            ],
        ),
        migrations.DeleteModel(
            name='Information',
        ),
    ]