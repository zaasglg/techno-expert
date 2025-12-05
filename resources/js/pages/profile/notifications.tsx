import { Head, Link } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { ContentLoader } from '@/components/content-loader';
import { Bell } from 'lucide-react';

interface NotificationsProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function Notifications({ user }: NotificationsProps) {
    const auth = { user: { name: user.name, email: user.email } };
    return (
        <MainLayout auth={auth} currentPath="/profile/notifications" cartCount={0} className="min-h-screen bg-gray-50 py-8">
            <Head title="Уведомления" />
                <div className="mx-auto max-w-[1400px] px-4">
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#1e3a8a]">Главная</Link>
                        <span>/</span>
                        <Link href="/profile" className="hover:text-[#1e3a8a]">Профиль</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Уведомления</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                        <ProfileSidebar user={user} currentPath="/profile/notifications" />
                        
                        <main className="relative">
                            <ContentLoader />
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Уведомления</h1>
                            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600">У вас пока нет уведомлений</p>
                            </div>
                        </main>
                    </div>
                </div>
        </MainLayout>
    );
}
