<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports',
            'Books', 'Toys', 'Automotive', 'Health', 'Jewelry',
            'Best Seller', 'New Arrival', 'Sale', 'Premium', 'Trending'
        ]);
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'color' => fake()->randomElement([
                '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
                '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1'
            ]),
        ];
    }
}