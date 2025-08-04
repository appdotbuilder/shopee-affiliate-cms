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

export default function Home({ products, tags }: Props) {
    return (
        <>
            <Head title="ShopeeDeals Pro - Featured Products" />
            
            <div className="min-h-screen bg-gray-50">
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
                                        Admin Panel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-12 bg-gradient-to-r from-orange-500 to-pink-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            🔥 Featured Shopee Deals
                        </h1>
                        <p className="text-xl text-orange-100">
                            Discover amazing products with the best prices and reviews
                        </p>
                    </div>
                </section>

                {/* Filter Tags */}
                <section className="py-8 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            🏷️ Shop by Category
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-full font-medium">
                                All Products
                            </button>
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    className="px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.name} ({tag.products_count})
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                📦 All Products ({products.meta.total})
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                                    <option>Latest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
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
                                            {product.original_price && (
                                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                        ⭐
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {product.rating} ({product.review_count})
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
                                                🛒 View Product
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.links && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                {products.links.map((link, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-md text-sm ${
                                            link.active
                                                ? 'bg-orange-600 text-white'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-100 border'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="text-lg font-bold text-orange-400 mb-2">
                            🛍️ ShopeeDeals Pro
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Your trusted source for the best Shopee deals and product recommendations.
                        </p>
                        <p className="text-xs text-gray-500">
                            This site contains affiliate links. We may earn a commission when you purchase 
                            through these links at no additional cost to you.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}