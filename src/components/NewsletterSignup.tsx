import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: Replace with actual newsletter signup logic
    console.log('Signing up with email:', email);

    setMessage('Thank you for subscribing to our newsletter!');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-h2 font-merriweather font-semibold mb-4">Stay Informed, Stay Connected</h2>
      <p className="text-lg mb-6 font-raleway">
        Join our newsletter to receive updates on our activities, news about Palestine, and ways you can help.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary font-raleway"
          />
          <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 animate-bounce" />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary text-secondary px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 font-raleway ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-green-600 font-raleway">{message}</p>
      )}
    </div>
  );
};

export default NewsletterSignup;