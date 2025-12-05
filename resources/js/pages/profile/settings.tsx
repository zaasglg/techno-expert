import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { ContentLoader } from '@/components/content-loader';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function Settings({ user }: SettingsProps) {
    const auth = { user: { name: user.name, email: user.email } };
    return (
        <MainLayout auth={auth} currentPath="/profile/settings" cartCount={0} className="min-h-screen bg-gray-50 py-8">
            <Head title="Настройки" />
                <div className="mx-auto max-w-[1400px] px-4">
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#1e3a8a]">Главная</Link>
                        <span>/</span>
                        <Link href="/profile" className="hover:text-[#1e3a8a]">Профиль</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Настройки</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                        <ProfileSidebar user={user} currentPath="/profile/settings" />
                        
                        <main className="relative">
                            <ContentLoader />
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Настройки</h1>
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <SettingsIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600">Настройки аккаунта</p>
                            </div>
                        </main>
                    </div>
                </div>
        </MainLayout>
    );
}
