'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1']
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'lootchest',
        'HOST': '127.0.0.1',
        'PORT': 27017,
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://127.0.0.1:3000',
)

# Stripe

STRIPE_PUBLIC_KEY = config(
    'STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config(
    'STRIPE_TEST_SECRET_KEY')
