import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    useEffect(() => {
        // Redirect to admin dashboard
        router.visit('/admin');
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔄</div>
                    <p className="text-gray-600">Redirecting to admin panel...</p>
                </div>
            </div>
        </AppLayout>
    );
}
