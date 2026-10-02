from django.db import models


class LeadershipMessage(models.Model):
    ROLE_CHOICES = [
        ('CHAIRMAN', 'Chairman'),
        ('MD', 'Managing Director'),
        ('FINANCE', 'Finance Director'),
    ]
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, unique=True)
    phone_number = models.CharField(max_length=20)
    message = models.TextField()

    def __str__(self):
        return f"{self.get_role_display()} - {self.name}"


class CompanyInfo(models.Model):
    company_name = models.CharField(max_length=150, default="Biotech Vintae Pharma Ltd.")
    office_address = models.TextField(
        default="Jannatul Mawa G/125 Ground Floor, Beside Khaddo Bhaban, "
                "Shahid Abdul Jobbar Sarak, Rahman Nagar, Bogura"
    )
    mission = models.TextField()
    vision = models.TextField()

    def __str__(self):
        return self.company_name
