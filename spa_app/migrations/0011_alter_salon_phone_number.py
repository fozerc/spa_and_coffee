# Generated by Django 5.0.6 on 2024-06-21 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0010_rename_servicetype_servicerole_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salon',
            name='phone_number',
            field=models.IntegerField(max_length=15),
        ),
    ]