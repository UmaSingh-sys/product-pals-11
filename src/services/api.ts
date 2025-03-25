
// API service for product data
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product #${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product #${id}:`, error);
    return null;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) throw new Error(`Failed to fetch products in category: ${category}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};
