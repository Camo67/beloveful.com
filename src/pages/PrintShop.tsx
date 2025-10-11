import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";

export default function PrintShop() {
  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">Print Shop</h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              Bring BELOVEFUL photography into your space with high-quality prints. 
              Each piece is carefully curated and professionally printed to showcase 
              the authentic moments captured across the globe.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-12 mb-8">
              <h2 className="text-2xl font-medium mb-6 text-black dark:text-white">Available Now</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Explore our collection of limited edition prints, featuring iconic 
                street photography moments from Egypt, India, Japan, Myanmar, and more.
              </p>
              
              <a
                href="https://www.printinnovationlab.com/collections/beloveful"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Visit Print Shop
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Stay updated on new print releases and exclusive collections
              </p>
              <a
                href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Join Newsletter
              </a>
            </div>
          </div>
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
