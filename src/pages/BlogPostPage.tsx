import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag, ChevronRight, Share2, Shield } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '../lib/content';
import { SEO } from '../components/common/SEO';
import { SectionLabel } from '../components/common/SectionLabel';
import { CTASection } from '../components/common/CTASection';

interface BlogPostPageProps {
  onCtaSuccess: (email: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onCtaSuccess }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(slug || '');
  const allPosts = getBlogPosts();

  if (!post) {
    return (
      <div className="py-24 text-center bg-[#050807] min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-white mb-4">REPORT NOT FOUND</h1>
        <p className="text-sm text-[#9AA39A] mb-6">The requested intelligence briefing does not exist or access is restricted.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B7FF00] text-[#050807] font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Insights</span>
        </Link>
      </div>
    );
  }

  // Related posts
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Simple clean markdown parser for headings, lists, code, and paragraphs
  const renderMarkdownContent = (raw: string) => {
    const lines = raw.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = (key: string) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={key} className="space-y-2 my-4 pl-4 border-l-2 border-[#B7FF00]/40">
            {listItems.map((li, i) => (
              <li key={i} className="text-sm sm:text-base text-[#D8DCD8] leading-relaxed">
                {li}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        flushList(`list-${idx}`);
        elements.push(
          <h1 key={idx} className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList(`list-${idx}`);
        elements.push(
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList(`list-${idx}`);
        elements.push(
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-[#B7FF00] mt-6 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(trimmed.slice(2));
      } else if (trimmed.length === 0) {
        flushList(`list-${idx}`);
      } else {
        flushList(`list-${idx}`);
        elements.push(
          <p key={idx} className="text-sm sm:text-base text-[#D8DCD8] leading-relaxed my-3">
            {trimmed}
          </p>
        );
      }
    });

    flushList('list-end');
    return elements;
  };

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#050807]">
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        ogImage={post.featuredImage || post.imageUrl}
        canonicalUrl={`https://securify.com/blog/${post.slug}`}
        article={{
          publishedTime: post.publishDate || post.date || '2026-09-16',
          author: post.author,
          tags: post.tags,
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://securify.com/' },
          { name: 'Insights', url: 'https://securify.com/blog' },
          { name: post.title, url: `https://securify.com/blog/${post.slug}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#9AA39A] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to="/blog" className="hover:text-white transition-colors">Insights</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[#B7FF00] truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Article Meta Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#172512] text-[#B7FF00] border border-[#B7FF00]/30 px-3 py-1 rounded-full text-xs font-mono font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-[#9AA39A]">
              <Clock className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span>{post.readTime}</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-[#9AA39A]">
              <Calendar className="w-3.5 h-3.5 text-[#B7FF00]" />
              <span>{post.publishDate || post.date}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#172512] border border-[#B7FF00]/40 flex items-center justify-center text-[#B7FF00]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{post.author}</div>
                <div className="text-xs font-mono text-[#9AA39A]">
                  {post.authorRole || 'Threat Intelligence Directorate'}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-colors cursor-pointer ${
                copied
                  ? 'bg-[#B7FF00] text-[#050807] border-[#B7FF00] font-bold'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-white/10'
              }`}
            >
              <Share2 className={`w-3.5 h-3.5 ${copied ? 'text-[#050807]' : 'text-[#B7FF00]'}`} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl bg-black">
          <img
            src={post.featuredImage || post.imageUrl}
            alt={post.imageAlt || post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Article Body */}
        <article className="rounded-3xl border border-white/10 bg-[#070A08]/85 p-8 sm:p-12 mb-16 backdrop-blur-xl shadow-2xl">
          <div className="text-base sm:text-lg text-white font-medium italic mb-8 pb-6 border-b border-white/10 leading-relaxed">
            "{post.excerpt}"
          </div>

          <div className="prose prose-invert max-w-none">
            {renderMarkdownContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#B7FF00]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-white/[0.04] text-[#9AA39A] px-3 py-1 rounded-lg border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related Briefings */}
        {relatedPosts.length > 0 && (
          <div className="mb-20">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Related Intelligence Briefings</h3>
              <Link to="/blog" className="text-xs font-mono text-[#B7FF00] hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="rounded-2xl border border-white/10 bg-[#070A08] p-5 hover:border-[#B7FF00]/40 transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-mono text-[#B7FF00]">{rel.category}</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#B7FF00] mt-1 mb-2 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#9AA39A] line-clamp-2">{rel.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Require Immediate Vulnerability Remediation?"
          subtitle="Engage our incident commanders for immediate triage."
          onSuccessPrompt={onCtaSuccess}
        />

      </div>
    </div>
  );
};
