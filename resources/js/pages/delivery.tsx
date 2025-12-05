import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Truck, Clock, MapPin, Package, CheckCircle2 } from 'lucide-react';

interface DeliveryProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Delivery({ auth }: DeliveryProps) {
    return (
        <MainLayout auth={auth} currentPath="/delivery" cartCount={0}>
            <Head title="Доставка" />

            <main className="bg-white">
                <div className="mx-auto max-w-[1400px] px-6 py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Доставка</h1>
                    <p className="text-gray-600 mb-12">Быстрая и надежная доставка по всему Казахстану</p>

                    {/* Delivery Options */}
                    

                    {/* Delivery Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Условия доставки</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-[#1e3a8a]" />
                                        Сроки доставки
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        По Алматы доставка осуществляется в течение 1-2 рабочих дней. 
                                        В другие города Казахстана — 3-7 рабочих дней в зависимости от региона.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-[#1e3a8a]" />
                                        Стоимость доставки
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#1e3a8a] mt-1">•</span>
                                            <span>Бесплатная доставка при заказе от 50 000 ₸</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#1e3a8a] mt-1">•</span>
                                            <span>По Алматы: 2 000 ₸</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#1e3a8a] mt-1">•</span>
                                            <span>По Казахстану: от 2 000 ₸ (зависит от региона)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <Package className="h-5 w-5 text-[#1e3a8a]" />
                                        Упаковка
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Все товары тщательно упаковываются в защитную пленку и картонные коробки. 
                                        Хрупкие товары дополнительно защищаются пузырчатой пленкой.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Пункты самовывоза</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        name: 'ТЦ Dostyk Plaza',
                                        address: 'пр. Достык, 111',
                                        hours: 'Пн-Вс: 10:00 - 22:00',
                                    },
                                    {
                                        name: 'ТЦ Mega Center',
                                        address: 'ул. Розыбакиева, 247',
                                        hours: 'Пн-Вс: 10:00 - 22:00',
                                    },
                                    {
                                        name: 'ТРЦ Esentai Mall',
                                        address: 'пр. Аль-Фараби, 77/8',
                                        hours: 'Пн-Вс: 10:00 - 22:00',
                                    },
                                ].map((store, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <h4 className="font-semibold text-gray-900 mb-1">{store.name}</h4>
                                        <p className="text-sm text-gray-600 mb-1">{store.address}</p>
                                        <p className="text-xs text-gray-500">{store.hours}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
