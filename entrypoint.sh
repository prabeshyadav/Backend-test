#!/bin/sh

set -e

echo "Waiting for PostgreSQL..."

python manage.py migrate

echo "Starting server..."

exec "$@"