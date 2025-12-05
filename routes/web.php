<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'auth' => [
            'user' => auth()->user() ? [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ] : null,
        ],
    ]);
})->name('home');

Route::get('/products', function () {
    return Inertia::render('products/index', [
        'products' => [],
        'categories' => [],
        'brands' => [],
        'auth' => [
            'user' => auth()->user() ? [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ] : null,
        ],
    ]);
})->name('products.index');

Route::get('/product/{article}', function ($article) {
    return Inertia::render('product', [
        'article' => $article,
        'auth' => [
            'user' => auth()->user() ? [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
            ] : null,
        ],
    ]);
})->name('product');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('/delivery', function () {
    return Inertia::render('delivery');
})->name('delivery');

Route::get('/warranty', function () {
    return Inertia::render('warranty');
})->name('warranty');

Route::get('/auth', function () {
    return Inertia::render('auth/auth');
})->name('auth');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('profile', function () {
        return Inertia::render('profile/index', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile');

    Route::get('profile/orders', function () {
        return Inertia::render('profile/orders', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.orders');

    Route::get('profile/cards', function () {
        return Inertia::render('profile/cards', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.cards');

    Route::get('profile/favorites', function () {
        return Inertia::render('profile/favorites', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.favorites');

    Route::get('profile/addresses', function () {
        return Inertia::render('profile/addresses', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.addresses');

    Route::get('profile/notifications', function () {
        return Inertia::render('profile/notifications', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.notifications');

    Route::get('profile/settings', function () {
        return Inertia::render('profile/settings', [
            'user' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone ?? '+7 (___) ___-__-__',
            ],
        ]);
    })->name('profile.settings');
});


Route::get('/api/proxy/categories', [App\Http\Controllers\ProxyController::class, 'getCategories']);
Route::get('/api/proxy/products', [App\Http\Controllers\ProxyController::class, 'getProducts']);
Route::get('/api/proxy/products-with-images', [App\Http\Controllers\ProxyController::class, 'getProductsWithImages']);
Route::get('/api/proxy/images', [App\Http\Controllers\ProxyController::class, 'getImages']);
Route::get('/api/proxy/element-info', [App\Http\Controllers\ProxyController::class, 'getElementInfo']);
Route::get('/api/proxy/properties', [App\Http\Controllers\ProxyController::class, 'getProperties']);
Route::get('/api/proxy/quantity-price', [App\Http\Controllers\ProxyController::class, 'getQuantityPrice']);
Route::get('/api/proxy/brands', [App\Http\Controllers\ProxyController::class, 'getBrands']);

// Cache management routes
Route::get('/api/proxy/cache/refresh', [App\Http\Controllers\ProxyController::class, 'refreshProductsCache']);
Route::get('/api/proxy/cache/status', [App\Http\Controllers\ProxyController::class, 'getCacheStatus']);

// Admin routes
Route::get('/admin/login', [App\Http\Controllers\AdminController::class, 'login'])->name('admin.login');
Route::post('/admin/login', function (Illuminate\Http\Request $request) {
    if (auth()->attempt($request->only('email', 'password'))) {
        return redirect('/admin/dashboard');
    }
    return back()->withErrors(['email' => 'Неверные учетные данные']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [App\Http\Controllers\AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/categories', [App\Http\Controllers\AdminController::class, 'categories'])->name('admin.categories');
    Route::post('/admin/categories', [App\Http\Controllers\AdminController::class, 'storeCategory']);
    Route::post('/admin/categories/import', [App\Http\Controllers\AdminController::class, 'importCategories']);
    Route::get('/admin/brands', [App\Http\Controllers\AdminController::class, 'brands'])->name('admin.brands');
    Route::post('/admin/brands', [App\Http\Controllers\AdminController::class, 'storeBrand']);
    Route::post('/admin/brands/import', [App\Http\Controllers\AdminController::class, 'importBrands']);
    Route::get('/admin/products', [App\Http\Controllers\AdminController::class, 'products'])->name('admin.products');
    Route::post('/admin/products/import', [App\Http\Controllers\AdminController::class, 'importProducts']);
    Route::post('/admin/logout', function () {
        auth()->logout();
        return redirect('/admin/login');
    })->name('admin.logout');
});

require __DIR__.'/settings.php';
