import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FrameworkOverview from "./pages/framework/FrameworkOverview";
import MobileFlowNavigation from "./components/MobileFlowNavigation";

// SELF Dimension
import SelfOverview from "./pages/framework/self/SelfOverview";
import TunedEmotions from "./pages/framework/self/TunedEmotions";
import OpenMind from "./pages/framework/self/OpenMind";
import FocusedBody from "./pages/framework/self/FocusedBody";

// SPACE Dimension
import SpaceOverview from "./pages/framework/space/SpaceOverview";
import IntentionalSpace from "./pages/framework/space/IntentionalSpace";
import OptimizedTools from "./pages/framework/space/OptimizedTools";
import FeedbackSystems from "./pages/framework/space/FeedbackSystems";

// STORY Dimension
import StoryOverview from "./pages/framework/story/StoryOverview";
import GenerativeStory from "./pages/framework/story/GenerativeStory";
import WorthyMission from "./pages/framework/story/WorthyMission";
import EmpoweredRole from "./pages/framework/story/EmpoweredRole";

// SPIRIT Dimension
import SpiritOverview from "./pages/framework/spirit/SpiritOverview";
import GroundingValues from "./pages/framework/spirit/GroundingValues";
import VisualizedVision from "./pages/framework/spirit/VisualizedVision";
import IgnitedCuriosity from "./pages/framework/spirit/IgnitedCuriosity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Framework Routes */}
          <Route path="/framework" element={<FrameworkOverview />} />
          
          {/* SELF Dimension Routes */}
          <Route path="/framework/self" element={<SelfOverview />} />
          <Route path="/framework/self/tuned-emotions" element={<TunedEmotions />} />
          <Route path="/framework/self/open-mind" element={<OpenMind />} />
          <Route path="/framework/self/focused-body" element={<FocusedBody />} />
          
          {/* SPACE Dimension Routes */}
          <Route path="/framework/space" element={<SpaceOverview />} />
          <Route path="/framework/space/intentional-space" element={<IntentionalSpace />} />
          <Route path="/framework/space/optimized-tools" element={<OptimizedTools />} />
          <Route path="/framework/space/feedback-systems" element={<FeedbackSystems />} />
          
          {/* STORY Dimension Routes */}
          <Route path="/framework/story" element={<StoryOverview />} />
          <Route path="/framework/story/generative-story" element={<GenerativeStory />} />
          <Route path="/framework/story/worthy-mission" element={<WorthyMission />} />
          <Route path="/framework/story/empowered-role" element={<EmpoweredRole />} />
          
          {/* SPIRIT Dimension Routes */}
          <Route path="/framework/spirit" element={<SpiritOverview />} />
          <Route path="/framework/spirit/grounding-values" element={<GroundingValues />} />
          <Route path="/framework/spirit/visualized-vision" element={<VisualizedVision />} />
          <Route path="/framework/spirit/ignited-curiosity" element={<IgnitedCuriosity />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Mobile Navigation */}
        <MobileFlowNavigation />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
