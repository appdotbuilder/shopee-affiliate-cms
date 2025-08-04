<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Tag;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('tags')
            ->latest()
            ->paginate(12);
        
        return Inertia::render('admin/products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::orderBy('name')->get();
        
        return Inertia::render('admin/products/create', [
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $product = Product::create($data);

        if (!empty($tags)) {
            $product->tags()->attach($tags);
        }

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load('tags');
        
        return Inertia::render('admin/products/show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->load('tags');
        $tags = Tag::orderBy('name')->get();
        
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $product->update($data);

        $product->tags()->sync($tags);

        return redirect()->route('admin.products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->tags()->detach();
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}