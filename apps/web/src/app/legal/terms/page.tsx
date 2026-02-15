import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-velo-bg-main pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1>Terms of Service</h1>
                <p className="text-white/60">Last updated: February 15, 2026</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing Velo, you agree to be bound by these Terms of Service. If you disagree with any part of these terms,
                    you may not access our services.
                </p>

                <h2>2. Ticket Purchases</h2>
                <ul>
                    <li>All ticket sales are final unless an event is cancelled.</li>
                    <li>Prices may include a service fee (10%) which is non-refundable.</li>
                    <li>You may not resell tickets for profit on third-party platforms.</li>
                </ul>

                <h2>3. User Accounts</h2>
                <p>
                    You are responsible for safeguarding your account password. You agree not to disclose your password to any third party.
                    We reserve the right to suspend accounts that violate our community guidelines.
                </p>

                <h2>4. Event Cancellations</h2>
                <p>
                    If an event is cancelled, you will receive a full refund of the ticket face value. Service fees cover our processing
                    costs and are generally non-refundable unless required by law.
                </p>

                <h2>5. Limitation of Liability</h2>
                <p>
                    Velo is not liable for any indirect, incidental, or consequential damages arising from your use of our platform
                    or attendance at events.
                </p>

                <h2>6. Governing Law</h2>
                <p>
                    These terms shall be governed by the laws of the United Kingdom.
                </p>
            </div>
        </div>
    );
}
