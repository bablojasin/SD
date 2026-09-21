import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react';
import { getBlogPosts, getHomePageContent } from '../lib/content';

export const BlogSection: React.FC = () => {
  const navigate = useNavigate();
  const allPosts = getBlogPosts();
  const homeData = getHomePageContent();
  const sectionContent = homeData.blogSection;

  // Show first 3 posts on the homepage preview
  const previewPosts = allPosts.slice(0, sectionContent?.postCount || 3);

  return (
    <section id="blog" className="py-24 md:py-32 relative overflow-hidden bg-[#050807]">
      {/* Background Subtle Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B7FF00]/8 rounded-full blur-[180px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md mb-4 shadow-lg shadow-black/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF00]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8] tracking-tight">
              {sectionContent?.sectionLabel || 'Cybersecurity Insights'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {sectionContent?.heading || 'Stay Ahead Of The Threat'}
          </h2>
          {sectionContent?.description && (
            <p className="text-sm sm:text-base text-[#9AA39A] mt-4 max-w-2xl mx-auto">
              {sectionContent.description}
            </p>
          )}
        </div>

        {/* 3 Article Cards: Desktop 3 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewPosts.map((post) => (
            <article
              key={post.slug || post.id}
              onClick={() => navigate(`/blog/${post.slug || post.id}`)}
              id={`insight-card-${post.slug || post.id}`}
              className="rounded-3xl border border-white/10 bg-[#070A08]/85 overflow-hidden backdrop-blur-xl hover:border-[#B7FF00]/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/80 cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Large Cybersecurity Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050807]">
                  <img
                    src={post.featuredImage || post.imageUrl}
                    alt={post.imageAlt || post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A08] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-xs text-[#9AA39A] mb-3 font-mono">
                    <span className="bg-[#172512] text-[#B7FF00] px-3 py-1 rounded-full text-[11px] font-medium border border-[#B7FF00]/25">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B7FF00]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#9AA39A] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom: Author & Read More */}
              <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-[#9AA39A] flex items-center gap-1.5 font-mono">
                  <User className="w-3.5 h-3.5 text-[#B7FF00]" />
                  <span>{post.author}</span>
                </span>
                <span className="w-8 h-8 rounded-full bg-[#172512] text-[#B7FF00] border border-[#B7FF00]/30 flex items-center justify-center group-hover:bg-[#B7FF00] group-hover:text-[#050807] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
