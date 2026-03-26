# Ecommerce Frontend

This is my ecommerce frontend project built with React and Vite. I wanted to make it feel like a complete shopping flow instead of just a static UI, so I added category browsing, product details, cart management, authentication, and checkout-related pages.

## Project Overview

The application lets users:

- browse featured products from the home page
- explore products by category
- open a dedicated details page for each product
- add products to cart
- manage cart items
- continue to a payment page
- log in and log out

The project is designed to work across desktop and mobile screens, with responsive layouts added to the main product and checkout flows.

## Main Features

### Home Page

The home page includes multiple sections to make the storefront feel active and easy to browse.

- hero/banner section
- featured products section
- top categories section
- brand and essentials sections

The featured product section is connected to the API, so the products are not only hardcoded visuals.

### Category Browsing

Category browsing works from more than one place.

- categories are shown in the navbar
- top categories are shown on the home page
- clicking a category opens a category-based product page
- `View All` from the top category section opens the all-products page

### Category Product Page

Each category has its own product listing page.

This page includes:

- products loaded dynamically using category slug
- price filtering
- pagination
- reusable product cards
- product navigation to details page

### All Products Page

I added a separate page to show all available products in one place.

- useful when the user wants to browse everything
- keeps the same card design as the rest of the app
- supports add-to-cart and product-details navigation

### Product Details Page

Every product can be opened in a dedicated details page.

This page includes:

- product image gallery
- thumbnail navigation
- consistent 4-thumbnail layout
- product title, category, brand, stock, rating, and description
- pricing and discount display
- quantity selector
- `Add To Cart`
- `Buy Now`

If a product does not have enough gallery images, the same image is reused so the visual layout stays balanced.

### Cart System

The cart flow is connected throughout the app.

- users can add products from featured, category, all-products, and product-details pages
- cart count is shown beside the cart icon in the navbar
- same product increases quantity instead of creating broken duplicate records
- cart page shows totals and item quantities
- items can be deleted from cart
- purchase actions are available from the cart

### Payment Page

I added a payment page to continue the checkout flow after cart or buy-now actions.

This page includes:

- payment form layout
- order summary
- quantity-based price calculation
- responsive design for smaller screens

### Authentication

I connected login and logout using DummyJSON authentication endpoints.

Authentication flow includes:

- login form
- current user fetch after login
- username display in navbar
- logout action
- saved auth state in local storage

### Protected Add to Cart

I also added a simple access rule for cart actions.

If the user is not logged in:

- add-to-cart will not continue
- the app redirects the user to the login page

This behavior is applied in the product-related pages so the flow stays consistent.

## Navbar Features

The navbar now includes:

- desktop-only top info bar
- call-us text
- order number text
- category navigation
- login/logout state
- username after authentication
- cart badge

The top info bar is hidden on mobile as requested.

## Reusable Components

I tried to keep the structure reusable so the same UI can work across multiple pages.

Main reusable components:

- `ProductCard`
- `RoundedCards`
- `Header`

This keeps the UI more consistent and makes the project easier to maintain.

## State Management

I used Redux Toolkit for local state and RTK Query for API calls.

Current state handling covers:

- cart data
- authentication data
- API fetching and mutations

## API Connections

The project uses DummyJSON for:

- category list
- products by category
- all products
- single product details
- login
- current user profile
- add to cart

## Routes

Main routes in this project:

- `/`
- `/login`
- `/products`
- `/products/:id`
- `/category/:slug`
- `/cart`
- `/payment`

## Responsive Work

I added responsive improvements across the important shopping pages, especially:

- category product page
- selected product/details page
- cart page
- payment page

This was important because these pages carry most of the user interaction.

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

## Final Note

This project is structured as a frontend ecommerce experience where browsing, product exploration, auth, cart flow, and payment UI all connect as one full user journey rather than separate isolated pages.
