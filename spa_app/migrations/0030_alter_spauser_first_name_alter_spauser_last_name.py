# Generated by Django 5.0.6 on 2024-07-08 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0029_employee_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spauser',
            name='first_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='spauser',
            name='last_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
