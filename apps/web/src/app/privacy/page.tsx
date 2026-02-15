import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-24 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/" className="text-amber-400 hover:underline mb-8 inline-block">← Back to Velo</Link>

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-zinc-400 italic">Last Updated: February 15, 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">1. Data Controller</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Velo Digital Ltd ("Velo", "we", "us") is the data controller for the personal information you provide.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">2. Information We Collect</h2>
                    <ul className="list-disc list-inside text-zinc-300 space-y-2">
                        <li><strong>Identity Data:</strong> Name, email address, profile photo.</li>
                        <li><strong>Transaction Data:</strong> Details of ticket purchases and subscriptions (processed via Stripe).</li>
                        <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">3. How We Use Your Data</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        We use your data to process bookings, manage your Velo+ subscription, send AI-generated ticket confirmations, and improve our services.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">4. Third-Party Processors</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        We share data with trusted sub-processors necessary for platform operations:
                    </p>
                    <ul className="list-disc list-inside text-zinc-300 space-y-2">
                        <li><strong>Stripe:</strong> Payment processing and subscription management.</li>
                        <li><strong>Supabase:</strong> Database and authentication services.</li>
                        <li><strong>OpenAI:</strong> AI-powered message generation.</li>
                        <li><strong>Resend:</strong> Transactional email delivery.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">5. Your Rights (GDPR)</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Under GDPR, you have the right to access, correct, or delete your personal data. You can exercise these rights by contacting us at legal@velotickets.com.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">6. Cookies</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        We use essential cookies for authentication. Non-essential analytics cookies are only enabled if you consent via our cookie banner.
                    </p>
                </section>

                <div className="pt-12 border-t border-zinc-800">
                    <p className="text-zinc-500 text-sm">
                        Contact: legal@velotickets.com | Velo Digital Ltd, London, UK.
                    </p>
                </div>
            </div>
        </div>
    );
}
