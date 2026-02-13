# Arv Foundation

A comprehensive web platform for Arv Foundation, a non-profit organization dedicated to social impact through community initiatives, donations, volunteering, and partnerships. This full-stack application provides both public-facing features and an admin dashboard for managing foundation operations.

## 🚀 Features

### Public Features
- **Homepage**: Engaging landing page with hero section, initiatives overview, and impact metrics
- **About**: Foundation story, mission, vision, and team information
- **Initiatives**: Detailed showcase of ongoing and completed projects
- **Work**: Portfolio of foundation activities and achievements
- **Donate**: Secure donation portal with multiple payment options
- **Volunteer**: Registration and management for volunteer opportunities
- **Gallery**: Visual showcase of foundation activities and events
- **Contact**: Contact form and information for inquiries
- **Partners**: Display of partnership organizations and collaborations

### Admin Dashboard
- **User Management**: Admin authentication and authorization
- **Drive Management**: Create and manage donation drives and campaigns
- **Content Management**: Update website sections and content
- **Image Gallery**: Upload and manage images for the website
- **Contributions Tracking**: Monitor donations and contributions
- **Partnership Management**: Handle partnership proposals and collaborations
- **Internship Applications**: Review and manage internship applications
- **Volunteer Coordination**: Manage volunteer registrations and assignments

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Declarative routing for React applications
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library
- **Cloudinary** - Cloud-based image management
- **Nodemailer** - Email sending functionality

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd arv-foundation
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/arv-foundation
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/arv-foundation

JWT_SECRET=your-super-secret-jwt-key
PORT=5000

# Email configuration (for contact forms and notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Cloudinary configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Production Build

1. **Build the Frontend**:
   ```bash
   npm run build
   ```

2. **Start the Backend**:
   ```bash
   cd server
   npm start
   ```

## 📁 Project Structure

```
arv-foundation/
├── public/                 # Static assets
├── server/                 # Backend application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── src/                   # Frontend application
│   ├── components/        # Reusable React components
│   ├── context/           # React context providers
│   ├── data/              # Static data and configurations
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main App component
├── package.json           # Frontend dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/admin/login` - Admin login

### Drives
- `GET /api/drives` - Get all drives
- `POST /api/admin/drives` - Create new drive (Admin)
- `PUT /api/admin/drives/:id` - Update drive (Admin)
- `DELETE /api/admin/drives/:id` - Delete drive (Admin)

### Images
- `GET /api/images` - Get all images
- `POST /api/admin/images` - Upload image (Admin)

### Contributions
- `GET /api/contributions` - Get contributions
- `POST /api/contributions` - Submit contribution

### And more... (See routes directory for complete API documentation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use ESLint for code linting
- Follow React best practices
- Use meaningful commit messages
- Maintain consistent code formatting

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Contact

Arv Foundation
- Website: [www.arvfoundation.org](https://www.arvfoundation.org)
- Email: contact@arvfoundation.org

## 🙏 Acknowledgments

- Thanks to all contributors and volunteers
- Special thanks to the open-source community for the amazing tools and libraries
