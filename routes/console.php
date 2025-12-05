<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule cache refresh every 10 minutes
Schedule::command('cache:refresh-products')
    ->everyTenMinutes()
    ->withoutOverlapping()
    ->runInBackground();
