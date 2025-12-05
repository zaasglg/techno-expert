import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function AboutSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="py-12">
            <div className="mx-auto max-w-[1400px] px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Интернет магазин запчастей для ноутбуков Techno-Expert
                </h2>

                <div className="bg-white rounded-2xl p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Интернет-магазин <span className="text-[#1e3a8a] font-semibold">Techno-Expert</span> – ваш надежный партнер 
                                в мире комплектующих и запчастей для ноутбуков. Мы специализируемся на продаже качественных 
                                компонентов для ремонта и модернизации портативных компьютеров всех популярных брендов: 
                                HP, Dell, Lenovo, Asus, Acer, MSI и других.
                            </p>
                            
                            {isExpanded && (
                                <div className="spacwe-y-4 animate-in fade-in duration-300">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        В нашем каталоге представлен широкий ассортимент запчастей: SSD и HDD накопители, 
                                        оперативная память DDR4 и DDR5, матрицы и дисплеи различных диагоналей, 
                                        аккумуляторные батареи, клавиатуры с подсветкой и без, системы охлаждения, 
                                        зарядные устройства и многое другое.
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Мы работаем только с проверенными поставщиками и гарантируем подлинность всех комплектующих. 
                                        Каждая запчасть проходит тщательный контроль качества перед отправкой покупателю.
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Наши специалисты имеют многолетний опыт работы с ноутбуками и всегда готовы помочь 
                                        с подбором нужной детали, проконсультировать по совместимости и особенностям установки.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Главная цель <span className="text-[#1e3a8a] font-semibold">Techno-Expert</span> – сделать ремонт 
                                и модернизацию ноутбуков доступными для каждого. Мы предлагаем конкурентные цены, 
                                быструю доставку по всему Казахстану и профессиональную техническую поддержку. 
                                Покупая у нас, вы экономите время и деньги, получая качественные запчасти с гарантией.
                            </p>
                            
                            {isExpanded && (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Удобная система поиска на сайте позволяет быстро найти нужную деталь по модели ноутбука 
                                        или артикулу. Подробные описания товаров с техническими характеристиками и фотографиями 
                                        помогут сделать правильный выбор.
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Мы предлагаем различные способы оплаты и доставки. Работаем с курьерскими службами 
                                        для быстрой доставки в любой город Казахстана. Также доступен самовывоз из нашего офиса.
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        На все запчасти предоставляется гарантия. В случае возникновения проблем, 
                                        наша служба поддержки оперативно решит любой вопрос. Ваше удовлетворение – наш приоритет!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expand Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-[#1e3a8a] hover:text-[#1e40af] font-medium text-sm transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    СВЕРНУТЬ
                                    <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    ПОДРОБНЕЕ
                                    <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
