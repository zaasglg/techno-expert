import { Head } from '@inertiajs/react';
import { MainLayout } from '@/layouts/main-layout';
import { PromoBanner } from '@/components/promo-banner';
import { BrandCards } from '@/components/brand-cards';
import { PromoSection } from '@/components/promo-section';
import { CategoriesSection } from '@/components/categories-section';
import { AboutSection } from '@/components/about-section';

interface WelcomeProps {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Welcome({ auth }: WelcomeProps) {
    return (
        <MainLayout auth={auth} currentPath="/" cartCount={0}>
            <Head title="Techno-Expert">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <PromoBanner />
            <BrandCards />
            <PromoSection />
            <CategoriesSection />
            <AboutSection />
        </MainLayout>
    );
}
