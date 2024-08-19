<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Medical Documentation System

This project is a comprehensive medical documentation system built with <a href="https://laravel.com">Laravel </a> on the backend and React on the frontend. It provides an efficient way to manage patient records, medical history, and other healthcare-related data.

## Features

-   User Authentication: Secure login and registration for users.
-   Patient Management: CRUD operations for patient records, including personal information, medical history, and visits.
-   Medical History Tracking: Track and manage detailed medical histories for each patient.
-   Data Visualization: Visualize patient data through charts and reports.
-   Responsive UI: Mobile-friendly design with a responsive layout.
-   Role-based Access Control: Different access levels for admin, doctors, and other staff.

## Technology Stack

-   Backend: <a href="https://laravel.com">Laravel 11.x</a>
-   Frontend: <a href="https://react.dev/">React 18.2.0</a>
-   Database: MySQL / MariaDB / SQLite
-   API: RESTful API built with Laravel
-   State Management: Redux / Context API
-   Styling: [Tailwind CSS](https://tailwindcss.com/)
-   Build Tool: Vite

## Getting started

### Backend Setup

#Clone the project and run composer

```bash
git clone https://github.com/ajizants/DokMed.git
cd DokMed
```

#Install PHP dependencies:

```bash
composer install

```

#Copy the .env.example to .env and configure your environment variables:

```bash
cp .env.example .env

```

#Generate an application key:

```bash
php artisan key:generate

```

#Migration and DB seeder (after changing your DB settings in .env)

```bash
php artisan migrate --seed

```

#Start the development server:

```bash
php artisan serve

```

### Frontend Setup

#Install JavaScript dependencies:

```bash
npm install
```

#Start the development server:

```bash
npm run dev

```

#Build on production

```bash
npm run build

```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
