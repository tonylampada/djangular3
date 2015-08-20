from django.db import models

class Camera(models.Model):
    name = models.CharField(max_length=256)
    address = models.CharField(max_length=2048)

    def to_dict_json(self):
    	return {
    		'name': self.name,
    	}
