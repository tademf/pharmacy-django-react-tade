from rest_framework import viewsets
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Medicine
from .serializers import MedicineSerializer

# Your existing Medicine ViewSet
class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

# Add Registration endpoint
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name', '')
        
        # Check if user exists
        if User.objects.filter(username=email).exists():
            return Response({'error': 'User already exists'}, status=400)
        
        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )
        
        # Create token
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.first_name
            }
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Add Login endpoint
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(username=email, password=password)
        
        if user:
            django_login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': user.first_name
                }
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Add Get User endpoint
@api_view(['GET'])
def get_user(request):
    if request.user.is_authenticated:
        return Response({
            'id': request.user.id,
            'email': request.user.email,
            'name': request.user.first_name
        })
    return Response({'error': 'Not authenticated'}, status=401)