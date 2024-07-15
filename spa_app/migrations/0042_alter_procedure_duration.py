# Generated by Django 5.0.6 on 2024-07-15 15:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0041_blog_news'),
    ]

    operations = [
        migrations.AlterField(
            model_name='procedure',
            name='duration',
            field=models.DurationField(blank=True, choices=[(datetime.timedelta(seconds=3600), 'Regular'), (datetime.timedelta(seconds=5400), 'Long'), (datetime.timedelta(seconds=7200), 'Very Long')], null=True),
        ),
    ]
