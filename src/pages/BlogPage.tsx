import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionLabel } from '../components/common/SectionLabel';
import { BlogCard } from '../components/cards/BlogCard';
import { CTASection } from '../components/common/CTASection';
import { SEO } from '../components/common/SEO';
import { getBlogPosts } from '../lib/content';
import { Search, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPageProps {
  onCtaSuccess: (email: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onCtaSuccess }) => {
  const navigate = useNavigate();
  const allPosts = getBlogPosts();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories dynamically
  const dynamicCategories = ['All', ...Array.from(new Set(allPosts.map((p) => p.category)))];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  const remainingPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title="Cybersecurity Insights | SPECTRE DEFEND"
        description="In-depth threat analyses, CVE breakdowns, zero-day advisories, and architectural whitepapers authored by the SPECTRE DEFEND Threat Research Lab."
        canonicalUrl="https://SpectreDefend.dpdns.org/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://SpectreDefend.dpdns.org/' },
          { name: 'Insights', url: 'https://SpectreDefend.dpdns.org/blog' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel className="mb-4">
            Threat Intelligence & Research
          </SectionLabel>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
            Cybersecurity <br />
            <span className="text-[#B7FF00]">Insights & Intelligence</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA39A] leading-relaxed">
            In-depth threat analyses, CVE breakdowns, zero-day advisories, and architectural whitepapers authored by the SPECTRE DEFEND Threat Research Lab.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B7FF00] text-[#050807] shadow-lg shadow-[#B7FF00]/20 font-bold'
                    : 'bg-white/[0.055] hover:bg-white/[0.09] text-[#E9ECE8] border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#9AA39A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0F0A] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#9AA39A] focus:outline-none focus:border-[#B7FF00]"
            />
          </div>
        </div>

        {/* Featured Hero Article */}
        {featuredPost && (
          <div
            onClick={() => navigate(`/blog/${featuredPost.slug}`)}
            className="rounded-3xl border border-white/10 bg-[#070A08]/85 overflow-hidden backdrop-blur-xl mb-16 cursor-pointer group hover:border-[#B7FF00]/40 transition-all shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#050807]">
                <picture className="w-full h-full">
                  <source
                    type="image/webp"
                    srcSet={`${(featuredPost.featuredImage || featuredPost.imageUrl || '').replace(/\.(jpg|png)$/, '')}-480.webp 480w, ${(featuredPost.featuredImage || featuredPost.imageUrl || '').replace(/\.(jpg|png)$/, '')}-800.webp 800w, ${(featuredPost.featuredImage || featuredPost.imageUrl || '').replace(/\.(jpg|png)$/, '')}.webp 1200w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 700px"
                  />
                  <img
                    src={(featuredPost.featuredImage || featuredPost.imageUrl || '').replace(/\.(jpg|png)$/, '.webp')}
                    alt={featuredPost.imageAlt || featuredPost.title}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-[#9AA39A]">
                  <span className="bg-[#B7FF00] text-[#050807] px-2.5 py-0.5 rounded-full font-bold">
                    FEATURED BRIEFING
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B7FF00]" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-[#9AA39A] leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA39A]">
                  <span className="flex items-center gap-1.5 text-white">
                    <User className="w-3.5 h-3.5 text-[#B7FF00]" />
                    <span>{featuredPost.author}</span>
                  </span>
                  <span className="text-[#B7FF00] font-bold group-hover:underline flex items-center gap-1">
                    Read Report <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {remainingPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              onClick={() => navigate(`/blog/${post.slug}`)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center text-sm font-mono text-[#9AA39A]">
            No research reports found matching "{searchQuery}".
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Subscribe To Real-Time Zero-Day Threat Briefings"
          subtitle="Receive immediate cryptographic advisories directly from our red team."
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
