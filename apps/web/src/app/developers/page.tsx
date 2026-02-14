import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DeveloperPortal } from '@/components/DeveloperPortal';

export default function DevelopersPage() {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="pt-24 pb-24">
                <DeveloperPortal />
            </div>
            <Footer />
        </div>
    );
}
