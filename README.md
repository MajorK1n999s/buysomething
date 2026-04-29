# 🛍️ Buy SomeThing - E-Commerce Web Application

A modern, responsive e-commerce web application built with React and Vite. Features a beautiful UI with product browsing, shopping cart, user profiles, and comprehensive information pages.

## ✨ Features

### 🏠 Home Page
- **Product Grid**: Browse all products with images, titles, descriptions, prices, and ratings
- **Search Functionality**: Search products by title or description
- **Category Filtering**: Filter products by category (Electronics, Clothing, Books, Home & Garden, Sports, Toys)
- **Product Cards**: Each product shows:
  - Product image with discount badge
  - Short description
  - Price with discount percentage (if applicable)
  - Star ratings with review count
  - "Add to Cart" button

### 📦 Product Detail Page
- **Image Carousel**: 
  - Main large image display
  - Previous/Next navigation buttons
  - Thumbnail slider for quick image selection
- **Product Information**:
  - Title, price, original price with discount percentage
  - Star rating and review count
  - Detailed product description
  - Quantity selector
- **Action Buttons**:
  - "Add to Cart" button
  - "Buy Now" button with checkout flow
- **Reviews Section**:
  - Display existing customer reviews
  - Submit new reviews with ratings
  - Average ratings calculation
  - Reviewer name, rating, and comments
- **Related Products**: Horizontal scrolling carousel with similar products

### 👤 Profile Page
- **User Authentication**:
  - Login/Register form for new users
  - Persistent user session
- **Profile Information**:
  - Display user details (name, email, phone, address, city, country)
  - Profile picture upload and display
- **Profile Management**:
  - Edit profile information
  - Update profile picture
  - Save changes functionality
- **Account Security**:
  - Logout functionality
  - Delete account option with confirmation
  - Settings and account management

### ℹ️ About Us Page
- Company story and mission
- Why choose us with feature highlights
- Core values display
- Team information
- Call-to-action to start shopping

### 📞 Contact Page
- **Contact Information**:
  - Email contact (support@buysomething.com)
  - Phone support
  - Physical address
- **Contact Form**:
  - Name, email, subject, message fields
  - Form validation
  - Success notification
- **Social Media Links**: Facebook, Twitter, Instagram, LinkedIn, YouTube
- **FAQ Section**: Common questions and answers

### 🎯 Navigation Bar
- **Brand Logo**: "Buy SomeThing" with fancy gradient styling
- **Navigation Links**:
  - Home
  - Category dropdown menu with all categories
  - About Us
  - Contact
- **User Profile Dropdown**:
  - Login/Register or user profile link
  - Edit Profile
  - Settings
  - Logout
  - Delete Account
- **Shopping Cart**: Display cart item count

### 🔧 Footer
- **Company Information**: Brief description
- **Quick Links**: Home, About Us, Contact, Privacy Policy
- **Customer Service**: Contact Us, FAQ, Shipping Info, Returns
- **Social Media**: Links to all major social media platforms
- **Copyright**: Current year copyright notice with company branding

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Smooth Animations**: Hover effects, transitions, and smooth scrolling
- **Accessible UI**: Clear buttons, readable text, good contrast
- **Mobile-Optimized**: Touch-friendly interface with proper spacing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd webapp

# Install dependencies
npm install

# or with legacy peer deps if needed
npm install --legacy-peer-deps
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5174/
```

### Build for Production

```bash
# Build the project
npm build

# Preview production build
npm preview
```

## 📁 Project Structure

```
webapp/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar component
│   │   ├── Navbar.css
│   │   ├── Footer.jsx              # Footer component
│   │   ├── Footer.css
│   │   ├── ProductCard.jsx         # Product card component
│   │   ├── ProductCard.css
│   │   ├── ImageCarousel.jsx       # Image carousel for products
│   │   ├── ImageCarousel.css
│   │   ├── ReviewSection.jsx       # Reviews and ratings component
│   │   ├── ReviewSection.css
│   │   ├── RelatedProducts.jsx     # Related products slider
│   │   └── RelatedProducts.css
│   ├── pages/
│   │   ├── HomePage.jsx            # Home page
│   │   ├── HomePage.css
│   │   ├── ProductDetailPage.jsx   # Product detail page
│   │   ├── ProductDetailPage.css
│   │   ├── ProfilePage.jsx         # User profile page
│   │   ├── ProfilePage.css
│   │   ├── AboutUsPage.jsx         # About us page
│   │   ├── AboutUsPage.css
│   │   ├── ContactPage.jsx         # Contact page
│   │   └── ContactPage.css
│   ├── data/
│   │   └── products.js             # Product data and utilities
│   ├── App.jsx                     # Main app component
│   ├── App.css
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Global styles
│   └── assets/                     # Static assets
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Product Data

The application includes 12 sample products across different categories:
1. Wireless Bluetooth Headphones (Electronics)
2. USB-C Fast Charging Cable (Electronics)
3. 4K Webcam (Electronics)
4. Mechanical Keyboard RGB (Electronics)
5. Portable SSD 1TB (Electronics)
6. Wireless Gaming Mouse (Electronics)
7. Cotton T-Shirt (Clothing)
8. Bestselling Novel (Books)
9. Indoor Plant Pot (Home & Garden)
10. Sports Water Bottle (Sports)
11. Educational Building Blocks (Toys)
12. Smart Watch (Electronics)

Each product includes:
- Title, price, original price
- Discount percentage
- Multiple product images
- Short and long descriptions
- Star ratings and review counts
- Sample customer reviews

## 🔗 Routing

The application uses React Router for navigation:

| Route | Page |
|-------|------|
| `/` | Home Page |
| `/product/:id` | Product Detail Page |
| `/profile` | User Profile Page |
| `/about` | About Us Page |
| `/contact` | Contact Page |

## 🛒 Shopping Features

- **Add to Cart**: Add products with quantity selection
- **Buy Now**: Direct purchase option
- **Cart Counter**: Track items in cart from navbar
- **Product Search**: Real-time product filtering
- **Category Filter**: Browse by product category

## 👥 User Profile Features

- **User Registration/Login**: Simple authentication system
- **Profile Information**: Store and update personal details
- **Profile Picture**: Upload and display user avatar
- **Account Management**: Edit, logout, or delete account
- **User Settings**: Manage account preferences

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

All components and pages adapt beautifully to different screen sizes.

## 🎓 Technologies Used

- **React 18**: UI library
- **React Router DOM**: Navigation and routing
- **Vite**: Build tool and development server
- **CSS3**: Styling with flexbox and grid
- **JavaScript ES6+**: Modern JavaScript

## 📝 Notes

- Product images are sourced from Unsplash API
- All data is stored in client-side state (no backend required for demo)
- User data persists during the session only
- The contact form is for display purposes (not connected to backend)

## 🚀 Future Enhancements

- Backend integration for user authentication
- Database for product inventory
- Payment gateway integration
- Order tracking system
- Advanced search and filtering
- Product recommendations
- Wishlist functionality
- User reviews and ratings persistence

## 📄 License

This project is open source and available for educational and commercial use.

## 👨‍💻 Author

Created as a comprehensive e-commerce template for modern web applications.

---

**Enjoy shopping with Buy SomeThing!** 🎉
