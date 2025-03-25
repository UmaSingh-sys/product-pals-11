
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, Product } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import Layout from '@/components/Layout';

const Index = () => {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products
  const { 
    data: products = [], 
    isLoading: isLoadingProducts,
    error: productsError 
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Fetch categories
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Apply filters whenever products, search query, or category changes
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Loading states
  const isLoading = isLoadingProducts || isLoadingCategories;

  // Loading skeleton
  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Filters skeleton */}
            <div className="md:w-64 mb-6 md:mb-0">
              <div className="h-6 w-24 bg-muted rounded animate-pulse mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            
            {/* Products grid skeleton */}
            <div className="flex-1">
              <div className="h-10 bg-muted rounded animate-pulse mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border h-80 animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <div className="p-4">
                      <div className="h-4 w-16 bg-muted rounded mb-2"></div>
                      <div className="h-5 w-full bg-muted rounded mb-4"></div>
                      <div className="h-8 w-full bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (productsError) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto text-center">
          <h2 className="text-xl font-medium mb-4">Oops! Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load the products. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Refresh Page
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        {/* Hero section */}
        <div className="mb-12 text-center py-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Quality Products</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our curated collection of premium items
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Sidebar with filters */}
          <div className="md:w-64 mb-6 md:mb-0">
            <FilterSection 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
