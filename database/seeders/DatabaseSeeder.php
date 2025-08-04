<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Tag;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create tags
        $tags = Tag::factory()->createMany([
            ['name' => 'Electronics', 'color' => '#3b82f6'],
            ['name' => 'Fashion', 'color' => '#ef4444'],
            ['name' => 'Home & Garden', 'color' => '#10b981'],
            ['name' => 'Beauty', 'color' => '#f59e0b'],
            ['name' => 'Sports', 'color' => '#8b5cf6'],
            ['name' => 'Best Seller', 'color' => '#06b6d4'],
            ['name' => 'New Arrival', 'color' => '#f97316'],
            ['name' => 'Sale', 'color' => '#ef4444'],
            ['name' => 'Premium', 'color' => '#84cc16'],
            ['name' => 'Trending', 'color' => '#ec4899'],
        ]);

        // Create products
        $products = Product::factory(24)->published()->create();

        // Attach random tags to products
        $products->each(function ($product) use ($tags) {
            $randomTags = $tags->random(random_int(1, 4))->pluck('id');
            $product->tags()->attach($randomTags);
        });

        // Create some draft products
        Product::factory(6)->draft()->create()->each(function ($product) use ($tags) {
            $randomTags = $tags->random(random_int(1, 3))->pluck('id');
            $product->tags()->attach($randomTags);
        });

        // Create site settings
        SiteSetting::create([
            'key' => 'site_name',
            'value' => 'ShopeeDeals Pro',
            'type' => 'text',
            'group' => 'general'
        ]);

        SiteSetting::create([
            'key' => 'site_description',
            'value' => 'Your ultimate destination for the best Shopee deals and product recommendations',
            'type' => 'textarea',
            'group' => 'general'
        ]);

        SiteSetting::create([
            'key' => 'meta_title',
            'value' => 'ShopeeDeals Pro - Best Deals & Product Reviews',
            'type' => 'text',
            'group' => 'seo'
        ]);

        SiteSetting::create([
            'key' => 'meta_description',
            'value' => 'Discover the best deals on Shopee with our curated product recommendations, detailed reviews, and exclusive affiliate offers.',
            'type' => 'textarea',
            'group' => 'seo'
        ]);

        SiteSetting::create([
            'key' => 'affiliate_disclaimer',
            'value' => 'This site contains affiliate links. We may earn a commission when you purchase through these links at no additional cost to you.',
            'type' => 'textarea',
            'group' => 'general'
        ]);
    }
}