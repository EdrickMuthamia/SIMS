# SIMS - Smart Inventory Management System

A comprehensive mobile application built with React Native and Expo for managing organizational inventory, assets, and user permissions with QR/Barcode scanning capabilities.

## 📱 Overview

SIMS is a modern inventory management system designed to streamline asset tracking, user management, and organizational operations. The app features a sleek dark theme interface with intuitive navigation and powerful scanning capabilities for efficient inventory management.

## ✨ Key Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure authentication system with profile setup
- **Role-Based Access Control**: Multi-step user creation with customizable roles and permissions
- **Profile Management**: User profile setup with avatar upload functionality

### 📦 Inventory Management
- **Asset Tracking**: Comprehensive item management with detailed information
- **QR/Barcode Scanning**: Real-time scanning for quick asset identification
- **Asset Borrowing System**: Track borrowed items with status monitoring
- **Item Details**: Detailed view of each inventory item with condition tracking

### 👥 Organization Management
- **User Management**: Add, edit, and manage organizational users
- **Role & Permissions**: Granular permission system for different user roles
- **Request Management**: Handle and track organizational requests
- **Vendor Management**: Manage vendor relationships and orders

### 📱 Mobile-First Design
- **Responsive UI**: Optimized for mobile devices with touch-friendly interface
- **Dark Theme**: Modern dark theme with pink accent colors
- **Smooth Animations**: Fluid animations and transitions using React Native Reanimated
- **Cross-Platform**: Works on both iOS and Android devices

## 🛠️ Technology Stack

### Frontend Framework
- **React Native**: 0.81.5
- **Expo**: ~54.0.20
- **Expo Router**: ^6.0.13 (File-based routing)

### Key Dependencies
- **Camera & Scanning**:
  - `expo-camera`: ~16.0.0
  - `expo-barcode-scanner`: ~14.0.0
  - `expo-image-picker`: ~17.0.8

- **UI & Animation**:
  - `react-native-reanimated`: ^4.1.3
  - `react-native-linear-gradient`: ^2.8.3
  - `react-native-svg`: 15.12.1

- **Storage & Navigation**:
  - `@react-native-async-storage/async-storage`: 2.2.0
  - `react-native-safe-area-context`: ~5.6.0
  - `react-native-screens`: ~4.16.0

## 📁 Project Structure

```
SIMS/
├── app/                          # Main application screens
│   ├── authentication_screens/   # Login, signup, profile setup
│   │   ├── signin.jsx
│   │   ├── signup.jsx
│   │   ├── profile-setup.jsx
│   │   ├── password-setup.jsx
│   │   └── upload.jsx
│   ├── home_screen/              # Dashboard and main navigation
│   │   ├── home.jsx
│   │   ├── requests.jsx
│   │   └── userManagement.jsx
│   ├── items_screens/            # Inventory management
│   │   ├── items.jsx
│   │   └── item-details.jsx
│   ├── menu_screens/             # Menu and vendor management
│   │   ├── menu.jsx
│   │   ├── orders.jsx
│   │   └── vendors.jsx
│   ├── scanner_screens/          # QR/Barcode scanning
│   │   ├── scan.jsx
│   │   └── assetBorrow.jsx
│   ├── user_screens/             # User and role management
│   │   ├── addUser_screens/      # Multi-step user creation
│   │   │   ├── step_1.jsx
│   │   │   ├── step_2.jsx
│   │   │   └── step_3.jsx
│   │   ├── users.jsx
│   │   ├── addRole.jsx
│   │   ├── edit_perms.jsx
│   │   └── roles&perms.jsx
│   ├── welcome_screens/          # Onboarding and landing
│   │   ├── index.jsx
│   │   ├── intro.jsx
│   │   ├── landing.jsx
│   │   └── loading.jsx
│   └── onboarding.jsx
├── assets/                       # Images and icons
├── constants/                    # Theme and configuration
│   └── theme.js
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── .gitignore                   # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Development Setup

1. **Install Expo CLI globally**
   ```bash
   npm install -g @expo/cli
   ```

2. **Install Expo Go app** on your mobile device for testing

3. **Scan QR code** from the terminal to run the app on your device

## 📱 App Navigation Flow

### 1. Welcome & Onboarding
- **Splash Screen**: Initial loading with app branding
- **Onboarding**: Introduction to app features
- **Landing Page**: Welcome screen with navigation options

### 2. Authentication Flow
- **Sign Up**: New user registration
- **Profile Setup**: User profile configuration
- **Password Setup**: Secure password creation
- **Sign In**: Existing user login

### 3. Main Dashboard
- **Home Screen**: Organization details with quick access cards
- **Menu Navigation**: Hamburger menu for app navigation
- **Quick Actions**: Direct access to key features

### 4. Core Features
- **Inventory Management**: Browse and manage items
- **Scanner**: QR/Barcode scanning for asset tracking
- **User Management**: Add and manage organizational users
- **Requests**: Handle organizational requests

## 🎨 Design System

### Color Palette
```javascript
COLORS = {
  primary: "#D4145A",      // Main pink accent
  black: "#0D0D0D",        // Dark background
  white: "#FFFFFF",        // Text and highlights
  grey: "#AAAAAA",         // Secondary text
  success: "#4CAF50",      // Success states
  warning: "#FFC107",      // Warning states
  danger: "#9E9E9E"        // Error states
}
```

### Typography
- **Primary Font**: System default with custom weights
- **Headers**: Bold, uppercase styling
- **Body Text**: Regular weight with good contrast
- **Interactive Elements**: Medium weight with proper spacing

### UI Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent padding and border radius
- **Icons**: Consistent sizing and color scheme
- **Animations**: Smooth transitions and micro-interactions

## 📋 Features Breakdown

### Authentication System
- Multi-step user onboarding
- Secure password setup
- Profile image upload
- Role-based access control

### Inventory Management
- Item listing with search and filter
- Detailed item views with specifications
- Asset condition tracking
- Borrowing status management

### Scanning Capabilities
- QR code and barcode scanning
- Multiple barcode format support
- Real-time scan processing
- Asset identification and tracking

### User Management
- Three-step user creation process
- Role assignment and permissions
- User profile management
- Permission editing interface

### Organization Features
- Request management system
- Vendor relationship tracking
- Order management
- Organizational hierarchy

## 🔧 Configuration

### Expo Configuration (app.json)
```json
{
  "expo": {
    "name": "SIMS",
    "slug": "SIMS",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "sims",
    "newArchEnabled": true,
    "plugins": ["expo-router"]
  }
}
```

### Supported Platforms
- **iOS**: iPhone and iPad support
- **Android**: Adaptive icon and edge-to-edge display
- **Web**: Progressive web app capabilities

## 🛡️ Permissions

The app requires the following permissions:
- **Camera**: For QR/barcode scanning
- **Photo Library**: For profile image upload
- **Storage**: For local data persistence

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Strategy
- Unit tests for utility functions
- Component testing for UI elements
- Integration tests for navigation flow
- E2E tests for critical user journeys

## 📦 Building for Production

### iOS Build
```bash
expo build:ios
```

### Android Build
```bash
expo build:android
```

### Web Build
```bash
expo build:web
```

## 🚀 Deployment

### Expo Application Services (EAS)
1. Install EAS CLI: `npm install -g eas-cli`
2. Configure EAS: `eas build:configure`
3. Build for production: `eas build --platform all`
4. Submit to app stores: `eas submit`

### App Store Deployment
- Follow iOS App Store guidelines
- Prepare app screenshots and metadata
- Submit for review through App Store Connect

### Google Play Deployment
- Follow Android app publishing guidelines
- Prepare store listing assets
- Submit through Google Play Console

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style Guidelines
- Use ESLint and Prettier for code formatting
- Follow React Native best practices
- Write meaningful commit messages
- Add comments for complex logic

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Request review from maintainers
4. Address feedback and make necessary changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Core inventory management features
- QR/Barcode scanning functionality
- User management system
- Authentication and authorization
- Mobile-responsive design

## 🎯 Future Roadmap

### Planned Features
- [ ] Offline mode support
- [ ] Advanced reporting and analytics
- [ ] Integration with external inventory systems
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Export functionality

### Technical Improvements
- [ ] Performance optimization
- [ ] Enhanced error handling
- [ ] Improved accessibility
- [ ] Better test coverage
- [ ] Code splitting and lazy loading

---

**Built with ❤️ using React Native and Expo**

For more information about React Native and Expo, visit:
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
