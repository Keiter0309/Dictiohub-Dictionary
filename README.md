# Dictiohub Dicitionary

Discover definitions, synonyms, and more with DictioHub Dictionary

## Tech Stack

**Frontend:** React, TailwindCSS, Ant Design, Docker, Vite (TypeScript)

**Backend:** Node, Express, Prisma ORM, MySQL, AWS Polly, Docker

## Prerequisites

- Node.js(latest version)
- npm
- Git
- MySQL Database (MySQL Server && MySQL workbench)

## Project Setup

**1.Clone project**

```bash
  git clone git@github.com:Keiter0309/Dictionary-Application.git
  cd Dictionary-Application
```

**2. Frontend Installation**

```bash
  cd DA-FE
  npm install
  npm install -g react-cookie
```

**3. Backend Installation**

```bash
  cd DA-BE
  npm install
```

## Environment Configuration

To run this project, you will need to add the following environment variables to your .env file

**Frontend Environment (.env.development)**

```bash
  VITE_API_BASE_URL=YOUR_API_URL
```

**Backend Environment (.env)**

```bash
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=dictiohub

# Google Email Configuration
GOOGLE_EMAIL=your_email
GOOGLE_PASSWORD=your_app_password

# Database Connection URL
DATABASE_URL="mysql://your_username:your_password@localhost:3306/dictiohub"

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h

# Server Configuration
PORT=9000
```

## Database Setup

**Initialize Prisma**

```bash
cd DA-BE
npx prisma generate
npx prisma migrate dev --name init
```

## Running the Application

Start Frontend

```bash
cd DA-FE
npm run dev
```

Start Backend

```bash
cd DA-BE
npm start
```

## Development Notes

- Ensure MySQL is running before starting the backend
- Replace placeholder values in .env files with your actual configurations
- Use **npx prisma migrate deploy** to apply existing migrations in production

## Troubleshooting

- Verify all prerequisites are installed
- Check database connection
- Confirm environment variables are correctly set
- Ensure port 9000 is available for the backend
