# Generated by Django 5.0.6 on 2024-06-23 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0014_alter_procedure_duration_schedule_record'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='start_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
