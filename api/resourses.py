from datetime import timedelta, datetime

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.serializers import RegisterSerializer, CoffeeProductSerializer, CoffeeCategorySerializer, SpaUserSerializer, \
    EmployeeSerializer, ServiceRoleSerializer, ProcedureSerializer, CompositionSerializer, SalonSerializer, \
    ReviewSerializer, ScheduleSerializer, FreeTimeCalculator, RecordSerializer
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, Employee, ServiceRole, Procedure, Composition, Salon, \
    Review, Schedule, Record
from spa_app.utils import SlotsValidator


class RegisterCreateApiView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []
    queryset = SpaUser.objects.all()


class SpaUserModelViewSet(ModelViewSet):
    queryset = SpaUser.objects.all()
    permission_classes = []
    serializer_class = SpaUserSerializer

    # @action(methods=['post'], detail=True)
    # def add_role(self, request, pk=None):
    #     employee = SpaUser.objects.get(pk=pk)
    #     serializer = SpaUserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         employee.save()
    #         return Response({'status': 'role added'})
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeModelViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = []
    serializer_class = EmployeeSerializer


class RoleModelViewSet(ModelViewSet):
    queryset = ServiceRole.objects.all()
    permission_classes = []
    serializer_class = ServiceRoleSerializer


class CoffeeProductModelViewSet(ModelViewSet):
    serializer_class = CoffeeProductSerializer
    permission_classes = []
    queryset = CoffeeProduct.objects.all()


class CoffeeCategoryModelViewSet(ModelViewSet):
    serializer_class = CoffeeCategorySerializer
    permission_classes = []
    queryset = CoffeeCategory.objects.all()


class ProcedureModelViewSet(ModelViewSet):
    queryset = Procedure.objects.all()
    permission_classes = []
    serializer_class = ProcedureSerializer


class CompositionModelViewSet(ModelViewSet):
    queryset = Composition.objects.all()
    serializer_class = CompositionSerializer
    permission_classes = []


class SalonModelViewSet(ModelViewSet):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
    permission_classes = []


class ReviewModelViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = []


class ScheduleModelViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

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
    permission_classes = []
