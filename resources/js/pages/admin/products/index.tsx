import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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
            status: string;
            main_image?: string;
            created_at: string;
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
            from: number;
            to: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Products',
        href: '/admin/products',
    },
];

export default function ProductsIndex({ products }: Props) {
    const handleDelete = (product: { id: number; name: string }) => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            router.delete(`/admin/products/${product.id}`);
        }
    };

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
            <Head title="Manage Products" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📦 Products</h1>
                        <p className="text-gray-600 mt-2">
                            Manage your affiliate products and their details
                        </p>
                    </div>
                    <Link href="/admin/products/create">
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Add Product
                        </Button>
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {products.meta.from || 0} to {products.meta.to || 0} of {products.meta.total} products
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>Published</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>Draft</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span>Archived</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.data.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="aspect-square bg-gray-100 relative">
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
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold text-green-600">
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
                                        {product.rating}
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
                                    {product.tags.length > 2 && (
                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                                            +{product.tags.length - 2} more
                                        </span>
                                    )}
                                </div>

                                <div className="text-xs text-gray-500 mb-3">
                                    Created: {new Date(product.created_at).toLocaleDateString()}
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/admin/products/${product.id}`} className="flex-1">
                                        <Button size="sm" variant="outline" className="w-full">
                                            👁️ View
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                                        <Button size="sm" className="w-full">
                                            ✏️ Edit
                                        </Button>
                                    </Link>
                                </div>
                                
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(product)}
                                >
                                    🗑️ Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                        <p className="text-gray-600 mb-6">
                            Start building your affiliate store by adding your first product.
                        </p>
                        <Link href="/admin/products/create">
                            <Button className="bg-green-600 hover:bg-green-700">
                                ➕ Add Your First Product
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {products.links && products.data.length > 0 && (
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
        </AppLayout>
    );
}