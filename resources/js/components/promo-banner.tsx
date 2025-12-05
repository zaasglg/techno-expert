import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface BannerSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    price?: string;
    oldPrice?: string;
    badge?: string;
    features: string[];
    image: string;
    buttonText: string;
    buttonLink: string;
    bgColor: string;
}

interface MiniSlide {
    id: number;
    title: string;
    badge?: string;
    image: string;
    link: string;
    bgColor: string;
}

const bannerSlides: BannerSlide[] = [
    {
        id: 1,
        title: 'SSD Samsung 990 PRO 2TB',
        subtitle: 'Максимальная скорость для вашего ноутбука',
        description: 'NVMe PCIe 4.0. Скорость чтения до 7450 МБ/с. Идеально для игр и работы.',
        price: '89 990 ₸',
        oldPrice: '109 990 ₸',
        badge: '-18%',
        features: ['2TB', 'PCIe 4.0', '7450 МБ/с'],
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
        buttonText: 'Купить сейчас',
        buttonLink: '#',
        bgColor: 'bg-white'
    },
    {
        id: 2,
        title: 'RAM DDR5 32GB Kingston',
        subtitle: 'Ускорьте работу вашего ноутбука',
        description: 'Частота 5600 МГц. Низкое энергопотребление. Совместимость с Intel и AMD.',
        price: '64 990 ₸',
        oldPrice: '74 990 ₸',
        badge: '-13%',
        features: ['32GB', 'DDR5', '5600 МГц'],
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
        buttonText: 'Заказать',
        buttonLink: '#',
        bgColor: 'bg-white'
    },
    {
        id: 3,
        title: 'Матрица 15.6" Full HD IPS',
        subtitle: 'Яркий и четкий дисплей для работы и развлечений',
        description: 'Разрешение 1920x1080. Углы обзора 178°. Частота обновления 144Hz.',
        price: '45 990 ₸',
        badge: 'Хит продаж',
        features: ['15.6"', 'Full HD', '144Hz'],
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
        buttonText: 'Смотреть',
        buttonLink: '#',
        bgColor: 'bg-white'
    },
    {
        id: 5,
        title: 'Клавиатура для ноутбука с подсветкой',
        subtitle: 'Комфортная работа в любое время суток',
        description: 'RGB подсветка. Совместимость с Asus, Acer, MSI. Русская раскладка.',
        price: '18 990 ₸',
        oldPrice: '22 990 ₸',
        badge: '-17%',
        features: ['RGB', 'RU раскладка', 'Универсальная'],
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        buttonText: 'Заказать',
        buttonLink: '#',
        bgColor: 'bg-white'
    }
];

const miniSlides: MiniSlide[] = [
    {
        id: 1,
        title: 'Скидка 25% на все SSD',
        badge: '-25%',
        image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    },
    {
        id: 2,
        title: 'Новинки клавиатур RGB',
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    },
    {
        id: 3,
        title: 'Бесплатная доставка',
        badge: '0 ₸',
        image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    },
    {
        id: 4,
        title: 'Матрицы Full HD',
        badge: 'ХИТ',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    },
    {
        id: 5,
        title: 'Батареи с гарантией',
        badge: '1 год',
        image: 'https://images.unsplash.com/photo-1609592806955-e6970f5cd5c4?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    },
    {
        id: 6,
        title: 'Процессоры Intel',
        badge: 'TOP',
        image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80',
        link: '#',
        bgColor: 'bg-white'
    }
];

export function PromoBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentMiniSlide, setCurrentMiniSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const nextMiniSlide = () => {
        setCurrentMiniSlide((prev) => (prev + 1) % miniSlides.length);
    };



    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const miniTimer = setInterval(nextMiniSlide, 3000);
        return () => clearInterval(miniTimer);
    }, []);

    return (
        <div className="relative w-full overflow-hidden py-3 md:py-6">
            {/* Carousel Container */}
            <div className="mx-auto max-w-[1400px] px-3 md:px-4">
                <div className="flex gap-3 md:gap-4">
                    {/* Main Banner */}
                    <div className="flex-1">
                        <div className="relative h-[240px] md:h-[420px] lg:h-[480px] rounded-lg md:rounded-xl overflow-hidden ">
                    {bannerSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                index === currentSlide
                                    ? 'opacity-100 translate-x-0'
                                    : index < currentSlide
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                            }`}
                        >
                            <div className={`relative h-full w-full ${slide.bgColor}`}>
                                <div className="px-3 md:px-8 lg:px-12 h-full">
                                    {/* Mobile Layout - Flex with image on left */}
                                    <div className="md:hidden flex gap-3 h-full items-center py-3">
                                        {/* Mobile Image - Left */}
                                        <div className="flex-shrink-0 w-24">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>

                                        {/* Mobile Text Content */}
                                        <div className="flex-1 text-gray-900 space-y-1.5 min-w-0">
                                            {slide.badge && (
                                                <span className="inline-flex items-center bg-green-500 text-white px-2 py-0.5 rounded-md text-md font-bold">
                                                    {slide.badge}
                                                </span>
                                            )}
                                            <h1 className="text-base font-bold leading-tight text-gray-900">
                                                {slide.title}
                                            </h1>
                                            <p className="text-[11px] text-gray-600 line-clamp-2">
                                                {slide.subtitle}
                                            </p>
                                            
                                            {/* Features */}
                                            <div className="flex flex-wrap gap-1">
                                                {slide.features.slice(0, 3).map((feature, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="bg-gray-50 border border-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[9px] font-medium"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Price */}
                                            {slide.price && (
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {slide.price}
                                                    </span>
                                                    {slide.oldPrice && (
                                                        <span className="text-[11px] text-gray-400 line-through">
                                                            {slide.oldPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <Button 
                                                className="bg-blue-500 hover:bg-blue-600 text-white text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-colors w-full"
                                            >
                                                {slide.buttonText}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Desktop Layout - Grid */}
                                    <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                                        {/* Text Content */}
                                        <div className="text-gray-900 z-10 space-y-3">
                                            {slide.badge && (
                                                <span className="inline-flex items-center bg-green-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-bold">
                                                    {slide.badge}
                                                </span>
                                            )}
                                            <h1 className="text-lg md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                                                {slide.title}
                                            </h1>
                                            <p className="text-xs md:text-base text-gray-600 max-w-xl">
                                                {slide.subtitle}
                                            </p>
                                            <p className="text-[10px] md:text-sm text-gray-500 max-w-xl leading-relaxed hidden md:block">
                                                {slide.description}
                                            </p>
                                            
                                            {/* Features */}
                                            <div className="flex flex-wrap gap-1 md:gap-2">
                                                {slide.features.map((feature, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="bg-gray-50 border border-gray-200 text-gray-700 px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-xs font-medium"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Price */}
                                            {slide.price && (
                                                <div className="flex items-baseline gap-1 md:gap-2 pt-0.5 md:pt-1">
                                                    <span className="text-xl md:text-3xl font-bold text-gray-900">
                                                        {slide.price}
                                                    </span>
                                                    {slide.oldPrice && (
                                                        <span className="text-sm md:text-base text-gray-400 line-through">
                                                            {slide.oldPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <Button 
                                                className="w-[10rem] bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-4 md:px-6 py-3 md:py-6 rounded-lg md:rounded-lg font-semibold transition-colors"
                                            >
                                                {slide.buttonText}
                                            </Button>
                                        </div>

                                        {/* Desktop Image */}
                                        <div className="relative h-full flex items-center justify-center lg:justify-end">
                                            <div className="relative">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="max-h-[260px] lg:max-h-[300px] w-auto object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                            {/* Dots Indicator - Inside slider at bottom */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {bannerSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentSlide
                                                ? 'w-6 bg-[#1e3a8a]'
                                                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mini Slider - Hidden on mobile */}
                    <div className="hidden lg:block w-64">
                        <div className="relative h-[480px] rounded-xl overflow-hidden bg-white">
                            {miniSlides.map((slide, index) => (
                                <Link
                                    key={slide.id}
                                    href={slide.link}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                        index === currentMiniSlide
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-95'
                                    }`}
                                >
                                    <div className={`relative h-full w-full ${slide.bgColor} flex flex-col hover:shadow-lg transition-all duration-300 group`}>
                                        
                                        {/* Badge */}
                                        {slide.badge && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="inline-flex items-center bg-green-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                                                    {slide.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Favorite Icon */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Navigation Arrows */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentMiniSlide((prev) => (prev - 1 + miniSlides.length) % miniSlides.length);
                                            }}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentMiniSlide((prev) => (prev + 1) % miniSlides.length);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                        
                                        {/* Image */}
                                        <div className="flex-1 flex items-center justify-center p-8 pt-12">
                                            <div className="relative">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="max-h-48 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 pt-2 border-t border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
                                                {slide.title}
                                            </h3>
                                            
                                            {/* Price */}
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-lg font-bold text-gray-900">
                                                    169 990 ₸
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    219 990 ₸
                                                </span>
                                            </div>

                                            {/* Button */}
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                                                В корзину
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
