import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-24 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/" className="text-amber-400 hover:underline mb-8 inline-block">← Back to Velo</Link>

                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-zinc-400 italic">Last Updated: February 15, 2026</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">1. Introduction</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Welcome to Velo Tickets. By using our platform, you agree to these terms. Please read them carefully.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">2. Subscription Terms (Velo+)</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Velo+ is a monthly or annual subscription service. By subscribing, you agree to an initial and recurring subscription fee at the then-current rate.
                    </p>
                    <ul className="list-disc list-inside text-zinc-300 space-y-2">
                        <li><strong>Billing Cycle:</strong> Subscriptions are billed at the start of each period.</li>
                        <li><strong>Auto-Renewal:</strong> Your subscription will automatically renew until cancelled.</li>
                        <li><strong>Cancellation:</strong> You can cancel at any time via your Account Settings. Cancellation takes effect at the end of the current billing cycle.</li>
                        <li><strong>Immediate Start:</strong> By agreeing to the checkout terms, you acknowledge that your subscription starts immediately and you waive your 14-day statutory right to cancel for digital services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">3. Ticket Purchases & Refunds</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Velo acts as a primary ticketing agent. Ticket inventory is managed by promoters.
                    </p>
                    <ul className="list-disc list-inside text-zinc-300 space-y-2">
                        <li><strong>Final Sale:</strong> Unless stated otherwise (e.g., Velo+ 24h refund Benefit), all ticket sales are final.</li>
                        <li><strong>Event Cancellations:</strong> If an event is cancelled, the promoter is liable for refunds. Velo will assist in processing these where possible.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">4. Limitation of Liability</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        Velo is not responsible for the performance of events or the conduct of promoters and venues. Our total liability is limited to the amount paid for the service in question.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">5. Account Termination</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        We reserve the right to ban users found scalping tickets, using automated bots, or engaging in abusive behavior.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-amber-400">6. Governing Law</h2>
                    <p className="text-zinc-300 leading-relaxed">
                        These terms are governed by the laws of England and Wales.
                    </p>
                </section>

                <div className="pt-12 border-t border-zinc-800">
                    <p className="text-zinc-500 text-sm">
                        Velo Tickets is operated by Velo Digital Ltd. Registered Address: 123 Tech Lane, London, E1 6AN.
                    </p>
                </div>
            </div>
        </div>
    );
}
