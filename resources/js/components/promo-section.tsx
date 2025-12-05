import { Link } from '@inertiajs/react';

interface PromoCard {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    bgGradient: string;
    buttonText: string;
}

const promoCards: PromoCard[] = [
    {
        id: 1,
        title: 'Акция на SSD накопители',
        description: 'Скидки до 30% на все SSD диски. Ускорьте свой ноутбук!',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
        link: '#',
        bgGradient: 'from-blue-500 to-blue-600',
        buttonText: 'Смотреть товары'
    },
    {
        id: 2,
        title: 'Батареи с гарантией',
        description: 'Увеличенная емкость. Гарантия 12 месяцев на все модели.',
        image: 'https://images.unsplash.com/photo-1609592806955-e6970f5cd5c4?w=600&q=80',
        link: '#',
        bgGradient: 'from-green-500 to-green-600',
        buttonText: 'Выбрать батарею'
    },
    {
        id: 3,
        title: 'RGB клавиатуры',
        description: 'Широкий выбор клавиатур с подсветкой для всех моделей.',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
        link: '#',
        bgGradient: 'from-purple-500 to-purple-600',
        buttonText: 'Посмотреть'
    }
];

export function PromoSection() {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="mx-auto max-w-[1400px] px-3 md:px-4">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Специальные предложения
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                        Успейте воспользоваться выгодными акциями
                    </p>
                </div>

                {/* Promo Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {promoCards.map((card) => (
                        <Link
                            key={card.id}
                            href={card.link}
                            className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-xl transform hover:scale-101 transition-all duration-300"
                        >
                            <div className="relative h-48 md:h-56 p-6 flex flex-col justify-between">

                                {/* Content */}
                                <div className="relative h-full p-3 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    <button className="mt-5 self-start bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-sm font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 group-hover:gap-3 transform hover:scale-101 hover:shadow-lg">
                                        {card.buttonText}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
