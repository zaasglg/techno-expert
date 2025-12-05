import { Head, Link, useForm } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEventHandler, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMask } from '@react-input/mask';

interface RegisterProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Register({ auth }: RegisterProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const phoneMaskRef = useMask({
        mask: '+7 (000) 000-00-00',
        replacement: { 0: /\d/ },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <MainLayout auth={auth} currentPath="/register" cartCount={0} className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center py-12 px-6">
            <Head title="Регистрация" />
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Регистрация</h2>
                            <p className="text-sm text-gray-600">Создайте новый аккаунт</p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Имя
                                </label>
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ваше имя"
                                    className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="example@mail.com"
                                    className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Телефон
                                </label>
                                <Input
                                    ref={phoneMaskRef}
                                    type="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Пароль
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Минимум 8 символов"
                                        className="h-11 pr-10 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Подтвердите пароль
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Повторите пароль"
                                        className="h-11 pr-10 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-red-600 text-xs mt-1">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div className="pt-1">
                                <label className="flex items-start gap-1.5 cursor-pointer text-sm">
                                    <input
                                        type="checkbox"
                                        checked={data.terms}
                                        onChange={(e) => setData('terms', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] mt-0.5"
                                        required
                                    />
                                    <span className="text-gray-600">
                                        Согласен с{' '}
                                        <Link href="#" className="text-[#1e3a8a] hover:underline">
                                            условиями
                                        </Link>
                                    </span>
                                </label>
                                {errors.terms && (
                                    <p className="text-red-600 text-xs mt-1">{errors.terms}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full h-11 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg mt-2"
                            >
                                {processing ? 'Регистрация...' : 'Зарегистрироваться'}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Уже есть аккаунт?{' '}
                            <Link href="/login" className="text-[#1e3a8a] hover:underline font-semibold">
                                Войти
                            </Link>
                        </p>
                    </div>

                </div>
        </MainLayout>
    );
}
