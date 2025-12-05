import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/layouts/main-layout';
import { FormEventHandler, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMask } from '@react-input/mask';

interface AuthProps {
    tab?: 'login' | 'register';
}

export default function Auth({ tab = 'login' }: AuthProps) {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>(tab);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const phoneMaskRef = useMask({
        mask: '+7 (000) 000-00-00',
        replacement: { 0: /\d/ },
    });

    const loginForm = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const registerForm = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submitLogin: FormEventHandler = (e) => {
        e.preventDefault();
        loginForm.post('/login');
    };

    const submitRegister: FormEventHandler = (e) => {
        e.preventDefault();
        registerForm.post('/register');
    };

    return (
        <MainLayout currentPath="/auth" cartCount={0} className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center py-12 px-6">
            <Head title={activeTab === 'login' ? 'Вход' : 'Регистрация'} />
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={cn(
                                    'flex-1 py-4 text-sm font-semibold transition-colors relative',
                                    activeTab === 'login'
                                        ? 'text-[#1e3a8a] bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                )}
                            >
                                Вход
                                {activeTab === 'login' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e3a8a]" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={cn(
                                    'flex-1 py-4 text-sm font-semibold transition-colors relative',
                                    activeTab === 'register'
                                        ? 'text-[#1e3a8a] bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                )}
                            >
                                Регистрация
                                {activeTab === 'register' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e3a8a]" />
                                )}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {activeTab === 'login' ? (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Вход</h2>
                                        <p className="text-sm text-gray-600">Войдите в свой аккаунт</p>
                                    </div>

                                    <form onSubmit={submitLogin} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={loginForm.data.email}
                                                onChange={(e) => loginForm.setData('email', e.target.value)}
                                                placeholder="example@mail.com"
                                                className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                                required
                                            />
                                            {loginForm.errors.email && (
                                                <p className="text-red-600 text-xs mt-1">{loginForm.errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Пароль
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={loginForm.data.password}
                                                    onChange={(e) => loginForm.setData('password', e.target.value)}
                                                    placeholder="••••••••"
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
                                            {loginForm.errors.password && (
                                                <p className="text-red-600 text-xs mt-1">{loginForm.errors.password}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={loginForm.data.remember}
                                                    onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                                                />
                                                <span className="text-gray-600">Запомнить</span>
                                            </label>
                                            <Link href="#" className="text-[#1e3a8a] hover:underline">
                                                Забыли пароль?
                                            </Link>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loginForm.processing}
                                            className="w-full h-11 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg"
                                        >
                                            {loginForm.processing ? 'Вход...' : 'Войти'}
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Регистрация</h2>
                                        <p className="text-sm text-gray-600">Создайте новый аккаунт</p>
                                    </div>

                                    <form onSubmit={submitRegister} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Имя
                                            </label>
                                            <Input
                                                type="text"
                                                value={registerForm.data.name}
                                                onChange={(e) => registerForm.setData('name', e.target.value)}
                                                placeholder="Ваше имя"
                                                className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                                required
                                            />
                                            {registerForm.errors.name && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={registerForm.data.email}
                                                onChange={(e) => registerForm.setData('email', e.target.value)}
                                                placeholder="example@mail.com"
                                                className="h-11 border-gray-300 focus:border-[#1e3a8a] rounded-lg"
                                                required
                                            />
                                            {registerForm.errors.email && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.email}</p>
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
                                                onChange={(e) => registerForm.setData('phone', e.target.value)}
                                                required
                                            />
                                            {registerForm.errors.phone && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Пароль
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={registerForm.data.password}
                                                    onChange={(e) => registerForm.setData('password', e.target.value)}
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
                                            {registerForm.errors.password && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.password}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Подтвердите пароль
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                                    value={registerForm.data.password_confirmation}
                                                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
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
                                            {registerForm.errors.password_confirmation && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.password_confirmation}</p>
                                            )}
                                        </div>

                                        <div className="pt-1">
                                            <label className="flex items-start gap-1.5 cursor-pointer text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={registerForm.data.terms}
                                                    onChange={(e) => registerForm.setData('terms', e.target.checked)}
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
                                            {registerForm.errors.terms && (
                                                <p className="text-red-600 text-xs mt-1">{registerForm.errors.terms}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={registerForm.processing}
                                            className="w-full h-11 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg mt-2"
                                        >
                                            {registerForm.processing ? 'Регистрация...' : 'Зарегистрироваться'}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
        </MainLayout>
    );
}
