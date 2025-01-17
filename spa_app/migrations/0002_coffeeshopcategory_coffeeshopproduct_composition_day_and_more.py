# Generated by Django 5.0.6 on 2024-06-13 19:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoffeeShopCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CoffeeShopProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField(max_length=1000)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Composition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Salon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=15)),
            ],
        ),
        migrations.RemoveField(
            model_name='spauser',
            name='avatar',
        ),
        migrations.AddField(
            model_name='spauser',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='spauser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_image/'),
        ),
        migrations.CreateModel(
            name='MassageTherapist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('salon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='therapists', to='spa_app.salon')),
            ],
        ),
        migrations.CreateModel(
            name='TherapistAvailability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spa_app.day')),
                ('therapist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spa_app.massagetherapist')),
            ],
        ),
        migrations.CreateModel(
            name='TypeCategories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('duration', models.DurationField()),
                ('type_categories_image', models.ImageField(blank=True, null=True, upload_to='type_categories_image/')),
                ('composition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='composition', to='spa_app.composition')),
            ],
        ),
        migrations.CreateModel(
            name='SpaСategories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('categories_image', models.ImageField(blank=True, null=True, upload_to='categories_image/')),
                ('type_categories', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='type_categories', to='spa_app.typecategories')),
            ],
        ),
    ]
