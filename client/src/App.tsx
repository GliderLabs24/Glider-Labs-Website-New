import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { CookieBanner } from "./components/CookieBanner";
import { ContactDialogProvider } from "./components/ContactDialog";
import Home from "./pages/Home";
import Cookies from "./pages/Cookies";
import Maintenance from "./pages/Maintenance";
import Careers from "./pages/Careers";
import Docs from "./pages/Docs";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/app">
        <Redirect to="/" />
      </Route>
      <Route path="/cookies" component={Cookies} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/careers" component={Careers} />
      <Route path="/docs/:slug" component={Docs} />
      <Route path="/docs">
        <Redirect to="/docs/overview" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ContactDialogProvider>
          <div className="min-h-screen bg-page">
            <Router />
            <CookieBanner />
          </div>
        </ContactDialogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
