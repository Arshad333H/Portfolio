'use client';

import { Mail, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const handleClick = () => {
    // Replace with your email
    const email = 'skmohammedarshad33.com';
    const subject = encodeURIComponent('Contact via Portfolio');
    const body = encodeURIComponent("Hi, I saw your portfolio and...");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Me</h1>
          <p className="text-gray-600 dark:text-gray-300">I'd love to hear from you!</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
            <Mail className="text-gray-600 dark:text-gray-300" />
            <span className="text-gray-800 dark:text-white">yourname@example.com</span>
          </div>

          <Button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <SendHorizonal size={18} />
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
