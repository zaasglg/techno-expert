import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X, Heart, ShoppingCart, ArrowUpDown } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    inStock: boolean;
}

interface ProductsPageProps {
    products: Product[];
    categories: string[];
    brands: string[];
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function ProductsIndex({ products = [], categories = [], brands = [], auth }: ProductsPageProps) {
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        brand: true,
        features: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 500000]);
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 ||
        priceRange[0] !== 0 || priceRange[1] !== 500000;

    // Mock data для примера
    const mockProducts: Product[] = products.length > 0 ? products : [
        {
            id: 1,
            name: 'iPhone 15 Pro Max 256GB',
            price: 599990,
            oldPrice: 649990,
            image: '/images/products/iphone.jpg',
            rating: 4.8,
            reviews: 124,
            inStock: true,
        },
        {
            id: 2,
            name: 'Samsung Galaxy S24 Ultra',
            price: 549990,
            image: '/images/products/samsung.jpg',
            rating: 4.7,
            reviews: 89,
            inStock: true,
        },
        {
            id: 3,
            name: 'MacBook Pro 14" M3',
            price: 899990,
            oldPrice: 949990,
            image: '/images/products/macbook.jpg',
            rating: 4.9,
            reviews: 156,
            inStock: true,
        },
        {
            id: 4,
            name: 'AirPods Pro 2',
            price: 129990,
            image: '/images/products/airpods.jpg',
            rating: 4.6,
            reviews: 234,
            inStock: false,
        },
        {
            id: 5,
            name: 'iPad Pro 12.9" M2 256GB',
            price: 479990,
            oldPrice: 529990,
            image: '/images/products/ipad.jpg',
            rating: 4.8,
            reviews: 98,
            inStock: true,
        },
        {
            id: 6,
            name: 'Sony WH-1000XM5',
            price: 189990,
            image: '/images/products/sony.jpg',
            rating: 4.9,
            reviews: 312,
            inStock: true,
        },
        {
            id: 7,
            name: 'Apple Watch Series 9',
            price: 249990,
            oldPrice: 279990,
            image: '/images/products/watch.jpg',
            rating: 4.7,
            reviews: 187,
            inStock: true,
        },
        {
            id: 8,
            name: 'Xiaomi 13 Pro 256GB',
            price: 349990,
            image: '/images/products/xiaomi.jpg',
            rating: 4.6,
            reviews: 145,
            inStock: true,
        },
    ];

    const mockCategories = categories.length > 0 ? categories : [
        'Смартфоны',
        'Ноутбуки',
        'Планшеты',
        'Наушники',
        'Умные часы',
        'Аксессуары',
    ];

    const mockBrands = brands.length > 0 ? brands : [
        'Apple',
        'Samsung',
        'Xiaomi',
        'Huawei',
        'Sony',
        'LG',
    ];

    return (
        <MainLayout auth={auth} currentPath="/products" cartCount={0} showFooter={false} className="bg-gray-50">
            <Head title="Каталог товаров"></Head>
            <div className="min-h-screen mx-auto max-w-[1400px] px-4 py-4">
                {/* Breadcrumbs */}
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-[#1e3a8a]">Главная</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Каталог товаров</span>
                </div>

                {/* Page Header */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">Каталог товаров</h1>
                            <p className="text-gray-600 text-sm">Найдено {mockProducts.length} товаров</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden h-10 px-4 rounded-xl border-2 font-semibold"
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Фильтры
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Filters Sidebar */}
                    <aside
                        className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 lg:flex-shrink-0`}
                    >
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-4 lg:sticky lg:top-24">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 lg:pointer-events-none"
                                >
                                    <SlidersHorizontal className="h-5 w-5 text-[#1e3a8a]" />
                                    <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                                    <div className="lg:hidden">
                                        {showFilters ? (
                                            <ChevronUp className="h-5 w-5 text-gray-600" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-600" />
                                        )}
                                    </div>
                                </button>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="text-[#1e3a8a] hover:text-[#1e40af] hover:bg-blue-50 font-semibold rounded-lg"
                                    >
                                        Сбросить
                                    </Button>
                                )}
                            </div>

                            <div className={`space-y-4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                                {/* Category Filter */}
                                <div className="border-b-2 border-gray-100 pb-4">
                                    <button
                                        onClick={() => toggleSection('category')}
                                        className="flex w-full items-center justify-between mb-3 group"
                                    >
                                        <h3 className="font-bold text-gray-900 text-sm">Категория</h3>
                                        <div className="p-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                                            {expandedSections.category ? (
                                                <ChevronUp className="h-4 w-4 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-600" />
                                            )}
                                        </div>
                                    </button>
                                    {expandedSections.category && (
                                        <div className="space-y-2">
                                            {mockCategories.map((category) => (
                                                <label
                                                    key={category}
                                                    className="flex items-center gap-2 cursor-pointer group p-1.5 -mx-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category)}
                                                        onCheckedChange={() => toggleCategory(category)}
                                                        className="border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700 group-hover:text-[#1e3a8a] font-medium">
                                                        {category}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price Filter */}
                                <div className="border-b-2 border-gray-100 pb-4">
                                    <button
                                        onClick={() => toggleSection('price')}
                                        className="flex w-full items-center justify-between mb-3 group"
                                    >
                                        <h3 className="font-bold text-gray-900 text-sm">Цена</h3>
                                        <div className="p-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                                            {expandedSections.price ? (
                                                <ChevronUp className="h-4 w-4 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-600" />
                                            )}
                                        </div>
                                    </button>
                                    {expandedSections.price && (
                                        <div className="space-y-3">
                                            <div className="px-1">
                                                <Slider
                                                    value={priceRange}
                                                    onValueChange={setPriceRange}
                                                    max={500000}
                                                    step={10000}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block font-medium">От</label>
                                                    <Input
                                                        type="number"
                                                        value={priceRange[0]}
                                                        onChange={(e) =>
                                                            setPriceRange([Number(e.target.value), priceRange[1]])
                                                        }
                                                        className="h-9 text-sm font-semibold border-2 rounded-lg"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <span className="text-gray-400 mt-4">—</span>
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 mb-1 block font-medium">До</label>
                                                    <Input
                                                        type="number"
                                                        value={priceRange[1]}
                                                        onChange={(e) =>
                                                            setPriceRange([priceRange[0], Number(e.target.value)])
                                                        }
                                                        className="h-9 text-sm font-semibold border-2 rounded-lg"
                                                        placeholder="500000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Brand Filter */}
                                <div className="pb-2">
                                    <button
                                        onClick={() => toggleSection('brand')}
                                        className="flex w-full items-center justify-between mb-4 group"
                                    >
                                        <h3 className="font-bold text-gray-900 text-base">Бренд</h3>
                                        <div className="p-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                                            {expandedSections.brand ? (
                                                <ChevronUp className="h-4 w-4 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-gray-600" />
                                            )}
                                        </div>
                                    </button>
                                    {expandedSections.brand && (
                                        <div className="space-y-2">
                                            {mockBrands.map((brand) => (
                                                <label
                                                    key={brand}
                                                    className="flex items-center gap-2 cursor-pointer group p-1.5 -mx-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <Checkbox
                                                        checked={selectedBrands.includes(brand)}
                                                        onCheckedChange={() => toggleBrand(brand)}
                                                        className="border-gray-300"
                                                    />
                                                    <span className="text-sm text-gray-700 group-hover:text-[#1e3a8a] font-medium">
                                                        {brand}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {/* Sort and View Options */}
                        <div className="mb-4 flex items-center justify-between bg-white rounded-xl border-2 border-gray-200 p-3">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-gray-700">
                                    Показано {mockProducts.length} товаров
                                </span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-10 gap-2 border-2 rounded-lg font-semibold">
                                        <ArrowUpDown className="h-4 w-4" />
                                        Сортировка
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem onClick={() => setSortBy('popular')} className="cursor-pointer">
                                        По популярности
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="cursor-pointer">
                                        Сначала дешевые
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="cursor-pointer">
                                        Сначала дорогие
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy('rating')} className="cursor-pointer">
                                        По рейтингу
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy('new')} className="cursor-pointer">
                                        Новинки
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="mb-4 bg-blue-50 border-2 border-blue-100 rounded-xl p-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-700 mr-2">Активные фильтры:</span>
                                    {selectedCategories.map((category) => (
                                        <Button
                                            key={category}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleCategory(category)}
                                            className="h-8 gap-2 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 rounded-lg font-medium border-2"
                                        >
                                            {category}
                                            <X className="h-3 w-3" />
                                        </Button>
                                    ))}
                                    {selectedBrands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleBrand(brand)}
                                            className="h-8 gap-2 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 rounded-lg font-medium border-2"
                                        >
                                            {brand}
                                            <X className="h-3 w-3" />
                                        </Button>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold ml-auto"
                                    >
                                        Очистить все
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {mockProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors flex flex-col"
                                >
                                    <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
                                        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-2 md:p-4">
                                            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1 md:gap-2">
                                                <button
                                                    onClick={(e) => e.preventDefault()}
                                                    className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white hover:scale-110 hover:text-red-500 transition-all duration-200 flex items-center justify-center border border-gray-200"
                                                >
                                                    <Heart className="h-3 w-3 md:h-4 md:w-4" />
                                                </button>
                                            </div>
                                            {product.oldPrice && (
                                                <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                                </div>
                                            )}
                                            {!product.inStock && (
                                                <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gray-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                                                    Нет в наличии
                                                </div>
                                            )}
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 text-xs md:text-sm font-medium">
                                                    Фото товара
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 md:p-3 flex-1 flex flex-col">
                                            <h3 className="font-semibold text-gray-900 mb-1 md:mb-1.5 line-clamp-2 min-h-[2rem] md:min-h-[2.5rem] group-hover:text-[#1e3a8a] transition-colors leading-tight text-xs md:text-sm">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                                                <div className="flex items-center gap-0.5 md:gap-1 bg-yellow-50 px-1.5 md:px-2 py-0.5 rounded-lg">
                                                    <span className="text-yellow-500 text-xs md:text-sm">★</span>
                                                    <span className="text-xs md:text-sm font-semibold text-gray-900">{product.rating}</span>
                                                </div>
                                                <span className="text-[10px] md:text-xs text-gray-500 hidden sm:inline">({product.reviews})</span>
                                            </div>
                                            <div className="mt-auto">
                                                {product.oldPrice && (
                                                    <div className="text-[10px] md:text-xs text-gray-400 line-through mb-0.5">
                                                        {product.oldPrice.toLocaleString()} ₸
                                                    </div>
                                                )}
                                                <div className="text-base md:text-xl font-bold text-gray-900 mb-0.5">
                                                    {product.price.toLocaleString()} ₸
                                                </div>
                                                <div className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">
                                                    {product.inStock ? (
                                                        <span className="text-green-600 font-medium">✓ В наличии</span>
                                                    ) : (
                                                        <span className="text-gray-400">Ожидается</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-2 md:p-3 pt-0">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // Логика добавления в корзину
                                            }}
                                            className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg md:rounded-xl h-8 md:h-10 text-xs md:text-sm transition-colors"
                                            disabled={!product.inStock}
                                        >
                                            {product.inStock ? (
                                                <>
                                                    <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                                    <span className="hidden sm:inline">В корзину</span>
                                                    <span className="sm:hidden">Купить</span>
                                                </>
                                            ) : (
                                                <span className="text-[10px] md:text-sm">Нет в наличии</span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
