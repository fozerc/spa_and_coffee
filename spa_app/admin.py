from django.contrib import admin

from .models import SpaUser, Salon, ServiceRole, Record, Employee, Procedure, Composition, CoffeeProduct, \
    CoffeeCategory, Schedule, ProcedureCategory, Review, GalleryImage, GalleryCategory, Blog, News

admin.site.register(SpaUser)
admin.site.register(Salon)
admin.site.register(ServiceRole)
admin.site.register(Record)
admin.site.register(Employee)
admin.site.register(Procedure)
admin.site.register(Composition)
admin.site.register(CoffeeProduct)
admin.site.register(CoffeeCategory)
admin.site.register(Schedule)
admin.site.register(ProcedureCategory)
admin.site.register(Review)
admin.site.register(GalleryImage)
admin.site.register(GalleryCategory)
admin.site.register(Blog)
admin.site.register(News)
