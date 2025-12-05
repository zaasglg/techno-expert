import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, TrendingUp, Star } from 'lucide-react';

interface CartProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Cart({ auth }: CartProps) {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'SSD Samsung 990 PRO 2TB',
            price: 89990,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&q=80',
            inStock: true,
        },
        {
            id: 2,
            name: 'SSD Kingston KC3000 2TB',
            price: 79990,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&q=80',
            inStock: true,
        },
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal > 50000 ? 0 : 2000;
    const total = subtotal + delivery;

    return (
        <MainLayout auth={auth} currentPath="/cart" cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} showFooter={true} className="bg-white">
            <Head title="Корзина" />

            <main className="bg-white">
                <div className="mx-auto max-w-[1400px] px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Корзина</h1>


                    {cartItems.length === 0 ? (
                        <div className="bg-gray-50 rounded-xl p-12 text-center">
                            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
                            <p className="text-gray-600 mb-4 text-sm">Добавьте товары, чтобы оформить заказ</p>
                            <Link href="/">
                                <Button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2.5 rounded-xl">
                                    Перейти к покупкам
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-3">
                                {cartItems.map(item => (
                                    <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-100">
                                        <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg p-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Link href="#" className="text-base font-semibold text-gray-900 hover:text-[#1e3a8a] transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-green-600 mt-0.5">В наличии</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                                                    >
                                                        <Minus className="h-3.5 w-3.5 text-gray-600" />
                                                    </button>
                                                    <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                                                    >
                                                        <Plus className="h-3.5 w-3.5 text-gray-600" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {(item.price * item.quantity).toLocaleString()} ₸
                                                    </span>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 sticky top-24">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Итого</h2>
                                    
                                    <div className="space-y-2.5 mb-4">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                            <span className="font-semibold">{subtotal.toLocaleString()} ₸</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Доставка</span>
                                            <span className="font-semibold">
                                                {delivery === 0 ? 'Бесплатно' : `${delivery.toLocaleString()} ₸`}
                                            </span>
                                        </div>
                                        {delivery > 0 && (
                                            <p className="text-xs text-gray-500">
                                                Бесплатная доставка от 50 000 ₸
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 pt-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-bold text-gray-900">К оплате</span>
                                            <span className="text-xl font-bold text-gray-900">
                                                {total.toLocaleString()} ₸
                                            </span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3">
                                        Оформить заказ
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>

                                    <div className="bg-blue-50 rounded-lg p-3 mt-3">
                                        <div className="flex items-start gap-2">
                                            <Tag className="h-4 w-4 text-[#1e3a8a] flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-gray-900 mb-1.5">
                                                    Есть промокод?
                                                </p>
                                                <input
                                                    type="text"
                                                    placeholder="Введите промокод"
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recommended Products */}
                    {cartItems.length > 0 && (
                        <div className="mt-12 border-t border-gray-100 pt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="h-5 w-5 text-[#1e3a8a]" />
                                <h2 className="text-xl font-bold text-gray-900">С этим товаром покупают</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {
                                        id: 10,
                                        name: 'Термопаста Arctic MX-4',
                                        price: 2990,
                                        rating: 4.9,
                                        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&q=80',
                                    },
                                    {
                                        id: 11,
                                        name: 'Кабель SATA 3.0 50см',
                                        price: 890,
                                        rating: 4.7,
                                        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&q=80',
                                    },
                                    {
                                        id: 12,
                                        name: 'Отвертка для M.2',
                                        price: 1490,
                                        rating: 4.8,
                                        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&q=80',
                                    },
                                    {
                                        id: 13,
                                        name: 'Радиатор для SSD',
                                        price: 3490,
                                        rating: 4.6,
                                        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&q=80',
                                    },
                                ].map((item) => (
                                    <div key={item.id} className="group bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors border border-gray-100">
                                        <div className="relative aspect-square bg-white">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover p-3"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="text-sm font-medium text-gray-900 mb-1.5 line-clamp-2 group-hover:text-[#1e3a8a] transition-colors">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium text-gray-700">{item.rating}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-base font-bold text-gray-900">
                                                    {item.price.toLocaleString()} ₸
                                                </span>
                                                <button className="w-7 h-7 rounded-lg bg-[#1e3a8a] hover:bg-[#1e40af] flex items-center justify-center transition-colors">
                                                    <Plus className="h-4 w-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
