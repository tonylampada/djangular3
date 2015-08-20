from functools import wraps
import json
from django.http.response import HttpResponse

def ajax_login_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated():
            return view_func(request, *args, **kwargs)
        resp = json.dumps({ 'not_authenticated': True })
        return HttpResponse(resp, content_type='application/json', status=401)
    return wrapper
