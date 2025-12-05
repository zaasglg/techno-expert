import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { ContentLoader } from '@/components/content-loader';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, XCircle, Truck, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Order {
    id: string;
    date: string;
    status: 'delivered' | 'processing' | 'cancelled' | 'shipping';
    statusText: string;
    total: number;
    items: number;
    products: {
        name: string;
        quantity: number;
        price: number;
    }[];
}

interface OrdersProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function Orders({ user }: OrdersProps) {
    const auth = { user: { name: user.name, email: user.email } };
    const [filter, setFilter] = useState<'all' | 'delivered' | 'processing' | 'cancelled'>('all');

    const orders: Order[] = [
        {
            id: '12345',
            date: '10 ноября 2024',
            status: 'delivered',
            statusText: 'Доставлен',
            total: 89990,
            items: 2,
            products: [
                { name: 'SSD Samsung 990 PRO 2TB', quantity: 1, price: 89990 },
            ],
        },
        {
            id: '12344',
            date: '5 ноября 2024',
            status: 'processing',
            statusText: 'В обработке',
            total: 45990,
            items: 1,
            products: [
                { name: 'RAM DDR5 32GB Kingston', quantity: 1, price: 45990 },
            ],
        },
        {
            id: '12343',
            date: '1 ноября 2024',
            status: 'shipping',
            statusText: 'В пути',
            total: 129990,
            items: 3,
            products: [
                { name: 'Матрица 15.6" Full HD', quantity: 1, price: 45990 },
                { name: 'Клавиатура RGB', quantity: 1, price: 18990 },
                { name: 'Батарея Li-ion 6000mAh', quantity: 1, price: 24990 },
            ],
        },
        {
            id: '12342',
            date: '28 октября 2024',
            status: 'cancelled',
            statusText: 'Отменен',
            total: 64990,
            items: 1,
            products: [
                { name: 'Процессор Intel Core i7', quantity: 1, price: 64990 },
            ],
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'processing':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'shipping':
                return <Truck className="h-5 w-5 text-orange-500" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Package className="h-5 w-5 text-gray-500" />;
        }
    };

    const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

    return (
        <MainLayout auth={auth} currentPath="/profile/orders" cartCount={0} className="min-h-screen bg-gray-50 py-8">
            <Head title="Мои заказы" />
                <div className="mx-auto max-w-[1400px] px-4">
                    {/* Breadcrumbs */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#1e3a8a]">Главная</Link>
                        <span>/</span>
                        <Link href="/profile" className="hover:text-[#1e3a8a]">Профиль</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Мои заказы</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                        {/* Sidebar */}
                        <ProfileSidebar user={user} currentPath="/profile/orders" />

                        {/* Main Content */}
                        <main className="relative">
                            <ContentLoader />
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Мои заказы</h1>

                            {/* Filters */}
                    <div className="flex gap-2 mb-6 overflow-x-auto">
                        <Button
                            onClick={() => setFilter('all')}
                            variant={filter === 'all' ? 'default' : 'outline'}
                            className={cn(
                                'rounded-lg',
                                filter === 'all' && 'bg-[#1e3a8a] hover:bg-[#1e40af]'
                            )}
                        >
                            Все заказы
                        </Button>
                        <Button
                            onClick={() => setFilter('processing')}
                            variant={filter === 'processing' ? 'default' : 'outline'}
                            className={cn(
                                'rounded-lg',
                                filter === 'processing' && 'bg-[#1e3a8a] hover:bg-[#1e40af]'
                            )}
                        >
                            В обработке
                        </Button>
                        <Button
                            onClick={() => setFilter('delivered')}
                            variant={filter === 'delivered' ? 'default' : 'outline'}
                            className={cn(
                                'rounded-lg',
                                filter === 'delivered' && 'bg-[#1e3a8a] hover:bg-[#1e40af]'
                            )}
                        >
                            Доставлены
                        </Button>
                        <Button
                            onClick={() => setFilter('cancelled')}
                            variant={filter === 'cancelled' ? 'default' : 'outline'}
                            className={cn(
                                'rounded-lg',
                                filter === 'cancelled' && 'bg-[#1e3a8a] hover:bg-[#1e40af]'
                            )}
                        >
                            Отмененные
                        </Button>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    Заказ #{order.id}
                                                </div>
                                                <div className="text-sm text-gray-600">{order.date}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900 text-lg">
                                                {order.total.toLocaleString()} ₸
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {order.items} товар(а)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Products */}
                                <div className="p-6">
                                    <div className="space-y-3 mb-4">
                                        {order.products.map((product, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            Количество: {product.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {product.price.toLocaleString()} ₸
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm font-medium text-gray-700">
                                            Статус: {order.statusText}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-blue-50"
                                            >
                                                Подробнее
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                            {order.status === 'delivered' && (
                                                <Button
                                                    size="sm"
                                                    className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
                                                >
                                                    Повторить заказ
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">Заказов не найдено</p>
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
