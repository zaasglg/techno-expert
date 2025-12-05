import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { ContentLoader } from '@/components/content-loader';
import { Button } from '@/components/ui/button';
import {
    User,
    ShoppingBag,
    CreditCard,
    Heart,
    MapPin,
    Bell,
    Settings,
    LogOut,
    ChevronRight,
    Package,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react';

interface ProfileProps {
    user: {
        name: string;
        email: string;
        phone: string;
        avatar?: string;
    };
}

export default function Profile({ user }: ProfileProps) {
    const currentPath = window.location.pathname;

    const menuItems = [
        {
            icon: User,
            title: 'Профиль',
            description: 'Личные данные и настройки',
            href: '/profile',
        },
        {
            icon: ShoppingBag,
            title: 'Мои заказы',
            description: 'История покупок',
            href: '/profile/orders',
            badge: '3',
        },
        {
            icon: CreditCard,
            title: 'Карты',
            description: 'Способы оплаты',
            href: '/profile/cards',
        },
        {
            icon: Heart,
            title: 'Избранное',
            description: 'Сохраненные товары',
            href: '/profile/favorites',
            badge: '12',
        },
        {
            icon: MapPin,
            title: 'Адреса доставки',
            description: 'Управление адресами',
            href: '/profile/addresses',
        },
        {
            icon: Bell,
            title: 'Уведомления',
            description: 'Настройки оповещений',
            href: '/profile/notifications',
        },
        {
            icon: Settings,
            title: 'Настройки',
            description: 'Параметры аккаунта',
            href: '/profile/settings',
        },
    ];

    const recentOrders = [
        {
            id: '12345',
            date: '10 ноября 2024',
            status: 'delivered',
            statusText: 'Доставлен',
            total: 89990,
            items: 2,
        },
        {
            id: '12344',
            date: '5 ноября 2024',
            status: 'processing',
            statusText: 'В обработке',
            total: 45990,
            items: 1,
        },
        {
            id: '12343',
            date: '1 ноября 2024',
            status: 'cancelled',
            statusText: 'Отменен',
            total: 129990,
            items: 3,
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'processing':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Package className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <MainLayout auth={{ user: { name: user.name, email: user.email } }} currentPath="/profile" cartCount={0} className="min-h-screen bg-gray-50 py-8">
            <Head title="Профиль" />
                <div className="mx-auto max-w-[1400px] px-4">
                    {/* Breadcrumbs */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#1e3a8a]">
                            Главная
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Профиль</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                        {/* Left Sidebar */}
                        <aside>
                            {/* User Card */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600">Телефон</span>
                                        <span className="font-medium text-gray-900">{user.phone}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Бонусы</span>
                                        <span className="font-bold text-[#1e3a8a]">0 ₸</span>
                                    </div>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                {menuItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = currentPath === item.href;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center justify-between p-4 transition-colors border-b border-gray-100 last:border-b-0 ${
                                                isActive
                                                    ? 'bg-blue-50 border-l-4 border-l-[#1e3a8a]'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon
                                                    className={`h-5 w-5 ${
                                                        isActive ? 'text-[#1e3a8a]' : 'text-gray-600'
                                                    }`}
                                                />
                                                <div>
                                                    <div
                                                        className={`text-sm font-semibold ${
                                                            isActive ? 'text-[#1e3a8a]' : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{item.description}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item.badge && (
                                                    <span className="bg-[#1e3a8a] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </Link>
                                    );
                                })}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center justify-between p-4 w-full hover:bg-red-50 transition-colors text-red-600"
                                >
                                    <div className="flex items-center gap-3">
                                        <LogOut className="h-5 w-5" />
                                        <span className="text-sm font-semibold">Выйти</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="relative">
                            <ContentLoader />
                            {/* Welcome Section */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-6 text-white">
                                <h1 className="text-2xl font-bold mb-2">Добро пожаловать, {user.name}!</h1>
                                <p className="text-blue-100">
                                    Управляйте своими заказами, адресами и настройками аккаунта
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <ShoppingBag className="h-8 w-8 text-[#1e3a8a]" />
                                        <span className="text-3xl font-bold text-gray-900">3</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Всего заказов</p>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <Heart className="h-8 w-8 text-red-500" />
                                        <span className="text-3xl font-bold text-gray-900">12</span>
                                    </div>
                                    <p className="text-sm text-gray-600">В избранном</p>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <CreditCard className="h-8 w-8 text-green-500" />
                                        <span className="text-3xl font-bold text-gray-900">0 ₸</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Бонусный баланс</p>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Последние заказы</h2>
                                    <Link
                                        href="/profile/orders"
                                        className="text-sm font-semibold text-[#1e3a8a] hover:underline"
                                    >
                                        Все заказы
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:border-[#1e3a8a] transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    {getStatusIcon(order.status)}
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            Заказ #{order.id}
                                                        </div>
                                                        <div className="text-sm text-gray-600">{order.date}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">
                                                        {order.total.toLocaleString()} ₸
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {order.items} товар(а)
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {order.statusText}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-blue-50"
                                                >
                                                    Подробнее
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {recentOrders.length === 0 && (
                                    <div className="text-center py-12">
                                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-4">У вас пока нет заказов</p>
                                        <Link href="/products">
                                            <Button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                                                Начать покупки
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
        </MainLayout>
    );
}
