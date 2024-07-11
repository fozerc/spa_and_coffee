from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from api.resourses import RegisterCreateApiView, CoffeeProductModelViewSet, CoffeeCategoryModelViewSet, \
    EmployeeModelViewSet, RoleModelViewSet, ProcedureModelViewSet, CompositionModelViewSet, SalonModelViewSet, \
    ReviewModelViewSet, ScheduleModelViewSet, RecordModelViewSet, GalleryCategoryModelViewSet, GalleryImageModelViewSet, \
    ProcedureCategoryModelViewSet, LogoutApiView, MassageProceduresView
from rest_framework import routers

from api.serializers import GalleryImageSerializer

router = routers.DefaultRouter()
router.register(r'coffee-products', CoffeeProductModelViewSet, basename='coffee-products')
router.register(r'coffee-categories', CoffeeCategoryModelViewSet, basename='coffee-categories')
router.register(r'employee', EmployeeModelViewSet, basename='employee')
router.register(r'role', RoleModelViewSet, basename='role')
router.register(r'procedure', ProcedureModelViewSet, basename='procedure')
router.register(r'composition', CompositionModelViewSet, basename='composition')
router.register(r'salon', SalonModelViewSet, basename='salon')
router.register(r'review', ReviewModelViewSet, basename='review')
router.register(r'schedule', ScheduleModelViewSet, basename='schedule')
router.register(r'record', RecordModelViewSet, basename='record')
router.register(r'gallery-category', GalleryCategoryModelViewSet, basename='gallery-category')
router.register(r'gallery-image', GalleryImageModelViewSet, basename='gallery-image')
router.register(r'procedure-category', ProcedureCategoryModelViewSet, basename='procedure-category')

urlpatterns = [
    path('auth/', obtain_auth_token, name='auth_token'),
    path('register/', RegisterCreateApiView.as_view(), name='register'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('procedures/massages/', MassageProceduresView.as_view(), name='procedures-massages'),
    # path('procedures/pilings/', MassageProceduresView.as_view(), name='procedures-massages'),
    # path('procedures/ceremonies/', MassageProceduresView.as_view(), name='procedures-massages'),
    # path('procedures/steaming/', MassageProceduresView.as_view(), name='procedures-massages'),
    path('', include(router.urls)),
]
