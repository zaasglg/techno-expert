import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';

interface BottomNavigationProps {
    currentPath?: string;
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
    cartCount?: number;
}

export function BottomNavigation({ currentPath = '/', auth, cartCount = 0 }: BottomNavigationProps) {
    const isActive = (path: string) => {
        if (path === '/') {
            return currentPath === '/';
        }
        return currentPath?.startsWith(path);
    };

    const navItems = [
        {
            id: 'home',
            href: '/',
            icon: Home,
            label: 'Главная',
            active: currentPath === '/',
        },
        {
            id: 'products',
            href: '/products',
            icon: LayoutGrid,
            label: 'Каталог',
            active: currentPath?.startsWith('/products'),
        },
        {
            id: 'favorites',
            href: auth?.user ? '/profile/favorites' : '/auth',
            icon: Heart,
            label: 'Избранное',
            active: currentPath?.startsWith('/profile/favorites'),
        },
        {
            id: 'cart',
            href: '/cart',
            icon: 'cart',
            label: 'Корзина',
            active: currentPath?.startsWith('/cart'),
            badge: cartCount,
        },
        {
            id: 'profile',
            href: auth?.user ? '/profile' : '/auth',
            icon: User,
            label: auth?.user ? 'Профиль' : 'Войти',
            active: currentPath === '/profile' || currentPath?.startsWith('/profile/orders') || currentPath?.startsWith('/profile/cards') || currentPath?.startsWith('/profile/addresses') || currentPath?.startsWith('/profile/notifications') || currentPath?.startsWith('/profile/settings') || currentPath?.startsWith('/auth'),
        },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-5 h-14 max-w-full">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-0.5 transition-colors relative px-1",
                                item.active
                                    ? "text-[#1e3a8a]"
                                    : "text-gray-500 active:text-[#1e3a8a]"
                            )}
                        >
                            <div className="relative mb-0.5">
                                {Icon === 'cart' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={cn(
                                        "w-5 h-5 transition-all",
                                        item.active && "scale-110"
                                    )}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                ) : (
                                    <Icon className={cn(
                                        "w-5 h-5 transition-all",
                                        item.active && "scale-110"
                                    )} />
                                )}
                                {item.badge !== undefined && item.badge > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-[#1e3a8a] font-bold text-white ring-1 ring-white h-3.5 min-w-[14px] px-0.5 text-[8px]">
                                        {item.badge > 99 ? '99+' : item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={cn(
                                "text-[9px] leading-tight font-medium transition-all text-center",
                                item.active && "font-semibold"
                            )}>
                                {item.label}
                            </span>
                            {item.active && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1e3a8a] rounded-b-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
