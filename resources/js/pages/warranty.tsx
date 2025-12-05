import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Shield, FileText, RotateCcw, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';

interface WarrantyProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Warranty({ auth }: WarrantyProps) {
    return (
        <MainLayout auth={auth} currentPath="/warranty" cartCount={0}>
            <Head title="Гарантия" />

            <main className="bg-white">
                <div className="mx-auto max-w-[1400px] px-6 py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Гарантия</h1>
                    <p className="text-gray-600 mb-12">Мы гарантируем качество всех наших товаров</p>

                    {/* Warranty Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Условия гарантии</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        Что покрывает гарантия
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>Производственные дефекты и неисправности</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>Выход из строя при нормальной эксплуатации</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>Неисправности комплектующих</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>Программные сбои (для электроники)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-red-600" />
                                        Что не покрывает гарантия
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✗</span>
                                            <span>Механические повреждения</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✗</span>
                                            <span>Повреждения от воды или влаги</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✗</span>
                                            <span>Самостоятельный ремонт или вскрытие</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 mt-1">✗</span>
                                            <span>Неправильная эксплуатация</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Как оформить гарантию</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Свяжитесь с нами</h4>
                                            <p className="text-sm text-gray-600">
                                                Позвоните по телефону или напишите в онлайн-чат
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Опишите проблему</h4>
                                            <p className="text-sm text-gray-600">
                                                Расскажите о неисправности и предоставьте чек
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Привезите товар</h4>
                                            <p className="text-sm text-gray-600">
                                                Доставьте товар в сервисный центр или отправьте курьером
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">4</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Получите результат</h4>
                                            <p className="text-sm text-gray-600">
                                                Ремонт или замена в течение 14-30 дней
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Warranty Periods */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Сроки гарантии по категориям</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { category: 'SSD/HDD накопители', period: '3-5 лет' },
                                { category: 'Процессоры', period: '3 года' },
                                { category: 'Видеокарты', period: '2-3 года' },
                                { category: 'Материнские платы', period: '2-3 года' },
                                { category: 'Оперативная память', period: 'Пожизненная' },
                                { category: 'Блоки питания', period: '3-5 лет' },
                                { category: 'Корпуса', period: '1-2 года' },
                                { category: 'Периферия', period: '1-2 года' },
                            ].map((item, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-[#1e3a8a] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.category}</h4>
                                            <p className="text-xs text-gray-600">{item.period}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
