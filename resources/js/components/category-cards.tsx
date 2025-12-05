import {
    Gift,
    Refrigerator,
    WashingMachine,
    Wind,
    Microwave,
    Droplets,
    Bike,
    Smartphone,
    Tv,
    Laptop,
    Headphones,
    Tablet,
    Sparkles,
    Fan
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface CategoryCard {
    id: number;
    name: string;
    icon: any;
    image?: string;
    count?: number;
    color?: string; // tailwind bg color class for icon background
}

const categoryCards: CategoryCard[] = [
    { id: 1, name: 'Подарочные карты', icon: Gift, count: 12, color: 'bg-blue-50' },
    { id: 2, name: 'Холодильники', icon: Refrigerator, count: 8, color: 'bg-emerald-50' },
    { id: 3, name: 'Стиральные машины', icon: WashingMachine, count: 6, color: 'bg-violet-50' },
    { id: 4, name: 'Пылесосы', icon: Wind, count: 4, color: 'bg-sky-50' },
    { id: 5, name: 'Встраиваемая техника', icon: Microwave, count: 5, color: 'bg-amber-50' },
    { id: 6, name: 'Водонагреватели', icon: Droplets, count: 3, color: 'bg-cyan-50' },
    { id: 7, name: 'Спорт, туризм, багаж', icon: Bike, count: 10, color: 'bg-rose-50' },
    { id: 8, name: 'Смартфоны и гаджеты', icon: Smartphone, count: 24, color: 'bg-indigo-50' },
    { id: 9, name: 'Телевизоры', icon: Tv, count: 7, color: 'bg-lime-50' },
    { id: 10, name: 'Ноутбуки', icon: Laptop, count: 18, color: 'bg-slate-50' },
    { id: 11, name: 'Наушники', icon: Headphones, count: 14, color: 'bg-pink-50' },
    { id: 12, name: 'Планшеты', icon: Tablet, count: 9, color: 'bg-amber-50' },
    { id: 13, name: 'Красота и здоровье', icon: Sparkles, count: 11, color: 'bg-rose-50' },
    { id: 14, name: 'Кондиционеры', icon: Fan, count: 2, color: 'bg-cyan-50' }
];

export function CategoryCards() {
    return (
        <div className="py-8">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                    {categoryCards.map((category) => {
                        const Icon = category.icon;
                        const bgClass = category.color || 'bg-gray-50';
                        return (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                role="link"
                                aria-label={`Открыть категорию ${category.name}`}
                                className={`relative bg-white rounded-md p-5 hover:shadow-2xl transition-all group`}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-14 h-14 flex items-center justify-center rounded-lg transition-colors`}> 
                                        {/* monochrome icon: use text color to keep one-tone */}
                                        <Icon className="w-7 h-7 text-gray-800" />
                                    </div>
                                    <span className="text-xs text-center text-gray-700 font-black leading- block max-w-[90px]">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
