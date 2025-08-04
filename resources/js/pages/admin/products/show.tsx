import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        original_price?: number;
        rating: number;
        review_count: number;
        affiliate_link: string;
        main_image?: string;
        gallery_images?: string[];
        description: string;
        meta_title?: string;
        meta_description?: string;
        status: string;
        sort_order: number;
        created_at: string;
        updated_at: string;
        tags: Array<{
            id: number;
            name: string;
            color: string;
        }>;
    };
    [key: string]: unknown;
}

export default function ShowProduct({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin',
        },
        {
            title: 'Products',
            href: '/admin/products',
        },
        {
            title: product.name,
            href: `/admin/products/${product.id}`,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Product: ${product.name}`} />
            
            <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>ID: {product.id}</span>
                            <span>•</span>
                            <span>Slug: {product.slug}</span>
                            <span>•</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                                {product.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <a href={`/product/${product.slug}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">
                                👁️ View Live
                            </Button>
                        </a>
                        <Link href={`/admin/products/${product.id}/edit`}>
                            <Button>
                                ✏️ Edit Product
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Product Images */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">📸 Product Images</h2>
                            
                            <div className="grid gap-4">
                                {/* Main Image */}
                                {product.main_image && (
                                    <div>
                                        <h3 className="font-medium mb-2">Main Image</h3>
                                        <div className="aspect-square w-64 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={product.main_image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Gallery Images */}
                                {product.gallery_images && product.gallery_images.length > 0 && (
                                    <div>
                                        <h3 className="font-medium mb-2">Gallery Images</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {product.gallery_images.map((image, index) => (
                                                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                    <img
                                                        src={image}
                                                        alt={`${product.name} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">📄 Description</h2>
                            <div className="prose prose-gray max-w-none">
                                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                                    {product.description}
                                </pre>
                            </div>
                        </div>

                        {/* SEO Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">🔍 SEO Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Title
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                                        {product.meta_title || product.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Description
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                                        {product.meta_description || 'No meta description set'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Product Details */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold mb-4">💰 Pricing & Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Current Price</span>
                                    <span className="font-semibold text-green-600">${product.price}</span>
                                </div>
                                {product.original_price && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Original Price</span>
                                        <span className="text-gray-500 line-through">${product.original_price}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Rating</span>
                                    <span>{product.rating} ⭐</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Reviews</span>
                                    <span>{product.review_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sort Order</span>
                                    <span>{product.sort_order}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold mb-4">🏷️ Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 rounded-full text-white text-sm"
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Affiliate Link */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold mb-4">🔗 Affiliate Link</h3>
                            <div className="break-all text-sm text-gray-600 bg-gray-50 p-3 rounded-md mb-3">
                                {product.affiliate_link}
                            </div>
                            <a
                                href={product.affiliate_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                    🛒 Test Link
                                </Button>
                            </a>
                        </div>

                        {/* Timestamps */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="font-semibold mb-4">📅 Timestamps</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div>
                                    <strong>Created:</strong> {new Date(product.created_at).toLocaleString()}
                                </div>
                                <div>
                                    <strong>Updated:</strong> {new Date(product.updated_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}