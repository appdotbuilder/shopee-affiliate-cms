import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Tags',
        href: '/admin/tags',
    },
    {
        title: 'Create Tag',
        href: '/admin/tags/create',
    },
];

export default function CreateTag(): React.JSX.Element {
    const [data, setData] = useState({
        name: '',
        slug: '',
        color: '#3b82f6',
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const colorOptions = [
        { value: '#3b82f6', name: 'Blue' },
        { value: '#ef4444', name: 'Red' },
        { value: '#10b981', name: 'Green' },
        { value: '#f59e0b', name: 'Yellow' },
        { value: '#8b5cf6', name: 'Purple' },
        { value: '#06b6d4', name: 'Cyan' },
        { value: '#f97316', name: 'Orange' },
        { value: '#84cc16', name: 'Lime' },
        { value: '#ec4899', name: 'Pink' },
        { value: '#6366f1', name: 'Indigo' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/admin/tags', data, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tag" />
            
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Link href="/admin/tags" className="hover:text-orange-600">Tags</Link>
                        <span>→</span>
                        <span>Create Tag</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">➕ Create New Tag</h1>
                    <p className="text-gray-600 mt-2">
                        Create a new tag to organize your products.
                    </p>
                </div>

                <div className="max-w-2xl">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tag Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="e.g., Electronics, Fashion, Best Sellers"
                                    required
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug (URL-friendly name)
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData(prev => ({ ...prev, slug: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Leave empty to auto-generate from name"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    If left empty, will be auto-generated from tag name
                                </p>
                                {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tag Color
                                </label>
                                <div className="grid grid-cols-5 gap-3">
                                    {colorOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setData(prev => ({ ...prev, color: option.value }))}
                                            className={`w-full h-12 rounded-md border-2 transition-all ${
                                                data.color === option.value 
                                                    ? 'border-gray-800 scale-110' 
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            style={{ backgroundColor: option.value }}
                                            title={option.name}
                                        />
                                    ))}
                                </div>
                                <input
                                    type="color"
                                    value={data.color}
                                    onChange={(e) => setData(prev => ({ ...prev, color: e.target.value }))}
                                    className="mt-3 w-16 h-8 border border-gray-300 rounded cursor-pointer"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Select a predefined color or use the color picker for custom colors
                                </p>
                                {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color}</p>}
                            </div>

                            {/* Preview */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preview
                                </label>
                                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                                    <span
                                        className="px-3 py-2 rounded-full text-white font-medium"
                                        style={{ backgroundColor: data.color }}
                                    >
                                        {data.name || 'Tag Name'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : '✅ Create Tag'}
                                </Button>
                                
                                <Link href="/admin/tags">
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}