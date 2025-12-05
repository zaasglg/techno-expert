import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
    SentIcon,
    Facebook01Icon,
    InstagramIcon,
    YoutubeIcon,
    TwitterIcon,
    BubbleChatIcon
} from '@hugeicons/core-free-icons';

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto max-w-[1400px] px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Будьте в курсе новостей
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Подпишитесь на последние обновления и узнавайте о новинках и специальных предложениях первыми
                        </p>
                        <div className="space-y-3">
                            <Input 
                                type="email" 
                                placeholder="Email" 
                                className="w-full"
                            />
                            <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                                Подписаться
                            </Button>
                        </div>
                        
                        {/* Social Media */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                Мы в соцсетях
                            </h4>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={SentIcon} className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={BubbleChatIcon} className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={YoutubeIcon} className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={Facebook01Icon} className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-[#1e3a8a] transition-colors">
                                    <HugeiconsIcon icon={TwitterIcon} className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Catalog Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Каталог
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">SSD накопители</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Оперативная память</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Матрицы и дисплеи</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Батареи для ноутбуков</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Клавиатуры</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Системы охлаждения</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Зарядные устройства</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Жесткие диски</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Компания
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">О компании</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Контакты</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Новости</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Акции и скидки</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Вакансии</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Партнерам</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Оптовым покупателям</a></li>
                        </ul>
                    </div>

                    {/* Customer Help */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Помощь покупателю
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Как сделать заказ</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Доставка и оплата</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Возврат и обмен</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Гарантия</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Подбор запчастей</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Совместимость</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Инструкции по установке</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">Часто задаваемые вопросы</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © Techno-Expert 2024 - 2025. Все права защищены.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <span className="text-sm text-gray-600">Мы принимаем:</span>
                            <div className="flex gap-2">
                                <div className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-[#1e3a8a]">
                                    VISA
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-[#1e3a8a]">
                                    MasterCard
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-[#1e3a8a]">
                                    Kaspi
                                </div>
                            </div>
                            <a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">
                                Политика конфиденциальности
                            </a>
                            <a href="#" className="text-sm text-gray-600 hover:text-[#1e3a8a]">
                                Пользовательское соглашение
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
