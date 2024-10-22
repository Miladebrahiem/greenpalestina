import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import PageComponent from './pages/PageComponent';
import BlogPage from './pages/BlogPage';
import CookieWarning from './components/CookieWarning';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Router>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:slug" element={<PostPage />} />
                <Route path="/page/:slug" element={<PageComponent />} />
                <Route path="/doe-mee" element={<PageComponent />} />
                <Route path="/contact" element={<PageComponent />} />
                <Route path="/blog" element={<BlogPage />} />
              </Routes>
            </main>
            <Footer />
            <CookieWarning />
          </div>
        </Router>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;