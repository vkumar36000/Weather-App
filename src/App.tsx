import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout_";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./pages/Weather-Dashboard";
import CityPage from "./pages/City-Page";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5 * 60 * 1000,     // 5 minutes
      gcTime: 10 * 60 * 1000,    // 10 minutes
      retry:false,
      refetchOnWindowFocus:false,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/"  element={<WeatherDashboard/>}/>
            <Route path="/city/:cityName"  element={<CityPage/>}/>

          </Routes>
        </Layout>
        <Toaster richColors/>
      </ThemeProvider>
    </BrowserRouter>      
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider> 
  );
}

export default App;
