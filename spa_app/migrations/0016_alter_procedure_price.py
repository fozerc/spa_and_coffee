# Generated by Django 5.0.6 on 2024-06-23 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0015_record_start_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='procedure',
            name='price',
            field=models.DecimalField(decimal_places=1, max_digits=10),
        ),
    ]
