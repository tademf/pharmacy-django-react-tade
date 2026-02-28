from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()

    def __str__(self):
        return self.name