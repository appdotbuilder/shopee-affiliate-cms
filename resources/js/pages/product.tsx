import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
        tags: Array<{
            id: number;
            name: string;
            color: string;
        }>;
    };
    [key: string]: unknown;
}

export default function Product({ product }: Props) {
    const [selectedImage, setSelectedImage] = useState(product.main_image || '');
    const [showFullDescription, setShowFullDescription] = useState(false);

    const images = [
        ...(product.main_image ? [product.main_image] : []),
        ...(product.gallery_images || [])
    ];

    // Generate Table of Contents from description headings
    const generateTOC = (text: string) => {
        const lines = text.split('\n');
        const toc: Array<{ level: number; text: string; id: string }> = [];
        
        lines.forEach((line) => {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                toc.push({ level, text, id });
            }
        });
        
        return toc;
    };

    // Convert markdown-style description to HTML
    const formatDescription = (text: string) => {
        return text
            .split('\n')
            .map((line, index) => {
                // Headers
                if (line.match(/^#{1,6}\s+/)) {
                    const match = line.match(/^(#{1,6})\s+(.+)$/);
                    if (match) {
                        const level = match[1].length;
                        const text = match[2];
                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        const TagName = `h${Math.min(level + 1, 6)}` as keyof React.JSX.IntrinsicElements;
                        return (
                            <TagName
                                key={index}
                                id={id}
                                className={`font-bold mt-6 mb-3 ${
                                    level === 1 ? 'text-2xl' : 
                                    level === 2 ? 'text-xl' : 
                                    'text-lg'
                                }`}
                            >
                                {text}
                            </TagName>
                        );
                    }
                }
                
                // Bullet points
                if (line.match(/^-\s+/)) {
                    return (
                        <li key={index} className="ml-4">
                            {line.replace(/^-\s+/, '')}
                        </li>
                    );
                }
                
                // Regular paragraphs
                if (line.trim()) {
                    return (
                        <p key={index} className="mb-3 leading-relaxed">
                            {line}
                        </p>
                    );
                }
                
                return <br key={index} />;
            });
    };

    const toc = generateTOC(product.description);
    const discountPercentage = product.original_price 
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0;

    return (
        <>
            <Head title={product.meta_title || product.name}>
                <meta name="description" content={product.meta_description || ''} />
            </Head>
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href="/" className="text-2xl font-bold text-orange-600">
                                🛍️ ShopeeDeals Pro
                            </Link>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-orange-600 font-medium"
                                >
                                    ← Back to Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Product Images */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Main Image */}
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                📷 No Image Available
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {product.tags.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    className="px-3 py-1 text-sm rounded-full text-white"
                                                    style={{ backgroundColor: tag.color }}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>

                                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                            {product.name}
                                        </h1>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                            ⭐
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-gray-600">
                                                    {product.rating} ({product.review_count} reviews)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-3xl font-bold text-orange-600">
                                                ${product.price}
                                            </span>
                                            {product.original_price && (
                                                <>
                                                    <span className="text-xl text-gray-500 line-through">
                                                        ${product.original_price}
                                                    </span>
                                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                                                        {discountPercentage}% OFF
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <a
                                            href={product.affiliate_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">
                                                🛒 Buy on Shopee
                                            </Button>
                                        </a>

                                        <p className="text-xs text-gray-500 mt-2 text-center">
                                            * Affiliate link - We may earn a commission at no cost to you
                                        </p>
                                    </div>
                                </div>

                                {/* Image Gallery */}
                                {images.length > 1 && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-3">📸 More Images</h3>
                                        <div className="flex gap-3 overflow-x-auto">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(image)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                        selectedImage === image ? 'border-orange-500' : 'border-gray-200'
                                                    }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${product.name} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Description */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4">📝 Product Details</h2>
                                <div className="prose prose-gray max-w-none">
                                    <div className={showFullDescription ? '' : 'max-h-96 overflow-hidden relative'}>
                                        {formatDescription(product.description)}
                                        {!showFullDescription && (
                                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                                        )}
                                    </div>
                                    {!showFullDescription && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowFullDescription(true)}
                                            className="mt-4"
                                        >
                                            Show More ↓
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Table of Contents */}
                            {toc.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
                                    <h3 className="font-bold text-lg mb-4">📑 Table of Contents</h3>
                                    <nav className="space-y-2">
                                        {toc.map((item, index) => (
                                            <a
                                                key={index}
                                                href={`#${item.id}`}
                                                className={`block text-sm hover:text-orange-600 ${
                                                    item.level === 1 ? 'font-semibold' : 
                                                    item.level === 2 ? 'pl-3' : 'pl-6'
                                                }`}
                                            >
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Buy Button (Sticky) */}
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                                <div className="text-center mb-4">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">
                                        ${product.price}
                                    </div>
                                    {product.original_price && (
                                        <div className="text-gray-500 line-through">
                                            ${product.original_price}
                                        </div>
                                    )}
                                </div>
                                
                                <a
                                    href={product.affiliate_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                                        🛒 Buy Now on Shopee
                                    </Button>
                                </a>

                                <div className="mt-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <span>⭐ {product.rating}</span>
                                        <span>•</span>
                                        <span>{product.review_count} reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Link href="/" className="text-lg font-bold text-orange-400 mb-2 inline-block">
                            🛍️ ShopeeDeals Pro
                        </Link>
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