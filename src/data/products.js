export const products = [
  {
    id: 1,
    title: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    shortDescription: 'High-quality wireless headphones with noise cancellation',
    description: 'Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Comfortable over-ear design perfect for extended use.',
    rating: 4.5,
    reviewCount: 324,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    ],
    reviews: [
      { name: 'John Doe', rating: 5, comment: 'Excellent headphones! Great sound quality and comfortable to wear.', date: '2 days ago' },
      { name: 'Jane Smith', rating: 4, comment: 'Very good product. Battery lasts long as advertised.', date: '1 week ago' },
    ]
  },
  {
    id: 2,
    title: 'USB-C Fast Charging Cable',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    shortDescription: 'Durable USB-C cable with fast charging support',
    description: 'High-speed USB-C charging cable compatible with all USB-C devices. Durable braided design with fast charging support up to 100W.',
    rating: 4.8,
    reviewCount: 1205,
    images: [
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608423671455-4a180e96d211?w=500&h=500&fit=crop',
    ],
    reviews: [
      { name: 'Mike Johnson', rating: 5, comment: 'Best cable I have ever used!', date: '3 days ago' },
    ]
  },
  {
    id: 3,
    title: '4K Webcam',
    price: 89.99,
    originalPrice: null,
    discount: 0,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587214382346-f049cd451263?w=500&h=500&fit=crop',
    shortDescription: 'Professional 4K webcam for streaming and video calls',
    description: 'Professional-grade 4K webcam perfect for content creators and video conferencing. Includes built-in microphone and auto-focus.',
    rating: 4.6,
    reviewCount: 287,
    images: [
      'https://images.unsplash.com/photo-1587214382346-f049cd451263?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1516062661385-31278eb3bc9e?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 4,
    title: 'Mechanical Keyboard RGB',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829191301-4e8ae699ecd0?w=500&h=500&fit=crop',
    shortDescription: 'Gaming mechanical keyboard with RGB lighting',
    description: 'Professional mechanical keyboard with customizable RGB lighting, programmable keys, and premium build quality for gaming and typing.',
    rating: 4.7,
    reviewCount: 516,
    images: [
      'https://images.unsplash.com/photo-1587829191301-4e8ae699ecd0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1595522446814-66ba51810faa?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 5,
    title: 'Portable SSD 1TB',
    price: 99.99,
    originalPrice: 149.99,
    discount: 33,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    shortDescription: 'Fast portable solid state drive with 1TB capacity',
    description: 'Ultra-fast portable SSD with 1TB storage capacity. Read speeds up to 1050MB/s. Perfect for creative professionals and mobile workers.',
    rating: 4.9,
    reviewCount: 823,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 6,
    title: 'Wireless Gaming Mouse',
    price: 49.99,
    originalPrice: 79.99,
    discount: 37,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    shortDescription: 'Precision gaming mouse with wireless connectivity',
    description: 'High-precision gaming mouse with zero lag wireless connection. 16,000 DPI sensor, 70-hour battery life, and ergonomic design.',
    rating: 4.4,
    reviewCount: 612,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 7,
    title: 'Cotton T-Shirt',
    price: 24.99,
    originalPrice: 39.99,
    discount: 37,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    shortDescription: '100% cotton comfortable everyday t-shirt',
    description: 'High-quality 100% cotton t-shirt. Comfortable, breathable, and perfect for everyday wear. Available in multiple colors and sizes.',
    rating: 4.3,
    reviewCount: 445,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 8,
    title: 'Bestselling Novel',
    price: 14.99,
    originalPrice: null,
    discount: 0,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop',
    shortDescription: 'Award-winning fiction novel',
    description: 'Critically acclaimed bestselling novel with gripping storyline. Perfect for book lovers and fiction enthusiasts.',
    rating: 4.7,
    reviewCount: 1892,
    images: [
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 9,
    title: 'Indoor Plant Pot',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    shortDescription: 'Decorative ceramic pot for plants',
    description: 'Beautiful ceramic pot with modern design. Perfect for indoor plants. Includes drainage hole for healthy plant growth.',
    rating: 4.5,
    reviewCount: 234,
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 10,
    title: 'Sports Water Bottle',
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop',
    shortDescription: 'Insulated water bottle for sports and outdoor activities',
    description: 'Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof and eco-friendly.',
    rating: 4.6,
    reviewCount: 567,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 11,
    title: 'Educational Building Blocks',
    price: 34.99,
    originalPrice: 59.99,
    discount: 41,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1594608318906-c894fdcc538d?w=500&h=500&fit=crop',
    shortDescription: 'STEM learning building blocks set for kids',
    description: 'Educational building blocks designed to enhance creativity and learning. Safe for children ages 3+. 500+ pieces included.',
    rating: 4.8,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1594608318906-c894fdcc538d?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
  {
    id: 12,
    title: 'Smart Watch',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    shortDescription: 'Feature-rich smartwatch with health tracking',
    description: 'Advanced smartwatch with heart rate monitor, sleep tracking, GPS, and 7-day battery life. Compatible with iOS and Android.',
    rating: 4.5,
    reviewCount: 789,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    ],
    reviews: []
  },
];

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getRelatedProducts = (productId, limit = 4) => {
  return products
    .filter(p => p.id !== productId)
    .slice(0, limit);
};
