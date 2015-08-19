# coding: utf-8
from django.conf.urls import patterns, url

urlpatterns = patterns('cameras.views',
    url(r'^api/login$', 'login'),
    url(r'^api/logout$', 'logout'),
    url(r'^api/whoami$', 'whoami'),
)
