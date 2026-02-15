'use client';

import React from 'react';
import PromoterLayout from '../../../components/promoter/PromoterLayout';
import CreateEventForm from '../../../components/promoter/CreateEventForm';

export default function CreateEventPage() {
    return (
        <PromoterLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
                <p className="text-white/50">Launch your event to millions of fans with AI-powered discovery.</p>
            </div>
            <CreateEventForm />
        </PromoterLayout>
    );
}
