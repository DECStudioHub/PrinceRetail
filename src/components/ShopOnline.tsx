import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Eye, 
  Plus, 
  SlidersHorizontal, 
  Check, 
  Tag, 
  Sparkles
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { Product } from '../types';
import { ProductDetailModal } from './ProductDetailModal';
import { getAssetUrl } from '../utils/assets';

interface ShopOnlineProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ShopOnline: React.FC<ShopOnlineProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Daily Essentials',
    'Pantry Favorites',
    'Home & Living',
    'Fresh & Chilled',
    'Personal Care',
    'Kasosyo Bulk'
  ];

  const filteredProducts = productsData
    .filter((prod) => {
      const matchCat = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 1500);
  };

  return (
    <section id="shop" className="py-20 lg:py-28 bg-[#FFFDF8] border-b border-[#252927]/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
              <span className="text-[#EF777B]">Digital Flagship Store</span>
              <span aria-hidden="true">·</span>
              <span>Shop Online</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
              Your Everyday Favorites.
            </h2>
            <p className="mt-4 text-base text-[#6C7470] leading-relaxed">
              Order fresh rice, cooking ingredients, hygiene essentials, and wholesale kasosyo packages delivered straight to your home or prepared for easy curbside pickup.
            </p>
          </div>

          {/* Quick Notice Badge */}
          <div className="p-3.5 rounded-2xl bg-[#DCEEE2]/50 border border-[#B8D9C4]/60 text-xs font-semibold text-[#252927] flex items-center gap-2 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Free Delivery on grocery orders over ₱1,500</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#252927]/10 p-4 sm:p-5 shadow-2xs mb-10 space-y-4">
          
          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#6C7470] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rice, canned goods, detergent..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs text-[#252927] focus:outline-none focus:border-[#EF777B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#6C7470]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-[#6C7470] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-bold text-[#252927] focus:outline-none focus:border-[#EF777B] cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#252927] text-white shadow-2xs'
                      : 'bg-[#FFFDF8] text-[#6C7470] hover:text-[#252927] border border-[#252927]/8'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isJustAdded = lastAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group p-3.5 sm:p-5 rounded-3xl bg-white border border-[#252927]/8 hover:border-[#EF777B]/40 hover:-translate-y-1 transition-all duration-300 shadow-2xs flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image container */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#252927]/5 aspect-square mb-3.5">
                    <img
                      src={getAssetUrl(product.image)}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#EF777B] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Button on Desktop Hover */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      aria-label="Quick View"
                      className="hidden sm:flex absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#252927] items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Category and Unit */}
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6C7470] mb-1">
                    {product.category} · {product.unit}
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#252927] leading-snug line-clamp-2 mb-2 group-hover:text-[#EF777B] transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3 text-[11px] text-[#6C7470]">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="ml-0.5 font-bold text-[#252927]">{product.rating}</span>
                    </div>
                    <span>({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="pt-3 border-t border-[#252927]/5 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-[#252927] tabular-nums">
                      ₱{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="block text-[10px] text-[#6C7470] line-through tabular-nums">
                        ₱{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shrink-0 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#EF777B] hover:bg-[#e46468] text-white shadow-2xs'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-bold text-[#252927]">No products found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#252927] text-white text-xs font-bold"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
