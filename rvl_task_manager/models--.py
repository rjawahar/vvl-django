from django.contrib.auth.models import User, Group

class User_Group(models.Model):
    name = models.CharField(max_length=100)

    @classmethod
    def create(user_group, name):
        newusergroup = user_group(title=name)

        # create the group for the course
        newgroup = Group.objects.create(name=user_group.name)

        return newusergroup
