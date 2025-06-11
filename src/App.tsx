import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Funds from "./components/Funds";
import Holdings from "./components/Holdings";
import { Layout } from "lucide-react";
import Orders from "./components/Orders";
import Apps from "./components/Apps";
import { Helmet } from "react-helmet";
import Positions from "./components/Positions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Apps" element={<Apps />} />
          <Route path="/Funds" element={<Funds />} />
          <Route path="/Holdings" element={<Holdings />} />
          <Route path="/Positions" element={<Positions />} />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/Orders" element={<Orders />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
