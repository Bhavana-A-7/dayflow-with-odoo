from rest_framework import serializers

from .models import (
    Department,
    Employee,
    Attendance,
    Leave,
    Payroll,
)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class EmployeeSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    class Meta:
        model = Employee
        fields = [
            "id",
            "employee_id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "department",
            "department_name",
            "job_title",
            "date_joined",
            "is_active",
        ]


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"


class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = "__all__"


class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    net_salary = serializers.ReadOnlyField()

    class Meta:
        model = Payroll
        fields = [
            "id",
            "employee",
            "employee_name",
            "basic_salary",
            "allowances",
            "deductions",
            "net_salary",
            "updated_at",
        ]

    def get_employee_name(self, obj):
        return f"{obj.employee.first_name} {obj.employee.last_name}"