# Generated by Django 5.0.6 on 2024-06-20 21:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0009_rename_type_of_categories_servicetype_procedures_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ServiceType',
            new_name='ServiceRole',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='type',
            new_name='role',
        ),
    ]