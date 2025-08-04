<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(random_int(2, 4), true);
        $price = fake()->randomFloat(2, 10, 999);
        $originalPrice = $price + fake()->randomFloat(2, 5, 200);
        
        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'price' => $price,
            'original_price' => $originalPrice,
            'rating' => fake()->randomFloat(1, 3.0, 5.0),
            'review_count' => fake()->numberBetween(10, 5000),
            'affiliate_link' => 'https://shopee.com/product/' . fake()->uuid(),
            'main_image' => 'https://picsum.photos/400/400?random=' . fake()->numberBetween(1, 1000),
            'gallery_images' => [
                'https://picsum.photos/400/400?random=' . fake()->numberBetween(1001, 2000),
                'https://picsum.photos/400/400?random=' . fake()->numberBetween(2001, 3000),
                'https://picsum.photos/400/400?random=' . fake()->numberBetween(3001, 4000),
            ],
            'description' => $this->generateRichDescription(),
            'meta_title' => ucwords($name) . ' - Best Price on Shopee',
            'meta_description' => 'Get the best deals on ' . ucwords($name) . ' with great discounts and fast shipping. Shop now on Shopee!',
            'status' => fake()->randomElement(['published', 'published', 'published', 'draft']),
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Generate a rich text description with headings.
     *
     * @return string
     */
    protected function generateRichDescription(): string
    {
        $sections = [
            '# Product Overview',
            fake()->paragraphs(2, true),
            '',
            '## Key Features',
            '- ' . fake()->sentence(),
            '- ' . fake()->sentence(),
            '- ' . fake()->sentence(),
            '- ' . fake()->sentence(),
            '',
            '## Specifications',
            fake()->paragraph(),
            '',
            '## Why Choose This Product?',
            fake()->paragraphs(2, true),
            '',
            '## Customer Reviews',
            fake()->paragraph(),
        ];

        return implode("\n", array_map('strval', $sections));
    }

    /**
     * Indicate that the product is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the product is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }
}