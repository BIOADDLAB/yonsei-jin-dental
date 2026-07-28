import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingMenu from '@/components/layout/FloatingMenu';
import Hero from '@/components/sections/Hero';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
            </main>
            <Footer />
            <FloatingMenu />
        </>
    );
}
