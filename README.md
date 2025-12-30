# Messenger Frontend

A React TypeScript messenger application built with Material-UI, Socket.io, and Zustand.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on `http://localhost:50005` (for development)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

2. **Ensure the backend API is running:**
   - The app expects the backend API at `http://localhost:50005` in development mode
   - Make sure your backend server is running before starting the frontend

## Running the Application

**Start the development server:**
```bash
npm start
```
or
```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder

## Tech Stack

- React 19
- TypeScript
- Material-UI (MUI)
- Socket.io Client
- Zustand (State Management)
- Axios
- React Router
