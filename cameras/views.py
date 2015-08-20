import json
from django.http.response import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import auth
from cameras.models import Camera

def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    user_json = None
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            user_json = {
                'username': user.username,
                'name': user.first_name,
            }
    return HttpResponse(json.dumps(user_json), content_type='application/json')


def logout(request):
    auth.logout(request)
    return HttpResponse('{}', content_type='application/json')


def whoami(request):
    print(dir(request.user))
    i_am = {
        'user': {
            'username': request.user.username,
            'name': request.user.first_name,
        },
        'authenticated': True,
    } if request.user.is_authenticated() else {'authenticated': False}
    return HttpResponse(json.dumps(i_am), content_type='application/json')


def get_user_details(request):
    username = request.GET['username']
    user = auth.get_user_model().objects.get(username=username)
    user_json = {
        'username': user.username,
        'name': user.first_name,
    }
    return HttpResponse(json.dumps(user_json), content_type='application/json')


def list_cameras(request):
    filters = json.loads(request.GET.get('filters', '{}'))
    cams = Camera.objects.all()
    cams_dic = [c.to_dict_json() for c in cams]
    return HttpResponse(json.dumps(cams_dic), content_type='application/json')

