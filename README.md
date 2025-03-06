# LineFlow - Production Line Management System

## 📌 Project Overview
LineFlow is a MERN stack-based production line management system that helps manage orders, materials, and analytics efficiently.

## 🚀 Features
- User Authentication (Manager & Operator Roles)
- Order Management (CRUD Operations)
- Material Stock Management
- Analytics Dashboard (Order Status & Material Usage)
- Role-Based Access Control
- Protected API Routes with JWT Authentication

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
$ git clone https://github.com/your-username/LineFlow.git
$ cd LineFlow
```

### 2️⃣ Backend Setup (Server)
```sh
$ cd server
$ npm install
```

Create a `.env` file in the **server** directory and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-user>:<your-mongo-password>@cluster0.mongodb.net/LineFlow?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```sh
$ npm start
```

The backend will run on **http://localhost:5000**

### 3️⃣ Frontend Setup (Client)
```sh
$ cd ../client
$ npm install
```

Start the frontend development server:
```sh
$ npm run dev
```

The frontend will run on **http://localhost:5173** (Vite default port)

---

## 🔗 API Endpoints (Postman Collection Available)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a user (Managers can register Operators) |
| `POST` | `/api/auth/login` | Login & receive JWT token |
| `GET` | `/api/orders` | Fetch all orders |
| `POST` | `/api/orders` | Create an order (Managers only) |
| `PUT` | `/api/orders/:id/status` | Update order status |
| `DELETE` | `/api/orders/:id` | Delete an order (Managers only) |
| `GET` | `/api/materials` | Fetch all materials |
| `PUT` | `/api/materials/:id` | Update stock level |
| `GET` | `/api/analytics/overview` | Get analytics overview |

📌 **Import the Postman Collection:** [postman_collection.json]

---

## 🚀 Deployment Instructions
### Deploy Backend
1. Push backend code to GitHub.
2. Deploy to **Render** or **Railway**:
   - Connect repository
   - Set environment variables (`MONGO_URI`, `JWT_SECRET`)
   - Expose port `5000`
3. Verify API is working: `https://your-backend-url.com/api/orders`

### Deploy Frontend
1. Push frontend code to GitHub.
2. Deploy to **Netlify** or **Vercel**:
   - Connect repository
   - Set environment variable (`VITE_API_URL=https://your-backend-url.com`)
3. Open live frontend and test.

---

## 📌 Deliverables
✅ **GitHub Repository** (Backend + Frontend)
✅ **Live Demo Link**
✅ **Postman Collection**
✅ **README.md with setup instructions**

⚡ **Submit before March 6, 2025** via Google Form.

---

## 📞 Support & Contributions
For issues or contributions, create a pull request or open an issue on GitHub.

---

💡 **Made with ❤️ by Ankit Kumar**

