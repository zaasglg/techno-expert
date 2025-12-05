import { useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Brand {
    id: string;
    name: string;
    count: number;
}

const BRANDS_PER_PAGE = 14; // 7 columns x 2 rows per slide

export function BrandCards() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('/api/proxy/brands');
                if (response.data?.status && response.data?.data) {
                    // Sort by count descending
                    const sortedBrands = response.data.data
                        .sort((a: Brand, b: Brand) => b.count - a.count);
                    setBrands(sortedBrands);
                }
            } catch (err) {
                setError('Не удалось загрузить бренды');
                console.error('Failed to fetch brands:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Generate a consistent color based on brand name
    const getBrandColor = (name: string): string => {
        const colors = [
            'bg-blue-50',
            'bg-emerald-50',
            'bg-violet-50',
            'bg-sky-50',
            'bg-amber-50',
            'bg-cyan-50',
            'bg-rose-50',
            'bg-indigo-50',
            'bg-lime-50',
            'bg-slate-100',
            'bg-pink-50',
            'bg-teal-50',
            'bg-orange-50',
            'bg-purple-50',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // Get initials for brand
    const getBrandInitials = (name: string): string => {
        const words = name.split(/[\s&]+/).filter(Boolean);
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    // Calculate total slides
    const totalSlides = Math.ceil(brands.length / BRANDS_PER_PAGE);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    if (loading) {
        return (
            <div className="py-8">
                <div className="mx-auto max-w-[1400px] px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Наши бренды</h2>
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8">
                <div className="mx-auto max-w-[1400px] px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Наши бренды</h2>
                    <p className="text-center text-gray-500 py-8">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-10">
            <div className="mx-auto max-w-[1400px] px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Наши бренды</h2>
                    </div>
                    {totalSlides > 1 && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">{currentSlide + 1} / {totalSlides}</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={prevSlide}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    aria-label="Предыдущие бренды"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    aria-label="Следующие бренды"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative overflow-hidden" ref={sliderRef}>
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                            const startIdx = slideIndex * BRANDS_PER_PAGE;
                            const slideBrands = brands.slice(startIdx, startIdx + BRANDS_PER_PAGE);
                            
                            return (
                                <div
                                    key={slideIndex}
                                    className="w-full flex-shrink-0"
                                >
                                    <div className="grid grid-cols-7 grid-rows-2 gap-3">
                                        {slideBrands.map((brand) => {
                                            return (
                                                <Link
                                                    key={brand.id}
                                                    href={`/products?brand=${encodeURIComponent(brand.id)}`}
                                                    aria-label={`Открыть бренд ${brand.name}`}
                                                    className="group relative bg-white border border-gray-100 rounded-xl py-5 px-3 hover:border-[#1e3a8a]/20 hover:shadow-lg hover:shadow-[#1e3a8a]/5 transition-all duration-200"
                                                >
                                                    <div className="flex flex-col items-center justify-center h-full">
                                                        <span className="text-[13px] text-center text-gray-800 font-semibold leading-tight block w-full truncate group-hover:text-[#1e3a8a] transition-colors">
                                                            {brand.name}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Subtle bottom accent on hover */}
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#1e3a8a] group-hover:w-8 transition-all duration-300 rounded-full" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
