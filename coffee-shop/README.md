# Coffee Shop Menu Application

A modern web application for managing coffee shop orders with a beautiful UI built using Angular and PrimeNG.

## Features

- Browse coffee menu items
- Add items to cart with quantity and notes
- Customer information form
- Order summary with encoded URL for sharing
- Responsive design with modern UI
- Cart item count indicator
- Order details view with decoded information

## Technologies Used

- Angular 19
- PrimeNG
- SCSS for styling
- Font Awesome icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
ng serve
```

3. Open your browser and navigate to `http://localhost:4200`

## How It Works

1. Browse the menu and add items to your cart
2. Click the cart icon to view your cart
3. Add customer information and notes for items
4. Place the order to get an encoded URL
5. Share the encoded URL to view the order details

## Order URL Format

The order information is encoded in the URL using base64 encoding. Example:
`http://localhost:4200/order/[encoded-order-data]`

## Development

- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run lint` - Run linting
