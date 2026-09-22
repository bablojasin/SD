import React from 'react';
import { Plus } from 'lucide-react';
import { BlogPostItem } from '../../types';

interface BlogCardProps {
  post: BlogPostItem;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const image = post.featuredImage || post.imageUrl;
  const date = post.publishDate || post.date;

  return (
    <article
      onClick={onClick}
      className="rounded-3xl border border-white/10 bg-[#070A08]/85 overflow-hidden backdrop-blur-xl hover:border-[#B7FF00]/40 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer group hover:-translate-y-1"
      id={`blog-card-${post.slug || post.id}`}
    >
      <div>
        {/* Thumbnail Image */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#050807]">
          <picture className="w-full h-full">
            <source
              type="image/webp"
              srcSet={`${(image || '').replace(/\.(jpg|png)$/, '')}-480.webp 480w, ${(image || '').replace(/\.(jpg|png)$/, '')}-800.webp 800w, ${(image || '').replace(/\.(jpg|png)$/, '')}.webp 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <img
              src={(image || '').replace(/\.(jpg|png)$/, '.webp')}
              alt={post.imageAlt || post.title}
              width={800}
              height={550}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/90 via-transparent to-transparent"></div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center justify-between text-xs text-[#9AA39A] mb-3">
            <span className="bg-[#172512] text-[#B7FF00] px-3 py-1 rounded-full font-mono text-[11px] font-medium border border-[#B7FF00]/20">
              {post.category}
            </span>
            <span className="font-mono text-[#9AA39A]">{date}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] group-hover:text-[#B7FF00] transition-colors leading-snug mb-2">
            {post.title}
          </h3>

          <p className="text-xs text-[#9AA39A] line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Bottom Read More ⊕ Link */}
      <div className="px-6 pb-6 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#B7FF00] group-hover:underline">
          <span>Read Briefing</span>
          <div className="w-4 h-4 rounded-full bg-[#B7FF00]/20 text-[#B7FF00] flex items-center justify-center">
            <Plus className="w-3 h-3" />
          </div>
        </div>
      </div>
    </article>
  );
};
