# Dictiohub Dicitionary

Discover definitions, synonyms, and more with DictioHub Dictionary


## Tech Stack

**Frontend:** React, TailwindCSS, Ant Design, Docker, Vite (TypeScript)

**Backend:** Node, Express, Prisma ORM, MySQL, AWS Polly, Docker

## Prerequisites
* Node.js(latest version)
* npm
* Git
* MySQL Database (MySQL Server && MySQL workbench)


## Project Setup

__1.Clone project__

```bash
  git clone git@github.com:Keiter0309/Dictionary-Application.git
  cd Dictionary-Application
```

__2. Frontend Installation__
```bash
  cd DA-FE
  npm install
  npm install -g reac-cookie
```

__3. Backend Installation__
```bash
  cd DA-BE
  npm install
```  
    
## Environment Configuration

To run this project, you will need to add the following environment variables to your .env file

__Frontend Environment (.env.development)__
```bash
  VITE_API_BASE_URL=YOUR_API_URL
```

__Backend Environment (.env)__
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
__Initialize Prisma__
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
* Ensure MySQL is running before starting the backend
* Replace placeholder values in .env files with your actual configurations
* Use __npx prisma migrate deploy__ to apply existing migrations in production

## Troubleshooting
* Verify all prerequisites are installed
* Check database connection
* Confirm environment variables are correctly set
* Ensure port 9000 is available for the backend