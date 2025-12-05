import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import {
    UserIcon,
    Location01Icon,
    Store01Icon,
    Search01Icon,
    Menu01Icon,
    ArrowDown01Icon,
    Clock01Icon,
    DeliveryTruck01Icon,
    Award01Icon,
    HelpCircleIcon,
    GiftIcon,
    ArrowRight01Icon,
    LaptopIcon,
    HardDriveIcon,
    ComputerIcon,
    BatteryFullIcon,
    KeyboardIcon,
    FanIcon,
    CpuIcon,
    SdCardIcon,
    Wifi01Icon,
    Cancel01Icon,
    ArrowLeft01Icon,
    FavouriteIcon,
    ShoppingBag01Icon,
    SearchVisualIcon,
    Folder01Icon
} from '@hugeicons/core-free-icons'

interface HeaderProps {
    className?: string;
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

interface ApiCategory {
    id: string;
    name: string;
    parent_id: string | null;
    level?: number;
    children?: ApiCategory[];
}

export function Header({ className, auth }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Алматы');
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileSelectedCategory, setMobileSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                const scrollY = window.scrollY;
                
                // Простая логика: показываем если вверху, скрываем если прокрутили вниз
                if (scrollY < 50) {
                    setIsScrolled(false);
                } else if (scrollY > 200) {
                    setIsScrolled(true);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            try {
                const response = await axios.get('/api/proxy/categories');
                
                // Handle both formats: direct array or {status, data} object
                let flatCategories: ApiCategory[] = [];
                
                if (Array.isArray(response.data)) {
                    flatCategories = response.data;
                } else if (response.data?.status && response.data?.data) {
                    flatCategories = response.data.data;
                } else {
                    console.log('Unexpected response format or rate limited');
                    return;
                }
                
                // Build full tree recursively
                const buildTree = (parentId: string | null, level: number): ApiCategory[] => {
                    return flatCategories
                        .filter(cat => {
                            if (level === 1) {
                                return cat.level === 1;
                            }
                            return cat.parent_id === parentId;
                        })
                        .map(cat => ({
                            ...cat,
                            children: buildTree(cat.id, (cat.level || 1) + 1)
                        }));
                };
                
                const rootCategories = buildTree(null, 1);
                console.log('Root categories with children:', rootCategories.length, rootCategories);
                setCategories(rootCategories);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <header className={cn('w-full bg-white border-b border-gray-200 md:sticky md:top-0 z-50', className)}>
            {/* Top Bar - Hidden on mobile */}
            <div 
                className={cn(
                    "border-b border-gray-100 transition-all duration-500 ease-in-out hidden md:block",
                    isScrolled ? "h-0 opacity-0 pointer-events-none" : "py-2 opacity-100"
                )}
            >
                <div className="mx-auto flex h-10 max-w-[1400px] items-center justify-between px-6">
                    {/* Left Section */}
                    <div className="flex items-center space-x-6 text-sm">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="group flex items-center space-x-1.5 font-medium text-gray-600 transition-all hover:text-[#1e3a8a]">
                                    <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 transition-transform group-hover:scale-110" />
                                    <span>{selectedCity}</span>
                                    <HugeiconsIcon icon={ArrowDown01Icon} className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                {['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз'].map((city) => (
                                    <DropdownMenuItem 
                                        key={city}
                                        onClick={() => setSelectedCity(city)}
                                        className={cn(
                                            "cursor-pointer",
                                            selectedCity === city && "bg-blue-50 text-[#1e3a8a] font-semibold"
                                        )}
                                    >
                                        {city}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href="/delivery"
                            className="group flex items-center space-x-1.5 font-medium text-gray-600 transition-all hover:text-[#1e3a8a]"
                        >
                            <HugeiconsIcon icon={DeliveryTruck01Icon} className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span>Доставка</span>
                        </Link>
                        <Link
                            href="/warranty"
                            className="group flex items-center space-x-1.5 font-medium text-gray-600 transition-all hover:text-[#1e3a8a]"
                        >
                            <HugeiconsIcon icon={Award01Icon} className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span>Гарантия</span>
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="#"
                            className="group flex items-center space-x-1.5 text-sm font-medium text-gray-600 transition-all hover:text-[#1e3a8a]"
                        >
                            <HugeiconsIcon icon={GiftIcon} className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span>Акции</span>
                        </Link>
                        <Link
                            href="#"
                            className="group flex items-center space-x-1.5 text-sm font-medium text-gray-600 transition-all hover:text-[#1e3a8a]"
                        >
                            <HugeiconsIcon icon={HelpCircleIcon} className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span>Помощь</span>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center px-3 py-1.5 text-sm font-semibold text-gray-600 bg-white transition-all hover:bg-gray-50 hover:text-[#1e3a8a] rounded-lg border border-gray-200">
                                    Рус
                                    <HugeiconsIcon icon={ArrowDown01Icon} className="ml-1 h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Рус</DropdownMenuItem>
                                <DropdownMenuItem>Каз</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div 
                className={cn(
                    "mx-auto max-w-[1400px] px-4 md:px-6 transition-all duration-500 ease-in-out",
                    isScrolled ? "py-2" : "py-3 md:py-5"
                )}
            >
                <div className="flex items-center justify-between gap-2 md:gap-6">
                    {/* Mobile Menu Button */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden h-10 w-10"
                            >
                                <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5 text-[#1e3a8a]" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] p-0">
                            <div className="flex flex-col h-full">
                                <SheetHeader className="border-b border-gray-200 p-4">
                                    <SheetTitle className="text-left text-[#1e3a8a] font-bold">
                                        {mobileSelectedCategory ? 'Категории' : 'Меню'}
                                    </SheetTitle>
                                </SheetHeader>
                                
                                <div className="flex-1 overflow-y-auto">
                                    {!mobileSelectedCategory ? (
                                        <div className="p-4 space-y-4">
                                            {/* User Section */}
                                            <div className="pb-4 border-b border-gray-200">
                                                <Link 
                                                    href={auth?.user ? "/profile" : "/auth"}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    {auth?.user ? (
                                                        <>
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                                                {auth.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">{auth.user.name}</div>
                                                                <div className="text-xs text-gray-500">Мой профиль</div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1e3a8a" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">Войти</div>
                                                                <div className="text-xs text-gray-500">В личный кабинет</div>
                                                            </div>
                                                        </>
                                                    )}
                                                </Link>
                                            </div>

                                            {/* Catalog Button */}
                                            <button
                                                onClick={() => setMobileSelectedCategory('catalog')}
                                                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <HugeiconsIcon icon={Menu01Icon} className="w-5 h-5" />
                                                    <span className="font-semibold">Каталог товаров</span>
                                                </div>
                                                <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
                                            </button>

                                            {/* Quick Links */}
                                            <div className="space-y-1">
                                                <Link
                                                    href={auth?.user ? "/profile/favorites" : "/auth"}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={FavouriteIcon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Избранное</span>
                                                </Link>
                                                <Link
                                                    href="/cart"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={ShoppingBag01Icon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Корзина</span>
                                                    <span className="ml-auto bg-[#1e3a8a] text-white text-xs font-bold px-2 py-0.5 rounded-full">0</span>
                                                </Link>
                                            </div>

                                            {/* Info Links */}
                                            <div className="pt-4 border-t border-gray-200 space-y-1">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                                                            <div className="flex items-center gap-3">
                                                                <HugeiconsIcon icon={Location01Icon} className="w-5 h-5 text-gray-600" />
                                                                <span className="text-gray-700">{selectedCity}</span>
                                                            </div>
                                                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-gray-400" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" className="w-48">
                                                        {['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Тараз'].map((city) => (
                                                            <DropdownMenuItem 
                                                                key={city}
                                                                onClick={() => setSelectedCity(city)}
                                                                className={cn(
                                                                    "cursor-pointer",
                                                                    selectedCity === city && "bg-blue-50 text-[#1e3a8a] font-semibold"
                                                                )}
                                                            >
                                                                {city}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <Link
                                                    href="/delivery"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={DeliveryTruck01Icon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Доставка</span>
                                                </Link>
                                                <Link
                                                    href="/warranty"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={Award01Icon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Гарантия</span>
                                                </Link>
                                                <Link
                                                    href="#"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={GiftIcon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Акции</span>
                                                </Link>
                                                <Link
                                                    href="#"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <HugeiconsIcon icon={HelpCircleIcon} className="w-5 h-5 text-gray-600" />
                                                    <span className="text-gray-700">Помощь</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {/* Back Button */}
                                            <button
                                                onClick={() => setMobileSelectedCategory(null)}
                                                className="w-full flex items-center gap-2 p-4 border-b border-gray-200 hover:bg-gray-50"
                                            >
                                                <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5 text-gray-600" />
                                                <span className="font-semibold text-gray-700">Назад</span>
                                            </button>
                                            
                                            {/* Categories List */}
                                            <div className="p-4 space-y-1 max-h-[60vh] overflow-y-auto">
                                                {categoriesLoading ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1e3a8a]"></div>
                                                    </div>
                                                ) : (
                                                    categories.map((category) => (
                                                        <Link
                                                            key={category.id}
                                                            href={`/products?category=${category.id}`}
                                                            onClick={() => {
                                                                setIsMobileMenuOpen(false);
                                                                setMobileSelectedCategory(null);
                                                            }}
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                                                        >
                                                            <HugeiconsIcon icon={Folder01Icon} className="w-5 h-5 text-gray-600" />
                                                            <span className="text-gray-700">{category.name}</span>
                                                            {category.children && category.children.length > 0 && (
                                                                <span className="ml-auto text-xs text-gray-400">
                                                                    {category.children.length}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    {/* Logo */}
                    <Link href="/" className="group flex-shrink-0">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <span className={cn(
                                    "relative font-bold text-[#1e3a8a] transition-all duration-500 ease-in-out inline-block uppercase",
                                    isScrolled ? "text-sm md:text-base" : "text-base md:text-xl"
                                )}>
                                    Techno expert
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Catalog Button & Search - Desktop */}
                    <div className="hidden md:flex flex-1 items-center gap-3">
                        <div className="relative">
                            <Button
                                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                                className={cn(
                                    "w-[8rem] text-white transition-all duration-300 font-semibold whitespace-nowrap rounded-sm",
                                    isScrolled ? "h-10" : "h-11",
                                    isCatalogOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-700 hover:bg-blue-800"
                                )}
                                size="lg"
                                aria-label={`${isCatalogOpen ? "Закрыть" : "Открыть"} каталог`}
                            >
                                <HugeiconsIcon 
                                    icon={isCatalogOpen ? Cancel01Icon : Menu01Icon} 
                                    className={cn("mr-2 transition-all duration-300", isScrolled ? "h-4 w-4" : "h-5 w-5")} 
                                />
                                <span className='font-bold'>{isCatalogOpen ? "Закрыть" : "Каталог"}</span>
                            </Button>
                        </div>
                        <div className="relative flex-1 group">
                            <Input
                                type="search"
                                placeholder="Поиск товаров, брендов, категорий..."
                                className={cn(
                                    "w-full !bg-white !shadow-none rounded-sm border-1 border-gray-200 bg-gray-50/50 pr-12 text-sm font-medium transition-all duration-500 ease-in-out focus:border-[#1e3a8a] focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]/20 placeholder:text-gray-400",
                                    isScrolled ? "h-10" : "h-12"
                                )}
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 size-8 -translate-y-1/2 rounded-lg text-gray-400 hover:bg-[#1e3a8a] hover:text-white transition-all"
                            >
                                <HugeiconsIcon icon={SearchVisualIcon} className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>



                    {/* Right Icons - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href={auth?.user ? "/profile" : "/auth"}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "group relative flex flex-col items-center justify-center rounded-xl transition-all duration-500 ease-in-out hover:bg-transparent",
                                    isScrolled ? "h-10 min-w-[70px]" : "h-16 min-w-[90px]"
                                )}
                            >
                                {auth?.user ? (
                                    <>
                                        <div className={cn(
                                            "rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold transition-all duration-500 ease-in-out aspect-square",
                                            isScrolled ? "w-5 text-[10px]" : "w-7 text-sm"
                                        )}>
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className={cn(
                                            "font-semibold text-gray-700 transition-all duration-500 ease-in-out group-hover:text-[#1e3a8a]",
                                            isScrolled ? "text-[10px] mt-0.5" : "text-xs"
                                        )}>
                                            {auth.user.name.split(' ')[0]}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <HugeiconsIcon icon={UserIcon} className={cn("transition-all duration-500 ease-in-out", isScrolled ? "size-5" : "size-6")} />
                                        <span className={cn(
                                            "font-semibold text-gray-700 transition-all duration-500 ease-in-out group-hover:text-[#1e3a8a]",
                                            isScrolled ? "text-[10px] mt-0.5" : "text-xs"
                                        )}>
                                            Войти
                                        </span>
                                    </>
                                )}
                            </Button>
                        </Link>
                        
                        <Link href={auth?.user ? "/profile/favorites" : "/auth"}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "group relative flex flex-col items-center justify-center rounded-xl transition-all duration-500 ease-in-out hover:bg-transparent",
                                    isScrolled ? "h-10 min-w-[70px]" : "h-16 min-w-[90px]"
                                )}
                            >
                                <HugeiconsIcon icon={FavouriteIcon} className={cn("transition-all duration-500 ease-in-out", isScrolled ? "size-5" : "size-7")} />

                                <span className={cn(
                                    "font-semibold text-gray-700 transition-all duration-500 ease-in-out group-hover:text-[#1e3a8a]",
                                    isScrolled ? "text-[10px] mt-0.5" : "text-xs"
                                )}>
                                    Избранное
                                </span>
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "group relative flex flex-col items-center justify-center rounded-xl transition-all duration-500 ease-in-out hover:bg-transparent",
                                    isScrolled ? "h-10 min-w-[70px]" : "h-16 min-w-[90px]"
                                )}
                            >
                                <div className={cn("relative transition-all duration-500 ease-in-out", isScrolled ? "mb-0.5" : "mb-1.5")}>
                                    <HugeiconsIcon icon={ShoppingBag01Icon} className={cn("transition-all duration-500 ease-in-out", isScrolled ? "size-5" : "size-6")} />

                                    <span className={cn(
                                        "absolute top-3 -right-3 flex items-center justify-center rounded-full bg-sky-400 font-bold text-white ring-2 ring-white transition-all duration-500 ease-in-out",
                                        isScrolled ? "h-3.5 w-3.5 text-[9px]" : "h-4 w-4 text-[10px]"
                                    )}>
                                        0
                                    </span>
                                </div>
                                <span className={cn(
                                    "font-semibold text-gray-700 transition-all duration-500 ease-in-out group-hover:text-[#1e3a8a]",
                                    isScrolled ? "text-[10px]" : "text-xs"
                                )}>
                                    Корзина
                                </span>
                            </Button>
                        </Link>
                    </div>

                    {/* Right Icons - Mobile */}
                    <div className="flex md:hidden items-center gap-1">
                        <Link href={auth?.user ? "/profile/favorites" : "/auth"}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 relative"
                            >
                                <HugeiconsIcon icon={FavouriteIcon} className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 relative"
                            >
                                <HugeiconsIcon icon={ShoppingBag01Icon} className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-[#1e3a8a] font-bold text-white ring-2 ring-white h-4 w-4 text-[9px]">
                                    0
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Catalog Mega Menu - Desktop Only */}
            {isCatalogOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/5 z-40"
                        onClick={() => setIsCatalogOpen(false)}
                    />
                    <div className="hidden md:block absolute left-0 right-0 top-full bg-white border-b border-gray-200 z-50">
                        <div className="mx-auto max-w-[1400px] px-6 py-4">
                            {categoriesLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a8a]"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-[260px_1fr] gap-4">
                                    {/* Left Categories */}
                                    <div className="space-y-0.5 border-r border-gray-100 pr-4 max-h-[400px] overflow-y-auto">
                                        {categories.map((category) => {
                                            return (
                                                <button
                                                    key={category.id}
                                                    onMouseEnter={() => setSelectedCategory(category.id)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors text-left group",
                                                        selectedCategory === category.id 
                                                            ? "bg-gray-100" 
                                                            : "hover:bg-gray-50"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <HugeiconsIcon icon={Folder01Icon} className="w-4 h-4 text-gray-500" />
                                                        <span className="text-sm text-gray-700">
                                                            {category.name}
                                                        </span>
                                                    </div>
                                                    {category.children && category.children.length > 0 && (
                                                        <HugeiconsIcon icon={ArrowRight01Icon} className="w-3.5 h-3.5 text-gray-400" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Right Subcategories */}
                                    <div className="pl-2 max-h-[400px] overflow-y-auto">
                                        {selectedCategory && (
                                            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                                                {categories
                                                    .find(cat => cat.id === selectedCategory)
                                                    ?.children?.map((subcat) => (
                                                        <div key={subcat.id}>
                                                            <Link
                                                                href={`/products?category=${subcat.id}`}
                                                                className="font-semibold text-gray-900 mb-2 text-sm hover:text-[#1e3a8a] transition-colors block"
                                                                onClick={() => setIsCatalogOpen(false)}
                                                            >
                                                                {subcat.name}
                                                            </Link>
                                                            {subcat.children && subcat.children.length > 0 && (
                                                                <ul className="space-y-1.5 mt-2">
                                                                    {subcat.children.slice(0, 5).map((item) => (
                                                                        <li key={item.id}>
                                                                            <Link
                                                                                href={`/products?category=${item.id}`}
                                                                                className="text-sm text-gray-600 hover:text-[#1e3a8a] transition-colors block"
                                                                                onClick={() => setIsCatalogOpen(false)}
                                                                            >
                                                                                {item.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                    {subcat.children.length > 5 && (
                                                                        <li>
                                                                            <Link
                                                                                href={`/products?category=${subcat.id}`}
                                                                                className="text-sm text-[#1e3a8a] hover:underline transition-colors block"
                                                                                onClick={() => setIsCatalogOpen(false)}
                                                                            >
                                                                                Ещё {subcat.children.length - 5}...
                                                                            </Link>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                        {!selectedCategory && (
                                            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                                <p>Наведите на категорию</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
