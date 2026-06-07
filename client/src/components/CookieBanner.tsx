import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');

    const sync = () => {
      if (!mq.matches) {
        setIsVisible(false);
        return;
      }
      setIsVisible(localStorage.getItem('cookieConsent') === null);
    };

    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // You can add your analytics initialization here if needed
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] max-h-[85dvh] -translate-x-1/2 overflow-y-auto overflow-x-hidden overscroll-contain rounded-xl border border-gray-700 bg-gray-900/95 shadow-xl backdrop-blur-sm sm:w-[min(28rem,calc(100vw-3rem))]"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 id="cookie-banner-title" className="text-base font-semibold leading-snug text-white sm:text-lg">
            We value your privacy
          </h3>
          <p id="cookie-banner-desc" className="text-sm leading-relaxed text-gray-300">
            We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
          </p>
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:gap-3 sm:pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="min-h-11 shrink-0 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white sm:min-h-9 sm:flex-1"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="min-h-11 shrink-0 bg-primary hover:bg-primary/90 sm:min-h-9 sm:flex-1"
            >
              Accept All
            </Button>
          </div>
          <a
            href="/cookies"
            className="text-center text-xs text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
}
