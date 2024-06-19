from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


class SpaUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)


class Salon(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)

    # categories = models.ForeignKey('SpaСategories', on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name


class ServiceType(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000, blank=True, null=True)
    type_of_categories = models.ManyToManyField('Procedure', related_name='type_of_categories')

    def __str__(self):
        return self.name


class Employee(models.Model):
    user = models.OneToOneField(SpaUser, on_delete=models.CASCADE)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='therapists')
    type = models.ForeignKey(ServiceType, on_delete=models.CASCADE, related_name='massage_therapists')

    def __str__(self):
        return f"{self.user.username} {self.salon}"


class Composition(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)

    def __str__(self):
        return f"{self.name} - {self.description}"


class Procedure(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.DurationField()
    composition = models.ForeignKey(Composition, on_delete=models.CASCADE, related_name='composition')
    image = models.ImageField(upload_to='type_categories_image/', blank=True, null=True)

    def __str__(self):
        return self.name


class CoffeeCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CoffeeProduct(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField(max_length=1000)
    image = models.ImageField(blank=True, null=True)
    category = models.ForeignKey(CoffeeCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
