import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    tags: Array<{
        id: number;
        name: string;
        color: string;
    }>;
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
    {
        title: 'Create Product',
        href: '/admin/products/create',
    },
];

export default function CreateProduct({ tags }: Props) {
    const [data, setData] = useState({
        name: '',
        slug: '',
        price: '',
        original_price: '',
        rating: '4.0',
        review_count: '',
        affiliate_link: '',
        main_image: '',
        gallery_images: [''],
        description: `# Product Overview\n\nAdd your product description here.\n\n## Key Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Specifications\n\nAdd technical specifications here.\n\n## Why Choose This Product?\n\nExplain why this product is great for customers.`,
        meta_title: '',
        meta_description: '',
        status: 'draft',
        sort_order: '0',
        tags: [] as number[],
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Filter out empty gallery images
        const cleanedData = {
            ...data,
            gallery_images: data.gallery_images.filter(img => img.trim() !== ''),
        };

        router.post('/admin/products', cleanedData, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            }
        });
    };

    const addGalleryImage = () => {
        setData(prev => ({
            ...prev,
            gallery_images: [...prev.gallery_images, '']
        }));
    };

    const removeGalleryImage = (index: number) => {
        setData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.filter((_, i) => i !== index)
        }));
    };

    const updateGalleryImage = (index: number, value: string) => {
        setData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.map((img, i) => i === index ? value : img)
        }));
    };

    const toggleTag = (tagId: number) => {
        setData(prev => ({
            ...prev,
            tags: prev.tags.includes(tagId)
                ? prev.tags.filter(id => id !== tagId)
                : [...prev.tags, tagId]
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Product" />
            
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Link href="/admin/products" className="hover:text-orange-600">Products</Link>
                        <span>→</span>
                        <span>Add New Product</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">➕ Add New Product</h1>
                    <p className="text-gray-600 mt-2">
                        Create a new affiliate product with all the details needed for your store.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">📝 Basic Information</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Enter product name"
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
                                            If left empty, will be auto-generated from product name
                                        </p>
                                        {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Current Price * ($)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.price}
                                                onChange={(e) => setData(prev => ({ ...prev, price: e.target.value }))}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder="19.99"
                                                required
                                            />
                                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Original Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.original_price}
                                                onChange={(e) => setData(prev => ({ ...prev, original_price: e.target.value }))}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder="29.99"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">For showing discounts</p>
                                            {errors.original_price && <p className="text-red-600 text-sm mt-1">{errors.original_price}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rating (1-5)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={data.rating}
                                                onChange={(e) => setData(prev => ({ ...prev, rating: e.target.value }))}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                            {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Review Count
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.review_count}
                                                onChange={(e) => setData(prev => ({ ...prev, review_count: e.target.value }))}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder="150"
                                            />
                                            {errors.review_count && <p className="text-red-600 text-sm mt-1">{errors.review_count}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Shopee Affiliate Link *
                                        </label>
                                        <input
                                            type="url"
                                            value={data.affiliate_link}
                                            onChange={(e) => setData(prev => ({ ...prev, affiliate_link: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="https://shopee.com/product/..."
                                            required
                                        />
                                        {errors.affiliate_link && <p className="text-red-600 text-sm mt-1">{errors.affiliate_link}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">📸 Product Images</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Main Product Image
                                        </label>
                                        <input
                                            type="url"
                                            value={data.main_image}
                                            onChange={(e) => setData(prev => ({ ...prev, main_image: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.main_image && <p className="text-red-600 text-sm mt-1">{errors.main_image}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gallery Images
                                        </label>
                                        {data.gallery_images.map((image, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="url"
                                                    value={image}
                                                    onChange={(e) => updateGalleryImage(index, e.target.value)}
                                                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    placeholder="https://example.com/gallery-image.jpg"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addGalleryImage}
                                        >
                                            + Add Gallery Image
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">📄 Product Description</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rich Text Description *
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={15}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                                        placeholder="Use markdown-style formatting with # for headings..."
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Use # for main headings, ## for subheadings. Headings will automatically create a Table of Contents.
                                    </p>
                                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Settings */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="font-semibold mb-4">🚀 Publish Settings</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData(prev => ({ ...prev, status: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sort Order
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.sort_order}
                                            onChange={(e) => setData(prev => ({ ...prev, sort_order: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="0"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Lower numbers appear first
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="font-semibold mb-4">🏷️ Product Tags</h3>
                                
                                <div className="space-y-2">
                                    {tags.map((tag) => (
                                        <label key={tag.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.tags.includes(tag.id)}
                                                onChange={() => toggleTag(tag.id)}
                                                className="mr-2"
                                            />
                                            <span
                                                className="px-2 py-1 text-sm rounded-full text-white mr-2"
                                                style={{ backgroundColor: tag.color }}
                                            >
                                                {tag.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                
                                <Link href="/admin/tags/create" className="inline-block mt-3">
                                    <Button variant="outline" size="sm">
                                        + Create New Tag
                                    </Button>
                                </Link>
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="font-semibold mb-4">🔍 SEO Settings</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.meta_title}
                                            onChange={(e) => setData(prev => ({ ...prev, meta_title: e.target.value }))}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Auto-generated from product name"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Leave empty to use product name
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={data.meta_description}
                                            onChange={(e) => setData(prev => ({ ...prev, meta_description: e.target.value }))}
                                            rows={3}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="Brief description for search engines..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Actions */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="space-y-3">
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : '✅ Create Product'}
                                    </Button>
                                    
                                    <Link href="/admin/products">
                                        <Button variant="outline" className="w-full">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}