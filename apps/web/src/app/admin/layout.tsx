import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    redirect('/promoter');
    return null;
}
