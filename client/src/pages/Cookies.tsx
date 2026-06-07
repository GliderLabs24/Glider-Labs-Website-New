import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-page text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-gray-400">Last updated: November 15, 2025</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sm:p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">What are Cookies?</h2>
            <p className="text-gray-300 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">How We Use Cookies</h2>
            <p className="text-gray-300 mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze how you use our website</li>
              <li>Improve our services and user experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-200 mb-2">Essential Cookies</h3>
                <p className="text-gray-400 text-sm">These are necessary for the website to function and cannot be switched off.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-200 mb-2">Analytics Cookies</h3>
                <p className="text-gray-400 text-sm">These help us understand how visitors interact with our website.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-200 mb-2">Preference Cookies</h3>
                <p className="text-gray-400 text-sm">These allow the website to remember choices you make.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Managing Cookies</h2>
            <p className="text-gray-300 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
            </p>
            <p className="text-gray-400 text-sm">
              For more information about cookies and how to manage them, visit <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutcookies.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
