import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { ContentLoader } from '@/components/content-loader';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    inStock: boolean;
}

interface FavoritesProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function Favorites({ user }: FavoritesProps) {
    const auth = { user: { name: user.name, email: user.email } };
    const [favorites, setFavorites] = useState<Product[]>([
        {
            id: 1,
            name: 'SSD Samsung 990 PRO 2TB NVMe',
            price: 89990,
            oldPrice: 109990,
            image: '/images/products/ssd.jpg',
            inStock: true,
        },
        {
            id: 2,
            name: 'RAM DDR5 32GB Kingston Fury 5600MHz',
            price: 64990,
            oldPrice: 74990,
            image: '/images/products/ram.jpg',
            inStock: true,
        },
        {
            id: 3,
            name: 'Матрица 15.6" Full HD IPS 144Hz',
            price: 45990,
            image: '/images/products/screen.jpg',
            inStock: false,
        },
        {
            id: 4,
            name: 'Батарея для ноутбука Li-ion 6000mAh',
            price: 24990,
            oldPrice: 29990,
            image: '/images/products/battery.jpg',
            inStock: true,
        },
    ]);

    const removeFromFavorites = (id: number) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };

    return (
        <MainLayout auth={auth} currentPath="/profile/favorites" cartCount={0} className="min-h-screen bg-gray-50 py-8">
            <Head title="Избранное" />
            <div className="mx-auto max-w-[1400px] px-4">
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-[#1e3a8a]">Главная</Link>
                    <span>/</span>
                    <Link href="/profile" className="hover:text-[#1e3a8a]">Профиль</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Избранное</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    {/* Sidebar */}
                    <ProfileSidebar user={user} currentPath="/profile/favorites" />

                    {/* Main Content */}
                    <main className="relative">
                        <ContentLoader />
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
                            <div className="text-sm text-gray-600">
                                {favorites.length} товар(ов)
                            </div>
                        </div>

                        {favorites.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {favorites.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col"
                                    >
                                        <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                                            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeFromFavorites(product.id);
                                                    }}
                                                    className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center border border-red-200 transition-colors"
                                                >
                                                    <X className="h-4 w-4 text-red-500" />
                                                </button>
                                                {product.oldPrice && (
                                                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                                    </div>
                                                )}
                                                {!product.inStock && (
                                                    <div className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                                        Нет в наличии
                                                    </div>
                                                )}
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium">
                                                        Фото товара
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 flex-1 flex flex-col">
                                                <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem] text-sm leading-tight">
                                                    {product.name}
                                                </h3>
                                                <div className="mt-auto">
                                                    {product.oldPrice && (
                                                        <div className="text-xs text-gray-400 line-through mb-0.5">
                                                            {product.oldPrice.toLocaleString()} ₸
                                                        </div>
                                                    )}
                                                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                                                        {product.price.toLocaleString()} ₸
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-2">
                                                        {product.inStock ? (
                                                            <span className="text-green-600 font-medium">✓ В наличии</span>
                                                        ) : (
                                                            <span className="text-gray-400">Ожидается поступление</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="p-3 pt-0">
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                                className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-xl h-10 transition-colors"
                                                disabled={!product.inStock}
                                            >
                                                {product.inStock ? (
                                                    <>
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        В корзину
                                                    </>
                                                ) : (
                                                    'Нет в наличии'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">В избранном пока ничего нет</p>
                                <Link href="/products">
                                    <Button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                                        Начать покупки
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
