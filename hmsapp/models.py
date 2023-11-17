from django.db import models

# Create your models here.

class Doctor(models.Model):
    class Meta:
        db_table = 'doctor'
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    dob = models.DateField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    degree = models.CharField(max_length=100)
    medical_college = models.CharField(max_length=200)
    password = models.CharField(max_length=100)  # Consider using Django's built-in User model for better password handling
    speciality = models.CharField(max_length=100, null=True, blank=True)
    department = models.CharField(max_length=100, null=True, blank=True)
    availability = models.CharField(max_length=255, null=True, blank=True)

    fields = [
    'first_name',
    'last_name',
    'sex',
    'dob',
    'email',
    'phone',
    'degree',
    'medical_college',
    'password'
    'speciality'
    'department'
    'availability'
]
    
    def __str__(self):
        return self.fields




class Patient(models.Model):
    class Meta:
        db_table = 'patient'
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    dob = models.DateField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    bloodGroup = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  


    fields = [
    'first_name',
    'last_name',
    'sex',
    'dob',
    'email',
    'phone',
    'bloodGroup',
    'password'
]
    
    def __str__(self):
        return self.fields
    
class Prescription(models.Model):
    class Meta:
        db_table = 'prescription'
    doctor_name = models.CharField(max_length=100)
    doctor_email = models.EmailField()
    patient_name = models.CharField(max_length=100)
    patient_number = models.CharField(max_length=15)
    patient_email = models.EmailField()
    description = models.TextField()
    age = models.IntegerField()
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    date = models.DateField()

    def __str__(self):
        return f"Prescription for {self.patient_name} by {self.doctor_name}"
    
    
class Ward(models.Model):
    class Meta:
        db_table="wards"
    ward_no = models.CharField(max_length=50)
    floor_no = models.CharField(max_length=50)
    booked_by = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    total_days = models.IntegerField()
    total_bill = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    booked_date = models.DateField(auto_now_add=True)
    ward_type = models.CharField(max_length=50)
    def __str__(self):
        return f"Ward {self.ward_no}"


class Cabin(models.Model):
    class Meta:
        db_table = 'cabins'

    CABIN_TYPES = [
        ('Single', 'Single'),
        ('Double', 'Double'),
    ]

    cabin_no = models.CharField(max_length=50, unique=True)
    floor_no = models.CharField(max_length=50)
    booked_by = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    total_days = models.IntegerField()
    total_bill = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    booked_date = models.DateField(auto_now_add=True)
    cabin_type = models.CharField(max_length=50, choices=CABIN_TYPES)

    def __str__(self):
        return f"Cabin {self.cabin_no}"
