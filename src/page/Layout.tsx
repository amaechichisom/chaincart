// import FeatureList from '@/components/shared/FeatureList';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

// import NewsletterSection from '@/components/shared/NewsletterSection';
// import SubHeader from '@/components/shared/SubHeader';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (


    <div className="flex flex-col min-h-screen w-full">
      {/* <SubHeader/> */}
      <Header />
      <main className="mt-2">
        <Outlet />
      </main>
      {/* <NewsletterSection />
      <FeatureList /> */}
      
      <Footer />
    </div>

  );
}
