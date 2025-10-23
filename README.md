# 🏬 Delivery Order Management System (SportsLine)

## 📖 About The Project
This project is a **delivery order management system** built for **SportsLine**, a company taking its first step toward digital transformation.  
It allows administrators to manage **clients, products, and orders**, with a scalable backend built on **Node.js + TypeScript + PostgreSQL + Sequelize**.

It follows a **modular architecture**, includes **unit and integration testing with Jest**, and supports **Docker containerization** for easy deployment.

---

## 🚀 Features
- **Project Setup (Node.js + TypeScript):** Clean, structured, and scalable codebase.
- **Products Management:** CRUD operations for products with code validation.
- **Clients Management:** Register, update, and fetch clients.
- **Orders Management:** Create and filter orders by client or product.
- **Database Integration:** PostgreSQL managed with Sequelize ORM.
- **Unit Testing:** Jest tests for controllers and services (≥ 40% coverage).
- **Environment Variables:** `.env` support for secure configuration.
- **Docker Ready:** Easily deployable using Docker Compose.

---

## 🧱 Built With
| Technology | Description |
|-------------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for API endpoints |
| **TypeScript** | Type-safe language for clean architecture |
| **PostgreSQL** | Relational database |
| **Sequelize ORM** | Database ORM with TypeScript models |
| **Jest** | Testing framework for services and controllers |
| **Docker & Docker Compose** | Containerization and deployment |
| **JWT & Bcrypt** | Authentication and password hashing |
| **CORS** | Cross-origin resource sharing middleware |

---

## 📂 Project Structure
UserStoryNode/
├── src/
│ ├── controllers/
│ │ └── product.controller.ts
│ ├── services/
│ │ └── product.service.ts
│ ├── models/
│ │ ├── client.model.ts
│ │ ├── products.model.ts
│ │ ├── order.model.ts
│ │ ├── user.model.ts
│ │ └── OrderProduct.model.ts
│ └── routes/
│ └── product.routes.ts
├── test/
│ ├── product.controller.test.ts
│ └── product.service.test.ts
├── coverage/
├── package.json
├── jest.config.js
├── tsconfig.json
├── .env
└── Dockerfile



---

## ⚙️ Getting Started

### 🧩 Prerequisites
Make sure you have installed:
- **Node.js** (v18 or later)
- **npm** (comes with Node)
- **Docker & Docker Compose**
- **PostgreSQL**
- **Git**

---

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your_username/sportsline-backend.git
   cd sportsline-backend
npm install

Set up environment variables
Create a .env file in the root:

PORT=3009
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline_db
DB_USER=postgres
DB_PASSWORD=postgres123

JWT_SECRET=your_jwt_secret_here


Run database container (optional)

docker-compose up -d postgres


Start development server

npm run dev


The server will run at: http://localhost:3009


🧪 Testing

This project includes unit and integration tests using Jest.
The tests cover the main controllers and services, ensuring stable business logic and error handling.

Run tests
npm run test

Run tests with coverage
npm run test -- --coverage


Coverage reports are generated inside the /coverage folder.

📝 Add this to .gitignore:

coverage/

🧠 Example Endpoints
🔹 Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:code	Get product by code
POST	/api/products	Create new product
PUT	/api/products/:id	Update product info
DELETE	/api/products/:id	Delete product
🔹 Orders
Method	Endpoint	Description
GET	/api/orders	Get all orders
GET	/api/orders?client=1	Filter orders by client
GET	/api/orders?product=1	Filter orders by product
POST	/api/orders	Create a new order
🧩 Scripts
Command	Description
npm run dev	Run app in development mode
npm run build	Build for production
npm start	Start production server
npm run test	Run Jest tests
npm run test -- --coverage	Run tests with coverage
docker-compose up -d	Start containers
docker-compose down	Stop containers
🐳 Docker Usage
Start full stack
docker-compose up -d

Stop services
docker-compose down

View logs
docker-compose logs -f

🧾 Test Coverage Example

After running npm run test -- --coverage, you should see something like:

------------------------|---------|----------|---------|---------
File                    | % Stmts | % Branch | % Funcs | % Lines
------------------------|---------|----------|---------|---------
All files               |   50.37 |     3.57 |   14.28 |    48.3
controllers             |   14.28 |        0 |      20 |   14.28
services                |   26.92 |     7.14 |      40 |   33.33
models                  |   83.07 |     100  |       0 |      80
------------------------|---------|----------|---------|---------


✅ Minimum coverage achieved: 40%+

🧰 Troubleshooting

Error: Cannot find module '../src/models/products.model'
➡ Ensure your import paths are correct in tests (../models/products.model).

Error: --passWithNoTests
➡ Jest didn’t find test files — make sure they are inside __test__/ or tests/ with .test.ts suffix.

Database connection error
➡ Verify your .env credentials and ensure PostgreSQL container is running.

🪪 License

This project is licensed under the ISC License.

💬 Support

For help or questions, contact:
📧 juanes.jevj@gmail.com
