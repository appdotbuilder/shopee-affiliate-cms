import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    tags: {
        data: Array<{
            id: number;
            name: string;
            slug: string;
            color: string;
            products_count: number;
            created_at: string;
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
        title: 'Tags',
        href: '/admin/tags',
    },
];

export default function TagsIndex({ tags }: Props) {
    const handleDelete = (tag: { id: number; name: string }) => {
        if (confirm(`Are you sure you want to delete the tag "${tag.name}"?`)) {
            router.delete(`/admin/tags/${tag.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Tags" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏷️ Tags</h1>
                        <p className="text-gray-600 mt-2">
                            Organize your products with tags for better navigation
                        </p>
                    </div>
                    <Link href="/admin/tags/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Add Tag
                        </Button>
                    </Link>
                </div>

                {/* Tags Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tags.data.map((tag) => (
                        <div key={tag.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className="px-3 py-2 rounded-full text-white font-medium"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {tag.products_count} products
                                </span>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-4">
                                Slug: {tag.slug}
                            </div>
                            
                            <div className="text-xs text-gray-400 mb-4">
                                Created: {new Date(tag.created_at).toLocaleDateString()}
                            </div>

                            <div className="flex gap-2">
                                <Link href={`/admin/tags/${tag.id}/edit`} className="flex-1">
                                    <Button size="sm" className="w-full">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(tag)}
                                >
                                    🗑️
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {tags.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏷️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tags yet</h3>
                        <p className="text-gray-600 mb-6">
                            Create tags to organize your products and help users find what they're looking for.
                        </p>
                        <Link href="/admin/tags/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Create Your First Tag
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {tags.links && tags.data.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {tags.links.map((link, index: number) => (
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