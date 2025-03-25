
import React from 'react';
import { cn } from '@/lib/utils';

interface FilterSectionProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-3 py-1.5 text-xs rounded-full transition-all duration-200",
            selectedCategory === null 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full capitalize transition-all duration-200",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
