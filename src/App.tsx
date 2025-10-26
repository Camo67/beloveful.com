import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import CookieBanner from "./components/CookieBanner";
import RegionLanding from "./pages/RegionLanding";

// Lazy load all page components
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CountryGallery = lazy(() => import("./pages/CountryGallery"));
const ProjectGallery = lazy(() => import("./pages/ProjectGallery"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Workshops = lazy(() => import("./pages/Workshops"));
const WorkshopChicagoPrivate = lazy(() => import("./pages/WorkshopChicagoPrivate"));
const WorkshopChicagoGroup = lazy(() => import("./pages/WorkshopChicagoGroup"));
const WorkshopOnline = lazy(() => import("./pages/WorkshopOnline"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const PrintShop = lazy(() => import("./pages/PrintShop"));
const OpenEdition = lazy(() => import("./pages/OpenEdition"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin").then(module => ({ default: module.Admin })));
const Debug = lazy(() => import("./pages/Debug"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ"));
const TestData = lazy(() => import("./pages/TestData"));
const TestSimpleImages = lazy(() => import("./pages/TestSimpleImages"));
const SimpleCloudinaryDemo = lazy(() => import("./pages/SimpleCloudinaryDemo"));
const ComprehensiveImageDemo = lazy(() => import("./pages/ComprehensiveImageDemo"));
const ImageGallery = lazy(() => import("./pages/ImageGallery"));
const RegionPage = lazy(() => import("./pages/RegionPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieBanner />
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/test-data" element={<TestData />} />
              <Route path="/test-simple-images" element={<TestSimpleImages />} />
              <Route path="/simple-cloudinary-demo" element={<SimpleCloudinaryDemo />} />
              <Route path="/comprehensive-image-demo" element={<ComprehensiveImageDemo />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gallery/:region" element={<RegionPage />} />
              <Route path="/gallery/:region/:country" element={<ImageGallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:project" element={<ProjectGallery />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/private-chicago" element={<WorkshopChicagoPrivate />} />
              <Route path="/workshops/group-chicago" element={<WorkshopChicagoGroup />} />
              <Route path="/workshops/online-group" element={<WorkshopOnline />} />
              <Route path="/workshops/mentorship" element={<Mentorship />} />

              {/* Legacy routes */}
              <Route path="/mentorship" element={<Navigate to="/workshops/mentorship" replace />} />
              <Route path="/workshop-chicago-private" element={<Navigate to="/workshops/private-chicago" replace />} />
              <Route path="/workshop-chicago-group" element={<Navigate to="/workshops/group-chicago" replace />} />
              <Route path="/workshop-online" element={<Navigate to="/workshops/online-group" replace />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/print-shop" element={<PrintShop />} />
              <Route path="/open-edition" element={<OpenEdition />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/adminlogin" element={<Admin />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/debug" element={<Debug />} />

              {/* Pretty region and country URLs */}
              <Route path=":region" element={<RegionLanding />} />
              <Route path=":region/:country" element={<CountryGallery />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;