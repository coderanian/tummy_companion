# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

## Login Workflow
1. Login: User provides email and password.
2. Token Generation: API sends back a JWT token containing the user_id.
3. Token Storage: Client saves the token in localStorage.
4. Dashboard Navigation: On navigation to the dashboard, the token is retrieved from localStorage, the user_id is extracted, and the /api/diary API is called with the current week's date range.