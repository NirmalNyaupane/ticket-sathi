import OrganizerProviderLayout from '@/layout/OrganizerLayout';
import React from 'react';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <OrganizerProviderLayout>{children}</OrganizerProviderLayout>
        </main>
    )
}

export default OrganizerLayout