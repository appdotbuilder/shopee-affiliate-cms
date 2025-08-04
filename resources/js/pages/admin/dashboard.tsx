import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    stats: {
        total_products: number;
        published_products: number;
        draft_products: number;
        total_tags: number;
    };
    recent_products: Array<{
        id: number;
        name: string;
        price: number;
        status: string;
        created_at: string;
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

export default function AdminDashboard({ stats, recent_products }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">🚀 Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">
                        Welcome to your Shopee Affiliate CMS. Manage products, tags, and site settings.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📦</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stats.total_products}
                                </div>
                                <div className="text-gray-600">Total Products</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stats.published_products}
                                </div>
                                <div className="text-gray-600">Published</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📝</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stats.draft_products}
                                </div>
                                <div className="text-gray-600">Drafts</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🏷️</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stats.total_tags}
                                </div>
                                <div className="text-gray-600">Tags</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/admin/products/create">
                                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                    ➕ Add New Product
                                </Button>
                            </Link>
                            <Link href="/admin/tags/create">
                                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                    🏷️ Create Tag
                                </Button>
                            </Link>
                            <Link href="/admin/products">
                                <Button className="w-full justify-start" variant="outline">
                                    📦 Manage Products
                                </Button>
                            </Link>
                            <Link href="/admin/settings">
                                <Button className="w-full justify-start" variant="outline">
                                    ⚙️ Site Settings
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Quick Stats</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Conversion Rate</span>
                                <span className="font-semibold">2.4%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Avg. Product Rating</span>
                                <span className="font-semibold">4.2 ⭐</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Clicks</span>
                                <span className="font-semibold">1,234</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">This Month</span>
                                <span className="font-semibold text-green-600">+18%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">📋 Recent Products</h2>
                        <Link href="/admin/products">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Product</th>
                                    <th className="text-left py-3 px-4">Price</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Created</th>
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_products.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="font-semibold text-green-600">
                                                ${product.price}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                product.status === 'published' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : product.status === 'draft'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={`/admin/products/${product.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Button size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
                    <h2 className="text-xl font-bold mb-4">💡 Pro Tips</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">📸 High-Quality Images</h3>
                            <p className="text-orange-100 text-sm">
                                Use high-resolution product images to increase click-through rates and conversions.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">📝 SEO Optimization</h3>
                            <p className="text-orange-100 text-sm">
                                Write detailed meta descriptions and use relevant keywords to improve search rankings.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">🏷️ Tag Organization</h3>
                            <p className="text-orange-100 text-sm">
                                Use consistent tagging to help users find products and improve site navigation.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">📊 Regular Updates</h3>
                            <p className="text-orange-100 text-sm">
                                Keep product prices and availability updated to maintain user trust and engagement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}