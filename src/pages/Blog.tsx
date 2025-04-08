import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Salary Calculator Blog | Paycheck & Income Tax Guides</title>
        <meta name="description" content="Explore our salary calculator blog for expert guides on income tax, take home pay calculation, payroll taxes, and more. Understand your finances better." />
        <meta name="keywords" content="salary calculator blog, income tax guides, take home pay calculation, paycheck calculator, tax calculator" />
        <link rel="canonical" href="https://www.ctc-calculator.com/blog.html" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Salary Calculator Blog</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Expert guides and articles on salary calculation, income tax, take home pay, and everything you need to understand your finances better.
            </p>
          </div>
          
          {/* Blog post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <div key={post.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/blog/${post.slug}.html`}>
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>
                <div className="p-5 space-y-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <Link to={`/blog/${post.slug}.html`} className="block">
                    <h2 className="text-xl font-semibold hover:text-finance-primary transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.slug}.html`}
                    className="inline-flex items-center text-finance-primary hover:text-finance-primary/90 text-sm font-medium mt-2"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <nav className="inline-flex">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === index + 1 ? 'bg-finance-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;