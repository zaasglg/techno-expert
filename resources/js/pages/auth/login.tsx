import { Head, Link, useForm } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEventHandler, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Login({ auth }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <MainLayout auth={auth} currentPath="/login" cartCount={0} className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center py-12 px-6">
            <Head title="Вход" />
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Вход</h2>
                            <p className="text-sm text-gray-600">Войдите в свой аккаунт</p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
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
                                    Пароль
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
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
                                {errors.password && (
                                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
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
                                disabled={processing}
                                className="w-full h-11 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg"
                            >
                                {processing ? 'Вход...' : 'Войти'}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Нет аккаунта?{' '}
                            <Link href="/register" className="text-[#1e3a8a] hover:underline font-semibold">
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>

                </div>
        </MainLayout>
    );
}
