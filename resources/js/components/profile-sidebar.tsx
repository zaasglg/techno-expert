import { Link } from '@inertiajs/react';
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
} from 'lucide-react';

interface ProfileSidebarProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
    currentPath?: string;
}

export function ProfileSidebar({ user, currentPath }: ProfileSidebarProps) {
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

    return (
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
                                isActive ? 'bg-blue-50 border-l-4 border-l-[#1e3a8a]' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className={`h-5 w-5 ${isActive ? 'text-[#1e3a8a]' : 'text-gray-600'}`}
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
    );
}
