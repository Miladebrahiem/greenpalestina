import React, { useState, useEffect } from 'react';

const CookieWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (!acceptedCookies) {
      setShowWarning(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('acceptedCookies', 'true');
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-secondary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="font-raleway">
          This website uses cookies to ensure you get the best experience on our website.
        </p>
        <button
          onClick={acceptCookies}
          className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 font-raleway"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieWarning;