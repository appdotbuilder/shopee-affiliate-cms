<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Tag;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'published_products' => Product::where('status', 'published')->count(),
            'draft_products' => Product::where('status', 'draft')->count(),
            'total_tags' => Tag::count(),
        ];
        
        $recent_products = Product::with('tags')
            ->latest()
            ->limit(5)
            ->get();
        
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_products' => $recent_products
        ]);
    }


}