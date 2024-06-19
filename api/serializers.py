from django.db.models import Q
from rest_framework import serializers
from spa_app.models import SpaUser, CoffeeProduct, CoffeeCategory, ServiceType, Procedure


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'email', 'password', 'id']

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        user_exist = Q(username__iexact=username) | Q(email__iexact=email)
        if SpaUser.objects.filter(user_exist).count():
            raise serializers.ValidationError()
        return attrs

    def create(self, validated_data):
        return SpaUser.objects.create_user(**validated_data)


class CoffeeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeCategory
        fields = ['name', 'id']

    def validate(self, attrs):
        name = attrs.get('name')
        name_exist = Q(name__iexact=name)
        if CoffeeCategory.objects.filter(name_exist).count():
            raise serializers.ValidationError()
        return attrs


class CoffeeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeProduct
        fields = ['name', 'description', 'price', 'image', 'category', 'id']


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['name', 'id', 'type_of_categories']


class SpaUserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)

    class Meta:
        model = SpaUser
        fields = ['username', 'email', 'password', 'id', 'roles']


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = ['id', 'name', 'description', 'price', 'duration', 'composition', 'image']
