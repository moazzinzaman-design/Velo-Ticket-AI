import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Velo | The Future of Live Event Ticketing',
    description: 'Velo is the cutting-edge AI-powered platform for discovering, booking, and experiencing live events. Secure tickets, smart pricing, and a seamless journey from discovery to door.',
    keywords: ['tickets', 'events', 'concerts', 'AI concierge', 'live events', 'ticket booking'],
    openGraph: {
        title: 'Velo | The Future of Live Event Ticketing',
        description: 'Discover, book, and experience live events like never before.',
        type: 'website',
    },
}

import { QuestProvider } from '../context/QuestContext';
import { BookingProvider } from '../context/BookingContext';
import BookingOrchestrator from '../components/BookingOrchestrator';
import CommandMenu from '../components/CommandMenu';
import OnlineStatus from '../components/OnlineStatus';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WaitlistNotification from '../components/WaitlistNotification';

import VeloAgentPanel from '../components/VeloAgentPanel';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={outfit.variable}>
            <body className={`${outfit.className} antialiased`}>
                <QuestProvider>
                    <BookingProvider>
                        <OnlineStatus />
                        <Navbar />
                        <VeloAgentPanel />
                        <WaitlistNotification />
                        <BookingOrchestrator />
                        <CommandMenu />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </BookingProvider>
                </QuestProvider>
            </body>
        </html>
    )
}
