import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { Heart, Share2, Star, Check, Truck, Shield, RotateCcw, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ProductProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
    article: string;
}

interface ProductData {
    article: number;
    name: string;
    full_name: string;
    category: number;
    price1: number;
    price2: number;
    quantity: string | number;
    isnew: number;
    article_pn: string;
    priceMarkdown?: number;
    quantityMarkdown?: number;
    description?: string;
    brand?: string;
    warranty?: string;
    images?: string[];
    barcode?: string;
    expectedArrivalDate?: string;
    detailText?: string;
    properties?: any[];
}

interface QuantityPriceData {
    quantity: string | number;
    price1: number;
    price2: number;
    discountPrice?: number;
    discount?: number;
    warehouse?: string;
}

export default function Product({ auth, article }: ProductProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            // Пропускаем если уже загружали данные для этого артикула
            if (hasFetchedRef.current) {
                console.log('Skipping duplicate fetch');
                return;
            }

            // Сразу устанавливаем флаг ДО запроса, чтобы второй вызов не начался
            hasFetchedRef.current = true;

            setLoading(true);
            setError(null);

            try {
                // Fetch product info (содержит все необходимые данные)
                const infoResponse = await axios.get(`/api/proxy/element-info?article=${article}`);
                console.log('Product info response:', infoResponse.data);

                // Проверяем на rate limiting
                if (infoResponse.data && infoResponse.data.success === false) {
                    console.log('Rate limit hit, ignoring');
                    // Если это rate limit - просто игнорируем, не показываем ошибку
                    return;
                }

                // Проверяем только первый успешный ответ
                if (infoResponse.data && Array.isArray(infoResponse.data) && infoResponse.data.length > 0) {
                    setProduct(infoResponse.data[0]);

                    // Загружаем характеристики в фоне через 6 секунд
                    setTimeout(async () => {
                        try {
                            const propsResponse = await axios.get(`/api/proxy/properties?article=${article}`);
                            console.log('Properties response:', propsResponse.data);

                            if (propsResponse.data && propsResponse.data.elements && propsResponse.data.elements.length > 0) {
                                setProperties(propsResponse.data.elements[0].properties || []);
                            }
                        } catch (err) {
                            console.error('Error fetching properties:', err);
                        }
                    }, 6000);

                } else if (infoResponse.data && !Array.isArray(infoResponse.data) && infoResponse.data.article) {
                    setProduct(infoResponse.data);
                } else {
                    console.error('Product not found, response:', infoResponse.data);
                    setError('Товар не найден');
                }

            } catch (err) {
                console.error('Error fetching product data:', err);
                setError('Ошибка при загрузке данных товара');
            } finally {
                setLoading(false);
            }
        };

        if (article) {
            fetchData();
        }

        // Сбрасываем флаг при смене артикула
        return () => {
            hasFetchedRef.current = false;
        };
    }, [article]);

    if (loading) {
        return (
            <MainLayout auth={auth} currentPath="/product" cartCount={0} className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
            </MainLayout>
        );
    }

    if (error || !product) {
        return (
            <MainLayout auth={auth} currentPath="/product" cartCount={0} className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Ошибка</h1>
                    <p className="text-gray-600">{error || 'Товар не найден'}</p>
                    <Link href="/" className="mt-4 inline-block text-[#1e3a8a] hover:underline">
                        Вернуться на главную
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const currentPrice = product.price2;
    const oldPrice = product.priceMarkdown && product.priceMarkdown > 0 ? product.price2 + product.priceMarkdown : null;
    const discount = 0; // Можно вычислить из priceMarkdown если нужно
    const images = product.images || [];
    const inStock = product.quantity !== 0 && product.quantity !== '0';

    // description handling: detect if product description contains HTML
    const rawDescription = (product.description || product.detailText || '').toString();
    const descriptionHasHtml = /<[^>]+>/.test(rawDescription);

    return (
        <MainLayout auth={auth} currentPath="/product" cartCount={0} className="min-h-screen">
            <Head title={product.name} />

            <main className="min-h-screen">
                {/* Breadcrumbs */}
                <div className="border-b border-gray-200">
                    <div className="mx-auto max-w-[1400px] px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-gray-900">Главная</Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link href="#" className="hover:text-gray-900">Каталог</Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-gray-900">{product.name}</span>
                        </div>
                    </div>
                </div>

                {/* Product Section */}
                <div className="mx-auto max-w-[1400px] px-6 py-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500">Артикул: {product.article_pn || product.article}</span>
                            {inStock ? (
                                <span className="flex items-center text-sm text-green-600">
                                    <Check className="h-4 w-4 mr-1" />
                                    В наличии ({product.quantity})
                                </span>
                            ) : (
                                <span className="text-sm text-red-600">Нет в наличии</span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {product.full_name || product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <Star className="h-5 w-5 fill-gray-200 text-gray-200" />
                                <span className="ml-1 text-lg font-semibold text-black">0.0</span>
                            </div>
                            <span className="text-gray-500">
                                0 отзывов
                            </span>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-6 items-start gap-5">
                        <div className='col-span-2 grid col-span-4 gap-5'>
                            {/* Images */}
                            <div className="space-y-4">
                                <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                    {images.length > 0 ? (
                                        <img
                                            src={images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Нет изображения
                                        </div>
                                    )}
                                    {discount > 0 && (
                                        <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                                            -{discount}%
                                        </span>
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`w-16 h-16 bg-gray-50 rounded-sm overflow-hidden border transition-all flex-shrink-0 ${selectedImage === index
                                                    ? 'border-[#1e3a8a]'
                                                    : 'border-gray-200 hover:border-[#1e3a8a]/50'
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Characteristics */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col">
                                    <h3 className="text-xl font-bold mb-4 text-black">Характеристики</h3>
                                    {properties.length > 0 ? (
                                        <div className="space-y-3 overflow-y-auto pr-2 overflow-x-hidden" style={{ maxHeight: '560px' }}>
                                            {properties.map((prop, index) => (
                                                <div key={index} className="flex items-end text-sm min-w-0">
                                                    <div className="text-gray-600 font-medium flex-shrink-0 truncate">{prop.name}</div>
                                                    <div className="flex-1 mx-3 min-w-0" aria-hidden style={{ height: '0.5px', backgroundImage: 'repeating-linear-gradient(to right, #8fafefff 0 1px, transparent 3px 6px)' }} />
                                                    <div className="text-blue-600 font-medium truncate text-right max-w-[160px]">{
                                                        // render value as text (may contain HTML)
                                                        typeof prop.value === 'string' ? (
                                                            <span dangerouslySetInnerHTML={{ __html: prop.value }} />
                                                        ) : (
                                                            String(prop.value)
                                                        )
                                                    }</div>
                                                </div>
                                            ))}

                                            <div className="text-center mt-4">
                                                <a href="#" className="text-blue-600 font-medium">Все характеристики</a>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">Характеристики загружаются...</p>
                                    )}
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="bg-white rounded-sm col-span-2">
                                <div className="border-b border-gray-200 px-5 pt-5">
                                    <div className="flex gap-8">
                                        <button
                                            onClick={() => setActiveTab('description')}
                                            className={`pb-4 border-b-2 font-semibold transition-colors ${activeTab === 'description'
                                                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                                                : 'border-transparent text-gray-600 hover:text-[#1e3a8a]'
                                                }`}
                                        >
                                            Описание
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('specs')}
                                            className={`pb-4 border-b-2 font-semibold transition-colors ${activeTab === 'specs'
                                                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                                                : 'border-transparent text-gray-600 hover:text-[#1e3a8a]'
                                                }`}
                                        >
                                            Характеристики
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('reviews')}
                                            className={`pb-4 border-b-2 font-semibold transition-colors ${activeTab === 'reviews'
                                                ? 'border-[#1e3a8a] text-[#1e3a8a]'
                                                : 'border-transparent text-gray-600 hover:text-[#1e3a8a]'
                                                }`}
                                        >
                                            Отзывы (0)
                                        </button>
                                    </div>
                                </div>

                                <div className="py-8 px-5">
                                    {/* Description Tab */}
                                    {activeTab === 'description' && (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                            <div>
                                                <h3 className="text-xl font-bold mb-4 text-black">О товаре</h3>
                                                {rawDescription ? (
                                                    descriptionHasHtml ? (
                                                        <div className="text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: rawDescription }} />
                                                    ) : (
                                                        <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{rawDescription}</p>
                                                    )
                                                ) : (
                                                    <p className="text-gray-600 leading-relaxed mb-6">Описание отсутствует</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Specifications Tab */}
                                    {activeTab === 'specs' && (
                                        <div className="max-w-4xl">
                                            <h3 className="text-2xl font-bold mb-6 text-black">Технические характеристики</h3>
                                            <div className="space-y-3">
                                                {properties.length > 0 ? (
                                                    properties.map((prop, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between py-4 border-b border-gray-100"
                                                        >
                                                            <span className="text-gray-600 font-medium">{prop.name}</span>
                                                            <span className="font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: prop.value }} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500">Характеристики загружаются...</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Reviews Tab */}
                                    {activeTab === 'reviews' && (
                                        <div className="max-w-4xl">
                                            <p className="text-gray-500">Отзывов пока нет</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className={`col-span-2 space-y-6 sticky top-20 self-start`}>
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {currentPrice?.toLocaleString()} ₸
                                    </span>
                                    {oldPrice && (
                                        <span className="text-xl text-gray-400 line-through">
                                            {oldPrice.toLocaleString()} ₸
                                        </span>
                                    )}
                                </div>

                                {/* Product Properties - Top 3 */}
                                {properties.length > 0 && (
                                    <div className="space-y-2 border-t border-gray-200 pt-4">
                                        {properties.slice(0, 3).map((prop, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{prop.name}:</span>
                                                <span className="font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: prop.value }} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Payment Options */}
                                <div className="space-y-2 border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">В рассрочку</span>
                                        <span className="font-semibold text-gray-900">
                                            {Math.round(currentPrice / 24).toLocaleString()} ₸ × 24 мес
                                        </span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-3 pt-2">
                                    <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-2 px-4 text-sm font-medium rounded-md">
                                        Купить сейчас
                                    </Button>
                                    <Button className="w-full bg-transparent border border-[#1e3a8a] hover:bg-[#1e3a8a]/5 text-[#1e3a8a] py-2 px-4 text-sm font-medium rounded-md">
                                        В корзину
                                    </Button>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-2 pt-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Truck className="h-4 w-4 text-gray-600" />
                                        <span>Доставка: уточняйте у менеджера</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <button className="flex-1 py-2 px-2 rounded-md bg-transparent hover:bg-gray-100 text-sm text-gray-600 flex flex-col items-center justify-center gap-1 border-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>
                                        <span className="text-xs text-gray-600">Сравнить</span>
                                    </button>
                                    <button className="flex-1 py-2 px-2 rounded-md bg-transparent hover:bg-gray-100 text-sm text-gray-600 flex flex-col items-center justify-center gap-1 border-0">
                                        <Heart className="w-5 h-5 text-gray-500" strokeWidth="2" />
                                        <span className="text-xs text-gray-600">В избранное</span>
                                    </button>
                                    <button className="flex-1 py-2 px-2 rounded-md bg-transparent hover:bg-gray-100 text-sm text-gray-600 flex flex-col items-center justify-center gap-1 border-0">
                                        <Share2 className="w-5 h-5 text-gray-500" strokeWidth="2" />
                                        <span className="text-xs text-gray-600">Поделиться</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </main>
        </MainLayout>
    );
}
