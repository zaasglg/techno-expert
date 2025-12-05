import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BottomNavigation } from '@/components/bottom-navigation';

interface MainLayoutProps {
    children: ReactNode;
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
    currentPath?: string;
    cartCount?: number;
    showFooter?: boolean;
    className?: string;
}

export function MainLayout({ 
    children, 
    auth, 
    currentPath = '/', 
    cartCount = 0,
    showFooter = true,
    className = ''
}: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-[#f0f1f2]">
            <Header auth={auth} />
            <div className={`flex-1 pb-14 md:pb-0 ${className}`}>
                {children}
            </div>
            {showFooter && <Footer />}
            <BottomNavigation currentPath={currentPath} auth={auth} cartCount={cartCount} />
        </div>
    );
}
