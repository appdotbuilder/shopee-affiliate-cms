<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Tag;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products.
     */
    public function index()
    {
        $products = Product::published()
            ->with('tags')
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        $tags = Tag::withCount('products')->orderBy('name')->get();
        
        return Inertia::render('home', [
            'products' => $products,
            'tags' => $tags
        ]);
    }

    /**
     * Display a single product page.
     */
    public function show(Product $product)
    {
        $product->load('tags');
        
        return Inertia::render('product', [
            'product' => $product
        ]);
    }
}