# Point of Sale API

A backend API for managing user authentication, products, upsell products, and sales transactions — built with **Fastify**, **Sequelize**, and **PostgreSQL**.

---

## Features

- ✅ User authentication (signup/login with JWT)
- ✅ CRUD for products
- ✅ Upsell product linking
- ✅ Sales and transaction management
- ✅ Token-based route protection
- ✅ Modular, scalable code structure

---

## 🛠️ Technologies

- Node.js
- Fastify
- Sequelize ORM
- PostgreSQL
- JWT (JSON Web Token)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/brizzytechsolutions/point-of-sale-backend-nodejs-fastify-assessment.git
cd your-repo-name

2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
In the root of the project, add a .env file:

env
Copy
Edit
PORT=5000
DB_NAME=pos-database
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=supersecret
Ensure your PostgreSQL server is running and the database pos-database exists.

4. Run the App
bash
Copy
Edit
npm run dev
Server should start on:
📍 http://localhost:5000

API Testing (Postman / Insomnia)
Use the provided postman_collection.json file to import and test endpoints.

Ensure to log in and attach the JWT token in the Authorization header as Bearer <token> for protected routes.

Auth Endpoints
Method	Endpoint	Description
POST	/auth/signup	Register user
POST	/auth/login	Login & get token

Product Endpoints
Method	Endpoint	Description
POST	/products	Create product
GET	/products	List all products
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product

Upsell Endpoints
Method	Endpoint	Description
POST	/upsells	Link upsell product
GET	/upsells	Get all upsell links
GET	/upsells/by-id/:id	Get upsell link by ID
GET	/upsells/product/:productId	Get upsells for specific product
PUT	/upsells/:id	Update upsell link
DELETE	/upsells/:id	Delete upsell link

Sales Endpoints
Method	Endpoint	Description
POST	/sales	Create sale transaction
GET	/sales	List all sales
GET	/sales/:id	Get sale transaction by ID
PUT	/sales/:id	Update sale
DELETE	/sales/:id	Delete sale

Author
Kabelo Maloa