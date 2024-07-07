from datetime import timedelta, datetime

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from api.serializers import RegisterSerializer, CoffeeProductSerializer, CoffeeCategorySerializer, SpaUserSerializer, \
    EmployeeSerializer, ServiceRoleSerializer, ProcedureSerializer, CompositionSerializer, SalonSerializer, \
    ReviewSerializer, ScheduleSerializer, FreeTimeCalculator, RecordSerializer, GalleryCategorySerializer, \
    GalleryImageSerializer, ProcedureCategorySerializer
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, Employee, ServiceRole, Procedure, Composition, Salon, \
    Review, Schedule, Record, GalleryCategory, GalleryImage, ProcedureCategory
from spa_app.utils import SlotsValidator


class RegisterCreateApiView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []
    queryset = SpaUser.objects.all()


class SpaUserModelViewSet(ModelViewSet):
    queryset = SpaUser.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = SpaUserSerializer


class EmployeeModelViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = EmployeeSerializer


class RoleModelViewSet(ModelViewSet):
    queryset = ServiceRole.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ServiceRoleSerializer


class CoffeeProductModelViewSet(ModelViewSet):
    serializer_class = CoffeeProductSerializer
    permission_classes = []
    queryset = CoffeeProduct.objects.all()


class CoffeeCategoryModelViewSet(ModelViewSet):
    serializer_class = CoffeeCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    queryset = CoffeeCategory.objects.all()


class ProcedureModelViewSet(ModelViewSet):
    queryset = Procedure.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProcedureSerializer


class CompositionModelViewSet(ModelViewSet):
    queryset = Composition.objects.all()
    serializer_class = CompositionSerializer
    permission_classes = [IsAdminOrReadOnly]


class SalonModelViewSet(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
    permission_classes = [IsAdminOrReadOnly]


class ReviewModelViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ScheduleModelViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=['GET'])
    def free(self, request, pk=None):
        serializer = FreeTimeCalculator(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        procedure = serializer.validated_data['procedure']
        schedule = self.get_object()
        return Response({'ranges': SlotsValidator(schedule, procedure).ranges})


class RecordModelViewSet(ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]


class GalleryCategoryModelViewSet(ModelViewSet):
    queryset = GalleryCategory.objects.all()
    serializer_class = GalleryCategorySerializer
    permission_classes = [IsAdminOrReadOnly]


class GalleryImageModelViewSet(ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProcedureCategoryModelViewSet(ModelViewSet):
    queryset = ProcedureCategory.objects.all()
    serializer_class = ProcedureCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
