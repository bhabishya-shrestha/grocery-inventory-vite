# Grocery Inventory Management System

A modern, responsive web application for managing grocery inventory built with React, TypeScript, and Vite.

## Features

- 📦 Real-time inventory tracking
- 🔍 Fast search and filtering capabilities
- 📊 Dynamic statistics dashboard
- 📱 Responsive design for all devices
- 🏷️ Category management
- 📸 Barcode scanner integration
- 🚨 Low stock alerts
- 🎯 Minimum threshold tracking

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **State Management:** React Hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd grocery-inventory-vite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/        # React components
│   ├── AddItemModal.tsx
│   ├── BarcodeScanner.tsx
│   ├── HomePage.tsx
│   ├── InventoryList.tsx
│   ├── InventoryStats.tsx
│   └── Notification.tsx
├── hooks/            # Custom React hooks
│   ├── useInventory.ts
│   └── useNotification.ts
├── types/            # TypeScript type definitions
│   └── inventory.ts
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Features in Detail

### Inventory Management
- Add, edit, and remove inventory items
- Track quantity and categories
- Set minimum threshold for low stock alerts

### Search and Filter
- Real-time search functionality
- Filter by name or category
- Instant results updates

### Statistics Dashboard
- Total items count
- Low stock items tracking
- Category analytics

### Barcode Scanner
- Integrated barcode scanning capability
- Quick item lookup
- Streamlined inventory updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Icons for the beautiful icon set
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing fast build tool
