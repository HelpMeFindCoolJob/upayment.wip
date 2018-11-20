from django import template
from django.contrib.auth.models import Group

register = template.Library()

@register.filter(name='in_group')
def in_group(user, group):
    group =  Group.objects.get(name=group)
    return group in user.groups.all()