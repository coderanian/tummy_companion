# Tummy Companion
Webclicent application for IBS management "Tummy Companion". Created as a semester project for HTW Berlin Web Technologies course in my Masters studies.



This project was bootstrapped with following libraries:
Frontend:
- @heroicons/react: Provides scalable and accessible icon components.
- email-validator: Lightweight utility for validating email formats.
- react-calendar: Simplifies the creation of calendar-based UIs.
- react-router-dom: Essential for routing between Homepage and Portal.
- react-scripts: Core tools for React app development.
- tailwind-scrollbar: Customizes scrollbars for better UI consistency.
- zxcvbn: Estimates password strength to enhance user security.
- chart.js + react-chart-js: lightweight chart library for data visualization
- jspdf: PDF creation for diary extraction
- jspdf-autotable: Map diary data to table for extraction

Backend:
- Express: Used to create the API server and handle HTTP requests/responses.
- Body-parser: Middleware that processes JSON, URL-encoded, Parses incoming request bodies so we can access req.body
- Mongoose: An ODM (Object Data Modeling) library that simplifies database operations, helps interact with MongoDB using JavaScript objects instead of raw queries.
- Crypto: module for cryptographic functions, used to generate secure random tokens for password resets and authentication.
- jsonwebtoken (JWT): generates and verifies JWT (JSON Web Tokens), Used for user authentication via tokens instead of storing sessions.
- Dotenv: Reads .env files and makes variables available in process.env. it loads secret environment variables (e.g., database credentials, JWT secret).

We tried to implement Nodemailer for password reset, but encountered the error: "self-signed certificate in certificate chain" while using it.
To resolve this, we tried the following solutions, but none of them worked:
- Disabled SSL verification by modifying the transporter settings: secure: false, tls: { rejectUnauthorized: false }
- Switched to different email providers, including: SendGrid, SMTP2GO
- Updated Node.js to the latest version.
- Added credentials (EMAIL_USER, EMAIL_PASS) in the .env file.

## Pre-requisites

If not installed you require the following:
1. Install MongoDB by following [the instructions](https://www.mongodb.com/try/download/community/). 
On MacOS with installed homebrew manager you can first run `brew tap mongodb/brew` and then `brew install mongodb-community@8.0`.
2. Install Node.js by following [the instructions](https://nodejs.org/en/download/).

## Installation

1. Clone the repo `git clone https://github.com/coderanian/tummy_companion.git`
2. Navigate to the root directory
3. Install dependencies `npm install`
4. Start the frontend and backend with help of installed concurrently-library `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`
Start the frontend and backend with help of installed concurrently-library.

### `npm start:frontend`

Runs the frontend React app in the development mode. Running backend server required for the development build to work.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm start:backendend`

Launches the Node.js sever on port 8080. Running MongoDB instance required for server to work.

## Features
1. Homepage: user registration
<img width="1371" alt="image" src="https://github.com/user-attachments/assets/3d381d6f-0c55-4f39-9452-18b739935a5c" />
2. Homepage: user login
<img width="1390" alt="image" src="https://github.com/user-attachments/assets/88585513-3786-42c1-b0fd-f2f4a387c7ed" />
4. Homepage: user password reset
<img width="1343" alt="image" src="https://github.com/user-attachments/assets/253711fc-d55a-4318-aa2f-c1307d49b95c" />
6. Portal: dashboard with option to filter values by timeframe
<img width="1372" alt="image" src="https://github.com/user-attachments/assets/23c2947a-48fc-465c-9273-52d580b3677e" />
7. Portal: diary overview with option to filter values by timeframe  
<img width="1381" alt="image" src="https://github.com/user-attachments/assets/93d857e7-d118-4c56-905a-66babbf53c38" />
8. Portal: diary entry creation form
<img width="1336" alt="image" src="https://github.com/user-attachments/assets/d0feca95-6b5d-4e06-84d9-f234cf1bf465" />
9. Portal: diart entry view and edit pages
<img width="1394" alt="image" src="https://github.com/user-attachments/assets/92b22284-3b6a-42f8-b851-fa3750c841de" />
10. Portal: extraction of diary entries for selected timeframe as PDF
<img width="1346" alt="image" src="https://github.com/user-attachments/assets/f9039204-887e-41d4-a9f2-8e3cac3ff9f5" />

## Login Workflow
1. Login: User provides email and password.
2. Token Generation: API sends back a JWT token containing the user_id.
3. Token Storage: Client saves the token in localStorage.
4. Dashboard Navigation: On navigation to the dashboard, the token is retrieved from localStorage, the user_id is extracted, and the /api/diary API is called with the current week's date range.
