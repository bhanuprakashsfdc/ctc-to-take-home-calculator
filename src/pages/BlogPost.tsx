import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '../data/blogPosts';
import InternationalCTCCalculatorForm from '@/components/InternationalCTCCalculatorForm';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the blog post with the matching slug
  // Remove .html extension if present to match with the actual slug in blogPosts data
  const cleanSlug = slug?.replace('.html', '');
  const post = blogPosts.find(post => post.slug === cleanSlug);
  
  // Ensure we have the correct URL format for SEO
  useEffect(() => {
    // If URL doesn't end with .html, redirect to the .html version
    if (slug && post && !slug.endsWith('.html')) {
      navigate(`/blog/${slug}.html`, { replace: true });
    }
  }, [slug, post, navigate]);
  
  // If post not found, redirect to blog page
  useEffect(() => {
    if (!post) {
      navigate('/blog.html');
    }
  }, [post, navigate]);
  
  // Add social sharing functionality
  const shareUrl = `https://www.ctc-calculator.com/blog/${post?.slug}.html`;
  const shareTitle = post?.title || 'CTC Calculator Blog';
  
  // If post is not found and we're in the process of redirecting, show a loading state
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Format the date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | CTC Calculator Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <link rel="canonical" href={`https://www.ctc-calculator.com/blog/${post.slug}.html`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.coverImage} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.coverImage,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "CTC Calculator",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.ctc-calculator.com/favicon.ico"
              }
            },
            "description": post.excerpt
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back to blog link */}
          <div>
            <Link 
              to="/blog.html" 
              className="inline-flex items-center text-finance-primary hover:text-finance-primary/90 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>
          
          {/* Blog post header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
              <span className="mx-2">•</span>
              <span>By {post.author}</span>
            </div>
            
            <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <InternationalCTCCalculatorForm />
          
          {/* Blog post content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags/Keywords */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          {/* Social Sharing */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-3">Share This Article</h3>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1DA1F2]/90 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#4267B2] text-white rounded-full hover:bg-[#4267B2]/90 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0077B5] text-white rounded-full hover:bg-[#0077B5]/90 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`}
                className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Share via Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
              </a>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#25D366]/90 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Related posts */}
          <div className="pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <div key={relatedPost.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <Link to={`/blog/${relatedPost.slug}.html`}>
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                      <Link to={`/blog/${relatedPost.slug}.html`} className="block">
                        <h4 className="text-lg font-semibold hover:text-finance-primary transition-colors">{relatedPost.title}</h4>
                      </Link>
                      <p className="text-muted-foreground text-sm line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;