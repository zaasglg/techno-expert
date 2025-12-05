import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function ContentLoader() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleFinish = () => setIsLoading(false);

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#1e3a8a] border-t-transparent rounded-full animate-spin"></div>
                </div>
                {/* Text */}
                <p className="text-sm font-medium text-gray-600">Загрузка...</p>
            </div>
        </div>
    );
}
