from rest_framework import viewsets
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Department,
    Employee,
    Attendance,
    Leave,
    Payroll,
)

from .serializers import (
    DepartmentSerializer,
    EmployeeSerializer,
    AttendanceSerializer,
    LeaveSerializer,
    PayrollSerializer,
)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer


class PayrollViewSet(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {"detail": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    token, created = Token.objects.get_or_create(user=user)

    profile = getattr(user, "userprofile", None)

    role = profile.role if profile else "EMPLOYEE"

    return Response({
        "token": token.key,
        "username": user.username,
        "role": role,
    })


@api_view(["GET"])
def my_profile(request):
    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Token "):
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    token_key = auth_header.replace("Token ", "").strip()

    try:
        token = Token.objects.get(key=token_key)
        user = token.user
    except Token.DoesNotExist:
        return Response(
            {"detail": "Invalid token."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        employee = Employee.objects.get(email=user.email)
    except Employee.DoesNotExist:
        return Response(
            {
                "detail": "Employee profile not found.",
                "logged_in_email": user.email
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(EmployeeSerializer(employee).data)