from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.db import models


class SpaUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(default='../media/default_profile_image/default-avatar.jpg', )
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)


class Salon(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.IntegerField()

    def __str__(self):
        return self.name


class ServiceRole(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000, blank=True, null=True)
    procedures = models.ManyToManyField('Procedure', related_name='roles')
    employees = models.ManyToManyField('Employee', related_name='employee_roles')
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Employee(models.Model):
    user = models.OneToOneField(SpaUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='therapists')
    role = models.ManyToManyField(ServiceRole, related_name='roles')
    rating = models.FloatField(default=5.0, blank=True, null=True)
    review_count = models.IntegerField(default=0)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    def update_rating(self):
        self.review_count = self.reviews.count()
        total_rating = sum(review.rating for review in self.reviews.all())
        if self.review_count > 0:
            self.rating = round(total_rating / self.review_count, 2)
            self.save()
        else:
            self.rating = 0

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for role in self.role.all():
            if not role.employees.filter(pk=self.pk).exists():
                role.employees.add(self)
        for role in ServiceRole.objects.all():
            if role not in self.role.all() and role.employees.filter(pk=self.pk).exists():
                role.employees.remove(self)

    def __str__(self):
        return f"Name: {self.name}, Salon: {self.salon}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for role in self.role.all():
            role.employees.add(self)
            role.save()

    def __str__(self):
        return f"Name: {self.name}, Salon: {self.salon}"


PROCEDURE_TYPE = (
    (timedelta(minutes=60), 'Regular'),
    (timedelta(minutes=90), 'Long'),
    (timedelta(minutes=120), 'Very Long'),
)


class Schedule(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.employee.user} - {self.day} - {self.start_time} - {self.end_time}"


class Record(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='records')
    procedure = models.ForeignKey('Procedure', on_delete=models.CASCADE)
    start_time = models.TimeField()


class Composition(models.Model):
    name = models.CharField(max_length=50)
    product_component = models.TextField(max_length=1000, blank=True, null=True)
    firm = models.TextField(max_length=100, blank=True, null=True)
    contraindications = models.TextField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.product_component}"


class ProcedureCategory(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField()
    description = models.TextField(max_length=1000)
    roles = models.ManyToManyField(ServiceRole, related_name='categories')

    def __str__(self):
        return self.name


class Procedure(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    duration = models.DurationField(choices=PROCEDURE_TYPE)
    composition = models.ForeignKey(Composition, on_delete=models.CASCADE, related_name='procedures', blank=True,
                                    null=True)
    image = models.ImageField(blank=True, null=True)
    category = models.ForeignKey(ProcedureCategory, on_delete=models.CASCADE, related_name='procedures', blank=True,
                                 null=True)

    def __str__(self):
        return f"name: {self.name} - duration: {self.duration} - price: {self.price}"


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
    compound = models.CharField(max_length=300, null=True, blank=True)

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


class GalleryCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    image = models.ImageField(blank=True, null=True)
    category = models.ForeignKey(GalleryCategory, on_delete=models.CASCADE)


class Blog(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField()
    description = models.TextField(max_length=1000)
    support_image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name


class News(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField()
    description = models.TextField(max_length=1000)
    support_image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name
