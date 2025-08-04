import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    settings: {
        [key: string]: {
            id: number;
            key: string;
            value: string;
            type: string;
            group: string;
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
        title: 'Settings',
        href: '/admin/settings',
    },
];

export default function AdminSettings({ settings }: Props) {
    const [data, setData] = useState({
        site_name: settings.site_name?.value || 'ShopeeDeals Pro',
        site_description: settings.site_description?.value || 'Your ultimate destination for the best Shopee deals',
        meta_title: settings.meta_title?.value || 'ShopeeDeals Pro - Best Deals & Product Reviews',
        meta_description: settings.meta_description?.value || 'Discover the best deals on Shopee with our curated product recommendations.',
        affiliate_disclaimer: settings.affiliate_disclaimer?.value || 'This site contains affiliate links. We may earn a commission when you purchase through these links at no additional cost to you.',
    });

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/admin/settings', data, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">⚙️ Site Settings</h1>
                    <p className="text-gray-600 mt-2">
                        Configure your website's general settings and SEO information.
                    </p>
                </div>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* General Settings */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6">🏠 General Settings</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name}
                                        onChange={(e) => setData(prev => ({ ...prev, site_name: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="ShopeeDeals Pro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site Description
                                    </label>
                                    <textarea
                                        value={data.site_description}
                                        onChange={(e) => setData(prev => ({ ...prev, site_description: e.target.value }))}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Your ultimate destination for the best Shopee deals"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Affiliate Disclaimer
                                    </label>
                                    <textarea
                                        value={data.affiliate_disclaimer}
                                        onChange={(e) => setData(prev => ({ ...prev, affiliate_disclaimer: e.target.value }))}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="This site contains affiliate links..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        This disclaimer will be shown in the footer and on product pages.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6">🔍 SEO Settings</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Default Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.meta_title}
                                        onChange={(e) => setData(prev => ({ ...prev, meta_title: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="ShopeeDeals Pro - Best Deals & Product Reviews"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        This will be used as the default title for your homepage and other pages.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Default Meta Description
                                    </label>
                                    <textarea
                                        value={data.meta_description}
                                        onChange={(e) => setData(prev => ({ ...prev, meta_description: e.target.value }))}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Discover the best deals on Shopee with our curated product recommendations..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Keep it under 160 characters for optimal SEO results.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Current Settings Preview */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6">👁️ Preview</h2>
                            
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                    {data.meta_title}
                                </h3>
                                <p className="text-green-600 text-sm mb-2">
                                    https://yoursite.com
                                </p>
                                <p className="text-gray-700 text-sm">
                                    {data.meta_description}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                This is how your site might appear in search engine results.
                            </p>
                        </div>

                        {/* Save Button */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : '💾 Save Settings'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}