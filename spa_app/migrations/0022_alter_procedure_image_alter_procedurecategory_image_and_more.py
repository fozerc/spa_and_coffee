# Generated by Django 5.0.6 on 2024-07-07 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0021_alter_procedure_image_alter_spauser_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='procedure',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='procedurecategory',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='spauser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]