import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    products: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            price: number;
            original_price?: number;
            rating: number;
            review_count: number;
            main_image?: string;
            tags: Array<{
                id: number;
                name: string;
                color: string;
            }>;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
        };
    };
    tags: Array<{
        id: number;
        name: string;
        color: string;
        products_count: number;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ products, tags }: Props) {
    return (
        <>
            <Head title="ShopeeDeals Pro - Best Deals & Product Reviews" />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    🛍️ ShopeeDeals Pro
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-orange-600 font-medium"
                                >
                                    Login
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-orange-600 hover:bg-orange-700">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🏆 Discover the Best <span className="text-orange-600">Shopee Deals</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Your ultimate destination for curated product recommendations, detailed reviews, 
                            and exclusive deals from Shopee's top sellers.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/register">
                                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                                    🚀 Start Shopping Now
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg">
                                📖 Learn More
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            🌟 Why Choose ShopeeDeals Pro?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold mb-3">Curated Products</h3>
                                <p className="text-gray-600">
                                    Hand-picked products with detailed reviews and ratings to help you make the best choices.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
                                <p className="text-gray-600">
                                    Compare prices and find exclusive deals with direct links to Shopee's best offers.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-semibold mb-3">Easy Shopping</h3>
                                <p className="text-gray-600">
                                    One-click access to products with detailed specifications and customer reviews.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Categories */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            🏷️ Shop by Category
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {tags.slice(0, 8).map((tag) => (
                                <div
                                    key={tag.id}
                                    className="px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.name} ({tag.products_count})
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            🔥 Featured Products
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.slice(0, 8).map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                                    <div className="aspect-square bg-gray-100">
                                        {product.main_image ? (
                                            <img
                                                src={product.main_image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                📷 No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg font-bold text-orange-600">
                                                ${product.price}
                                            </span>
                                            {product.original_price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${product.original_price}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="text-sm text-gray-600">
                                                {product.rating} ({product.review_count} reviews)
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {product.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-2 py-1 text-xs rounded-full text-white"
                                                    style={{ backgroundColor: tag.color }}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        <Link href={`/product/${product.slug}`}>
                                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/register">
                                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                                    🛒 View All Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-pink-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Find Amazing Deals? 🎉
                        </h2>
                        <p className="text-xl text-orange-100 mb-8">
                            Join thousands of smart shoppers who trust ShopeeDeals Pro for the best product recommendations.
                        </p>
                        <Link href="/register">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                                🚀 Get Started Free
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-xl font-bold text-orange-400 mb-4">
                                    🛍️ ShopeeDeals Pro
                                </div>
                                <p className="text-gray-400">
                                    Your trusted source for the best Shopee deals and product recommendations.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Products</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Electronics</li>
                                    <li>Fashion</li>
                                    <li>Home & Garden</li>
                                    <li>Beauty</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Company</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>About Us</li>
                                    <li>Contact</li>
                                    <li>Privacy Policy</li>
                                    <li>Terms of Service</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Connect</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>📧 Email</li>
                                    <li>📱 Twitter</li>
                                    <li>📘 Facebook</li>
                                    <li>📸 Instagram</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 ShopeeDeals Pro. All rights reserved.</p>
                            <p className="mt-2 text-sm">
                                This site contains affiliate links. We may earn a commission when you purchase 
                                through these links at no additional cost to you.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}