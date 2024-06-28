from django.conf import settings
from django.utils.timezone import now
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from django_and_react_spa.settings import TOKEN_EXPIRE_SECONDS


class TokenAuthenticationExpired(TokenAuthentication):
    def authenticate(self, request):
        try:
            user, token = super().authenticate(request)
        except TypeError:
            return
        if (now() - token.created).seconds > TOKEN_EXPIRE_SECONDS:
            token.delete()
            raise AuthenticationFailed('Token expired, please take a new one')
        return user, token
