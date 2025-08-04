<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes - Home page shows products
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/product/{product:slug}', [HomeController::class, 'show'])->name('product.show');

// Admin routes (protected)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    Route::resource('products', ProductController::class);
    Route::resource('tags', TagController::class);
    Route::resource('settings', SettingsController::class)->only(['index', 'store']);
});

// User dashboard redirects to admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';