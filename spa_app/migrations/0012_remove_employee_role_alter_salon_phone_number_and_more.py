# Generated by Django 5.0.6 on 2024-06-21 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0011_alter_salon_phone_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='role',
        ),
        migrations.AlterField(
            model_name='salon',
            name='phone_number',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='servicerole',
            name='procedures',
            field=models.ManyToManyField(related_name='procedures', to='spa_app.procedure'),
        ),
        migrations.AddField(
            model_name='employee',
            name='role',
            field=models.ManyToManyField(related_name='massage_therapists', to='spa_app.servicerole'),
        ),
    ]