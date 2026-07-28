import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingMenu from '@/components/layout/FloatingMenu';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Contact from '../components/sections/Contact';
import Philosophy from '@/components/sections/Philosophy';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Intro />
                <Philosophy />
                <Contact />
            </main>
            <Footer />
            <FloatingMenu />
        </>
    );
}
