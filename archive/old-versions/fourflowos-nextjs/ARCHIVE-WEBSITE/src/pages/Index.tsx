import Header from '@/components/Header';
import HyperspaceHero from '@/components/HyperspaceHero';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-0 md:pb-0 md:pt-16">
        <HyperspaceHero />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
