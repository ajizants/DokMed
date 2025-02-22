<?php
namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // $adminRole = Role::create(['name' => 'admin']);
        // $userRole = Role::create(['name' => 'user']);
        // $nakesRole = Role::create(['name' => 'nakes']);
        $locale = config('app.locale');
        setlocale(LC_TIME, $locale); // Untuk formatLocalized()
        Carbon::setLocale($locale);  // Untuk translatedFormat()
    }
}
