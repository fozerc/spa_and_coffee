# Generated by Django 5.0.6 on 2024-06-16 18:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spa_app', '0004_alter_coffeeshopproduct_price'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CoffeeShopCategory',
            new_name='CoffeeCategory',
        ),
        migrations.CreateModel(
            name='CoffeeProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('description', models.TextField(max_length=1000)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spa_app.coffeecategory')),
            ],
        ),
        migrations.DeleteModel(
            name='CoffeeShopProduct',
        ),
    ]
