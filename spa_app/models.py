from datetime import timedelta

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


class SpaUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)


class Salon(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.IntegerField()

    # categories = models.ForeignKey('SpaСategories', on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name


class ServiceRole(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000, blank=True, null=True)
    procedures = models.ManyToManyField('Procedure', related_name='procedures')

    def __str__(self):
        return self.name


class Employee(models.Model):
    user = models.OneToOneField(SpaUser, on_delete=models.CASCADE)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='therapists')
    role = models.ManyToManyField(ServiceRole, related_name='massage_therapists')
    rating = models.FloatField(default=5.0, blank=True, null=True)
    review_count = models.IntegerField(default=0)

    def update_rating(self):
        self.review_count = self.reviews.count()
        total_rating = sum(review.rating for review in self.reviews.all())
        if self.review_count > 0:
            self.rating = round(total_rating / self.review_count, 2)
            self.save()
        else:
            self.rating = 0

    def __str__(self):
        return f"{self.user.username} {self.salon}"


PROCEDURE_TYPE = (
    (timedelta(minutes=60), 'Regular'),
    (timedelta(minutes=90), 'Long'),
)


class Schedule(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()


class Record(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    procedure = models.ForeignKey('Procedure', on_delete=models.CASCADE)


class Composition(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)

    def __str__(self):
        return f"{self.name} - {self.description}"


class Procedure(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.DurationField(choices=PROCEDURE_TYPE)
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


class Review(models.Model):
    user = models.ForeignKey(SpaUser, on_delete=models.CASCADE, related_name='reviews')
    therapist = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField(max_length=1000)
    rating = models.FloatField(default=5.0)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.therapist.update_rating()
