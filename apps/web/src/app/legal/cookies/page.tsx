import React from 'react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-velo-bg-main pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1>Cookie Policy</h1>
                <p className="text-white/60">Last updated: February 15, 2026</p>

                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device when you visit websites. We use them to make our site work
                    and to analyze traffic.
                </p>

                <h2>2. How We Use Cookies</h2>
                <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., keeping you logged in).</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site (e.g., Google Analytics).</li>
                    <li><strong>Marketing Cookies:</strong> Used to show you relevant ads.</li>
                </ul>

                <h2>3. Managing Cookies</h2>
                <p>
                    You can change your cookie preferences at any time by clicking the "Cookie Settings" link in the footer or adjusting
                    your browser settings.
                </p>
            </div>
        </div>
    );
}
