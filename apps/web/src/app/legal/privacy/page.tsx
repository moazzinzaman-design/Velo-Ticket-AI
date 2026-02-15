import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-velo-bg-main pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1>Privacy Policy</h1>
                <p className="text-white/60">Last updated: February 15, 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to Velo ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                    This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website
                    velo.live or use our mobile application.
                </p>

                <h2>2. Data We Collect</h2>
                <ul>
                    <li><strong>Personal Data:</strong> Name, email address, phone number, and billing information when you buy tickets.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our site, including IP address, browser type, and pages visited.</li>
                    <li><strong>Location Data:</strong> If enabled, we collect location data to show you events near you.</li>
                </ul>

                <h2>3. How We Use Your Data</h2>
                <p>We use your data to:</p>
                <ul>
                    <li>Process ticket orders and payments.</li>
                    <li>Send booking confirmations and event updates.</li>
                    <li>Improve our platform and prevent fraud.</li>
                    <li>Send marketing communications (with your consent).</li>
                </ul>

                <h2>4. Data Sharing</h2>
                <p>
                    We may share your data with third-party vendors (e.g., Stripe for payments, AWS for hosting) and event organizers
                    for the events you book. We do not sell your personal data.
                </p>

                <h2>5. Your Rights (GDPR/UK GDPR)</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction or deletion of your data.</li>
                    <li>Withdraw consent for marketing at any time.</li>
                </ul>

                <h2>6. Contact Us</h2>
                <p>If you have questions about this policy, please contact us at <a href="mailto:privacy@velo.live" className="text-velo-cyan">privacy@velo.live</a>.</p>
            </div>
        </div>
    );
}
