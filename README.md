# 🚀 Posts Fullstack App

> **Полнофункциональное приложение для создания и управления постами**  
> _Полный стек: NestJS + React + PostgreSQL + Docker Compose + Nginx_

В этом репозитории объединены фронтенд и бэкенд проекты через git submodules и общий `docker-compose.yml`.

---

## 🎯 Особенности

- 🎨 **Современный UI/UX** с использованием shadcn/ui компонентов
- 🔐 **Полная аутентификация** с JWT токенами
- 📝 **CRUD операции** для постов
- 👤 **Управление профилем** с загрузкой аватара
- 🐳 **Docker контейнеризация** для легкого развертывания
- 🌐 **Nginx** для проксирования запросов
- 📱 **Адаптивный дизайн** для всех устройств

---

## 📂 Структура проекта

```
posts-full/
├── 📁 posts/              # Frontend (React + TypeScript + Vite)
│   ├── 📁 src/
│   │   ├── 📁 entities/
│   │   ├── 📁 features/
│   │   ├── 📁 widgets/
│   │   └── 📁 shared/
│   └── 📄 package.json
├── 📁 posts-api/          # Backend (NestJS + PostgreSQL + TypeORM)
│   ├── 📁 src/
│   │   ├── 📁 auth/
│   │   ├── 📁 post/
│   │   ├── 📁 user/
│   │   └── 📁 upload/
│   └── 📄 package.json
├── 📁 nginx/
└── 📄 docker-compose.yml
```

---

## 🌐 Демо

Приложение задеплоено и доступно по адресу:

👉 **[http://45.9.74.60/](http://45.9.74.60/)**

---

## 🚀 Быстрый старт

### Предварительные требования

- 🐳 **Docker** и **Docker Compose**
- 📦 **Git** с поддержкой submodules

### Настройка переменных окружения

Создайте файл `.env` в папке `posts-api/`:

```env
DB_HOST=main-db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
JWT_SECRET=SECRET_KEY
```

### Запуск проекта

Из корня репозитория выполните:

```bash
docker compose up --build
```

или если нужно запустить только бекенд

```bash
cd posts-api
docker compose up --build
```

---

## 🌍 Доступные сервисы

| Сервис             | URL                                            | Описание                       |
| ------------------ | ---------------------------------------------- | ------------------------------ |
| 🌐 **Frontend**    | [http://localhost](http://localhost)           | React приложение (через Nginx) |
| 🔧 **Backend API** | [http://localhost:3000](http://localhost:3000) | NestJS API сервер              |
| 🗄️ **PgAdmin**     | [http://localhost:5050](http://localhost:5050) | Администрирование БД           |

### 🔑 Данные для входа в PgAdmin

- **Email:** `admin@admin.com`
- **Пароль:** `admin`

---

## 🛠 Технологический стек

### Frontend

- ⚛️ **React 19** - UI библиотека
- 🔷 **TypeScript** - Типизация
- ⚡ **Vite** - Сборщик
- 🔄 **TanStack Query** - Управление состоянием сервера
- 🎨 **shadcn/ui** - UI компоненты
- 🎭 **Tailwind CSS** - Стилизация

### Backend

- 🟢 **NestJS** - Node.js фреймворк
- 🗃️ **PostgreSQL** - База данных
- 🔗 **TypeORM** - ORM
- 🔐 **JWT** - Аутентификация

### DevOps

- 🐳 **Docker** - Контейнеризация
- 🎼 **Docker Compose** - Оркестрация
- 🌐 **Nginx** - Веб-сервер и прокси

---

---

---
