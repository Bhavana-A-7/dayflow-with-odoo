from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("ADMIN", "Administrator"),
        ("HR", "HR Manager"),
        ("EMPLOYEE", "Employee"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="EMPLOYEE"
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name
class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.ForeignKey(
        Department,
        on_delete = models.SET_NULL,
        null=True,
        blank=True
    )
    job_title = models.CharField(max_length=100)
    date_joined = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Attendance(models.Model):
    STATUS_CHOICES = [
        ("PRESENT", "Present"),
        ("ABSENT", "Absent"),
        ("LATE", "Late"),
        ("HALF_DAY", "Half Day"),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ("employee", "date")

    def __str__(self):
        return f"{self.employee} - {self.date}"

class Leave(models.Model):
    LEAVE_TYPES = [
        ("CASUAL", "Casual Leave"),
        ("SICK", "Sick Leave"),
        ("PAID", "Paid Leave"),
        ("UNPAID", "Unpaid Leave"),
    ]

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"