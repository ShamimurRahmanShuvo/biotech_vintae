#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
python - <<'PY'
import os, socket, time
host = os.getenv('DB_HOST', 'db')
port = int(os.getenv('DB_PORT', '5432'))
for _ in range(60):
    try:
        with socket.create_connection((host, port), timeout=2):
            print('PostgreSQL is available')
            break
    except OSError:
        time.sleep(1)

else:
    raise SystemExit('PostgreSQL did not become available in time')
PY

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers "${GUNICORN_WORKERS:-2}" \
    --timeout "${GUNICORN_TIMEOUT:-60}" \
    --access-logfile - \
    --error-logfile -
