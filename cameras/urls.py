# coding: utf-8
from django.conf.urls import patterns, url

urlpatterns = patterns('cameras.views',
    url(r'^api/login$', 'login'),
    url(r'^api/logout$', 'logout'),
    url(r'^api/whoami$', 'whoami'),
    url(r'^api/get_user_details$', 'get_user_details'),
    url(r'^api/list_cameras$', 'list_cameras'),
)
