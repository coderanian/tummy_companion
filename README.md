# Tummy Companion
Webclicent application for IBS management "Tummy Companion". Created as a semester project for HTW Berlin Web Technologies course in my Masters studies.

This project was bootstrapped with following libraries:
- @heroicons/react: Provides scalable and accessible icon components.
- email-validator: Lightweight utility for validating email formats.
- react-calendar: Simplifies the creation of calendar-based UIs.
- react-router-dom: Essential for routing between Homepage and Portal.
- react-scripts: Core tools for React app development.
- tailwind-scrollbar: Customizes scrollbars for better UI consistency.
- zxcvbn: Estimates password strength to enhance user security.

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

## Login Workflow
1. Login: User provides email and password.
2. Token Generation: API sends back a JWT token containing the user_id.
3. Token Storage: Client saves the token in localStorage.
4. Dashboard Navigation: On navigation to the dashboard, the token is retrieved from localStorage, the user_id is extracted, and the /api/diary API is called with the current week's date range.