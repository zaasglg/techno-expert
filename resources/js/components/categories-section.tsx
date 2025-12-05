import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Laptop,
    HardDrive,
    Monitor,
    Battery,
    Keyboard,
    Fan,
    Cpu,
    MemoryStick,
    Loader2,
    MoveRight,
    ArrowRight,
    ChevronRight,
    Star,
    ShoppingCart,
    ChevronDown
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

interface Category {
    id: number;
    name: string;
    left?: number;
    right?: number;
    level?: number;
    elements?: number;
    icon?: any;
}

interface Product {
    article: number;
    name: string;
    full_name: string;
    category: number;
    sort: number;
    price1: number;
    price2: number;
    quantity: number | string;
    isnew: number;
    article_pn: string;
    images?: string[]; // Images from backend
}

const defaultIcon = Monitor;
const iconMap: { [key: string]: any } = {
    'телефон': Cpu,
    'смартфон': Cpu,
    'компьютер': Laptop,
    'ноутбук': Laptop,
    'клавиатура': Keyboard,
    'память': MemoryStick,
    'диск': HardDrive,
    'батарея': Battery,
    'кулер': Fan,
    'монитор': Monitor,
};

const getIconForCategory = (name: string): any => {
    const lowerName = name.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerName.includes(key)) {
            return icon;
        }
    }
    return defaultIcon;
};

const calculateDiscount = (price1: number, price2: number): number => {
    if (price2 > price1) {
        return Math.round(((price2 - price1) / price2) * 100);
    }
    return 0;
};

const generateBadges = (product: Product): string[] => {
    const badges: string[] = [];

    if (product.isnew === 1) {
        badges.push('Новинка');
    }

    const discount = calculateDiscount(product.price1, product.price2);
    if (discount > 0) {
        badges.push(`-${discount}%`);
    }

    return badges;
};

const generateRating = (): number => {
    return parseFloat((4.0 + Math.random() * 1.0).toFixed(1));
};

export function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [allCategories, setAllCategories] = useState<Category[]>([]);

    // Cache keys
    const CATEGORIES_CACHE_KEY = 'cached_categories';
    const PRODUCTS_CACHE_KEY = 'cached_products_with_images';
    const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

    // Load from cache on mount
    useEffect(() => {
        const cachedCategories = localStorage.getItem(CATEGORIES_CACHE_KEY);
        const cachedProducts = localStorage.getItem(PRODUCTS_CACHE_KEY);

        let categoriesLoaded = false;
        let productsLoaded = false;

        if (cachedCategories) {
            try {
                const { data, timestamp } = JSON.parse(cachedCategories);
                if (Date.now() - timestamp < CACHE_EXPIRY) {
                    setCategories(data.categories);
                    setAllCategories(data.allCategories);
                    categoriesLoaded = true;
                    console.log('Loaded categories from cache');
                }
            } catch (error) {
                console.error('Error parsing cached categories:', error);
            }
        }

        if (cachedProducts) {
            try {
                const { data, timestamp } = JSON.parse(cachedProducts);
                if (Date.now() - timestamp < CACHE_EXPIRY) {
                    setProducts(data.products);
                    setAllProducts(data.allProducts);
                    productsLoaded = true;
                    console.log('Loaded products from cache');
                }
            } catch (error) {
                console.error('Error parsing cached products:', error);
            }
        }

        // If both are loaded from cache, hide loading states
        if (categoriesLoaded && productsLoaded) {
            setLoading(false);
            setProductsLoading(false);
        }
    }, []);
    const VISIBLE_CATEGORIES_LIMIT = 20;
    const INITIAL_PRODUCTS_LIMIT = 20;
    const LOAD_MORE_STEP = 20;

    useEffect(() => {
        const fetchCategories = async () => {
            const startTime = performance.now();
            let retryCount = 0;
            const maxRetries = 2;

            const attemptFetch = async () => {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

                    const response = await fetch(
                        '/api/proxy/categories',
                        { signal: controller.signal }
                    );
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    // Handle API response format { status: true, data: [...] }
                    const categoriesArray = data?.data || data;
                    
                    // Validate that data is an array
                    if (!Array.isArray(categoriesArray)) {
                        console.error('Categories API response is not an array:', data);
                        // Don't set empty arrays if it's a rate limit error
                        if (data.success === false || data.status === false) {
                            console.log('Rate limited for categories, using cached data');
                        } else {
                            setCategories([]);
                            setAllCategories([]);
                        }
                        return;
                    }

                    const firstLevelCategories = categoriesArray.filter((cat: Category) => cat.level === 1);

                    const categoriesWithIcons = firstLevelCategories.map((cat: Category) => ({
                        ...cat,
                        icon: getIconForCategory(cat.name)
                    }));

                    setCategories(categoriesWithIcons);
                    setAllCategories(categoriesArray);

                    // Cache the data
                    const cacheData = {
                        data: {
                            categories: categoriesWithIcons,
                            allCategories: categoriesArray
                        },
                        timestamp: Date.now()
                    };
                    localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(cacheData));

                    const endTime = performance.now();
                    console.log(`Categories loaded in ${(endTime - startTime).toFixed(2)}ms`);
                } catch (error) {
                    if (error instanceof Error && error.name === 'AbortError') {
                        console.error('Request timeout: Categories took too long to load');
                        if (retryCount < maxRetries) {
                            retryCount++;
                            console.log(`Retrying categories fetch (${retryCount}/${maxRetries})...`);
                            setTimeout(attemptFetch, 5000 * retryCount); // Increased delay for rate limiting
                            return;
                        }
                    } else {
                        console.error('Error fetching categories:', error);
                    }
                    // Don't clear cache on rate limit errors
                    if (!categories.some(cat => cat.name === 'Rate limit')) {
                        setCategories([]);
                        setAllCategories([]);
                    }
                } finally {
                    setLoading(false);
                }
            };

            attemptFetch();
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            // Wait for categories to load first to avoid rate limiting
            if (loading) {
                setTimeout(() => fetchProducts(), 3000); // Wait 3 seconds for categories
                return;
            }

            const startTime = performance.now();
            let retryCount = 0;
            const maxRetries = 2;

            const attemptFetch = async () => {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

                    const response = await fetch(
                        '/api/proxy/products-with-images',
                        { signal: controller.signal }
                    );
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    // Validate that data is an array
                    if (!Array.isArray(data)) {
                        console.error('Products API response is not an array:', data);
                        // Don't set empty arrays if it's a rate limit error
                        if (data.success === false) {
                            console.log('Rate limited for products, using cached data');
                        } else {
                            setAllProducts([]);
                            setProducts([]);
                        }
                        return;
                    }

                    // Products already include images from backend
                    const flatProducts = Array.isArray(data[0]) ? data.flat() : data;
                    setAllProducts(flatProducts);

                    const limitedProducts = flatProducts.slice(0, INITIAL_PRODUCTS_LIMIT);
                    setProducts(limitedProducts);

                    // Cache the data
                    const cacheData = {
                        data: {
                            products: limitedProducts,
                            allProducts: flatProducts
                        },
                        timestamp: Date.now()
                    };
                    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(cacheData));

                    const endTime = performance.now();
                    console.log(`Products with images loaded in ${(endTime - startTime).toFixed(2)}ms`);
                } catch (error) {
                    if (error instanceof Error && error.name === 'AbortError') {
                        console.error('Request timeout: Products took too long to load');
                        if (retryCount < maxRetries) {
                            retryCount++;
                            console.log(`Retrying products fetch (${retryCount}/${maxRetries})...`);
                            setTimeout(attemptFetch, 5000 * retryCount); // Increased delay for rate limiting
                            return;
                        }
                    } else {
                        console.error('Error fetching products:', error);
                    }
                    // Don't clear cache on rate limit errors
                    if (!products.some(p => p.name === 'Rate limit')) {
                        setAllProducts([]);
                        setProducts([]);
                    }
                } finally {
                    setProductsLoading(false);
                }
            };

            attemptFetch();
        };

        fetchProducts();
    }, [loading]); // Add loading as dependency

    const handleShowMore = () => {
        const currentLength = products.length;
        const nextProducts = allProducts.slice(currentLength, currentLength + LOAD_MORE_STEP);
        setProducts(prev => [...prev, ...nextProducts]);
    };

    return (
        <div className="py-8">
            <div className="mx-auto max-w-[1400px] px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Товары:
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-3">
                    <div className="hidden lg:block  rounded-sm h-fit">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-8 h-8 text-[#1e3a8a] animate-spin" />
                            </div>
                        ) : (
                            <>
                                <div>
                                    {categories
                                        .slice(0, VISIBLE_CATEGORIES_LIMIT)
                                        .map((category) => {
                                            const Icon = category.icon;
                                            const isExpanded = expandedCategory === category.id;
                                            const childCategories = allCategories.filter(cat => cat.level === 2 && cat.left && cat.right && category.left && category.right && cat.left > category.left && cat.right < category.right);

                                            return (
                                                <Collapsible key={category.id} open={isExpanded} onOpenChange={() => setExpandedCategory(isExpanded ? null : category.id)}>
                                                    <CollapsibleTrigger asChild>
                                                        <button
                                                            className="cursor-pointer w-full flex items-center justify-between px-3 py-4 rounded-lg hover:bg-gray-50 transition-colors text-left group hover:underline bg-white mb-3 font-black"
                                                        >
                                                            <span className="block leading-4 text-sm text-gray-700 group-hover:text-[#1e3a8a]">
                                                                {category.name}
                                                            </span>
                                                            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-[#1e3a8a] transition-colors ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent className="pl-4 border-l-2 border-gray-200">
                                                        {childCategories.map((childCategory) => {
                                                            const grandChildCategories = allCategories.filter(cat => cat.level === 3 && cat.left && cat.right && childCategory.left && childCategory.right && cat.left > childCategory.left && cat.right < childCategory.right);

                                                            return (
                                                                <div key={childCategory.id} className="mb-2">
                                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">
                                                                        <ChevronRight className="w-3 h-3 text-gray-400" />
                                                                        <span className="text-sm text-gray-600">{childCategory.name}</span>
                                                                    </div>
                                                                    {grandChildCategories.length > 0 && (
                                                                        <div className="pl-4 border-l-2 border-gray-100">
                                                                            {grandChildCategories.map((grandChild) => (
                                                                                <div key={grandChild.id} className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer">
                                                                                    <span className="text-xs text-gray-500">{grandChild.name}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            );
                                        })}
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        {productsLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="w-12 h-12 text-[#1e3a8a] animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-2 mb-6">
                                {products.map((product) => {
                                    const badges = generateBadges(product);
                                    const rating = generateRating();
                                    // Placeholder with "No Photo" text
                                    const placeholderImage = 'https://placehold.co/400x400/f3f4f6/9ca3af?text=Нет+фото';
                                    // Use first image from product.images array, or placeholder if no images
                                    const productImage = (product.images && product.images.length > 0)
                                        ? product.images[0]
                                        : placeholderImage;

                                    return (
                                        <Link
                                            key={product.article}
                                            href={`/product/${product.article}`}
                                            className="bg-white rounded-sm p-2 md:p-3 hover:shadow-2xl transition-shadow flex flex-col"
                                        >
                                            <div className="flex-1">
                                                {badges.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                                                        {badges.slice(0, 2).map((badge: string, idx: number) => (
                                                            <Badge
                                                                key={idx}
                                                                className={`text-[10px] rounded-sm md:text-xs px-1.5 md:px-2 py-0.5 ${badge.includes('-')
                                                                    ? 'bg-red-500 hover:bg-red-600'
                                                                    : badge === 'Новинка'
                                                                        ? 'bg-green-500 hover:bg-green-600'
                                                                        : 'bg-yellow-500 hover:bg-yellow-600'
                                                                    } text-white`}
                                                            >
                                                                {badge}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-center mb-2 md:mb-4 h-24 md:h-40 bg-gray-50">
                                                    <img
                                                        src={productImage}
                                                        alt={product.name}
                                                        className="max-h-full w-auto object-contain"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = placeholderImage;
                                                        }}
                                                    />
                                                </div>

                                                <h3 className="text-xs md:text-sm block leading-4 font-medium text-gray-900 mb-1 md:mb-2 line-clamp-2 min-h-[32px] md:min-h-[40px]">
                                                    {product.name}
                                                </h3>

                                                <div className="flex items-center gap-1 mb-2 md:mb-3">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star
                                                                key={idx}
                                                                className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 ${idx < Math.floor(rating)
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] md:text-xs text-gray-600 font-medium">
                                                        {rating.toFixed(1)}
                                                    </span>
                                                </div>

                                                <div className="mb-2 md:mb-3">
                                                    <div className="text-base md:text-xl font-bold text-black">
                                                        {product.price1.toLocaleString()} ₸
                                                    </div>
                                                    {product.price2 > product.price1 && (
                                                        <div className="text-[10px] md:text-xs text-gray-400 line-through">
                                                            {product.price2.toLocaleString()} ₸
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <Button className="cursor-pointer w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-md py-1.5 md:py-2 text-xs md:text-sm font-bold mt-auto flex items-center justify-center gap-1.5">
                                                В корзину
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {products.length < allProducts.length && (
                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    onClick={handleShowMore}
                                    className="cursor-pointer px-4 py-3 text-base font-semibold text-black hover:bg-blue-50 hover:text-black rounded-xl transition-all flex items-center gap-2"
                                >
                                    Показать еще
                                    <ChevronDown className="w-5 h-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
