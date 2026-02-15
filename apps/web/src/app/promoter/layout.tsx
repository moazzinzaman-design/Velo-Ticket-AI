'use client';

import PromoterLayout from '../../components/promoter/PromoterLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PromoterLayout>
            {children}
        </PromoterLayout>
    );
}
