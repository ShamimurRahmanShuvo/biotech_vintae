# Docker deployment

This project runs as three containers:

- `frontend`: Nginx + React/Vite production build
- `backend`: Django + Gunicorn
- `db`: PostgreSQL

Nginx exposes only port 80. `/api/` and `/admin/` are proxied to Django.

## 1. Create environment file

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```env
DJANGO_SECRET_KEY=<long-random-secret>
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost
POSTGRES_PASSWORD=<strong-password>
DB_PASSWORD=<same-strong-password>
```

For the real domain, use for example:

```env
DJANGO_ALLOWED_HOSTS=biotechvintae.com.bd,www.biotechvintae.com.bd
DJANGO_CSRF_TRUSTED_ORIGINS=https://biotechvintae.com.bd,https://www.biotechvintae.com.bd
DJANGO_CORS_ALLOWED_ORIGINS=https://biotechvintae.com.bd,https://www.biotechvintae.com.bd
```

## 2. Build and start

```bash
docker compose build
docker compose up -d
```

Check status:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

## 3. Create Django admin user

```bash
docker compose exec backend python manage.py createsuperuser
```

Then open:

```text
http://localhost/admin/
```

## 4. Load existing data

If this is a new PostgreSQL database, run your seed script:

```bash
docker compose exec backend python seed.py
```

This recreates the company, leadership and product data defined in `seed.py`.

Do NOT run `seed.py` on a database containing production data because the script deletes existing company, leadership and product records first.

## 5. Local build without Docker

The frontend production API URL is `/api/`, so the browser uses the same host as Nginx. No localhost Django URL is baked into the production frontend.

## 6. Useful commands

Restart:

```bash
docker compose restart
```

Rebuild after code changes:

```bash
docker compose up -d --build
```

Django shell:

```bash
docker compose exec backend python manage.py shell
```

Run migrations manually:

```bash
docker compose exec backend python manage.py migrate
```

Stop containers but keep database volumes:

```bash
docker compose down
```

Stop and DELETE database data:

```bash
docker compose down -v
```

Do not use `down -v` in production unless you intentionally want to delete the PostgreSQL volume.

## Existing SQLite data

The repository contains `db.sqlite3`, but this Docker configuration intentionally uses PostgreSQL for production. To migrate the existing local data:

On the machine where the existing SQLite database works:

```bash
python manage.py dumpdata company products --indent 2 > data.json
```

Copy `data.json` to the server, then:

```bash
docker cp data.json $(docker compose ps -q backend):/app/data.json
docker compose exec backend python manage.py loaddata /app/data.json
```

Create the production admin account separately with `createsuperuser`.
