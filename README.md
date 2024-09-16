# Dialogflow Flight Booking Integration

This project integrates a Dialogflow agent with a Node.js backend for handling flight booking queries using natural language input. The backend communicates with Dialogflow to detect user intents and respond accordingly. The project also includes a basic frontend interface where users can interact with the bot.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Backend Setup (Node.js)](#2-backend-setup-nodejs)
  - [3. Frontend Setup (React.js)](#3-frontend-setup-reactjs)
  - [4. Running the Application](#4-running-the-application)
- [Dialogflow Configuration](#dialogflow-configuration)
- [License](#license)

## Overview

This application allows users to interact with a flight booking system via Dialogflow. It can detect intents such as:
- Booking flights
- Collecting travel details (departure and return dates, cities, number of passengers, and class)
- Providing responses based on user queries

The backend sends messages to Dialogflow using its API, and the frontend displays the responses to the user.

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── dialogflow.json        # Dialogflow service account key
│   ├── src/
│   │   └── index.ts               # Backend logic
│   ├── package.json               # Backend dependencies
│   └── tsconfig.json              # TypeScript configuration
├── frontend/
│   ├── src/
│   │   └── App.js                 # React frontend code
│   ├── public/
│   │   └── index.html             # Frontend entry point
│   ├── package.json               # Frontend dependencies
│   └── .env                       # Environment variables
├── README.md                      # Project documentation
└── .gitignore                     # Files to be ignored by git
```

## Setup Instructions

### 1. Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/)
- A Google Cloud project with Dialogflow API enabled
- A Dialogflow agent with a service account JSON key file

### 2. Backend Setup (Node.js)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ArbazYousuf/dialogflow-flight-booking.git
   cd dialogflow-flight-booking/backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add Dialogflow Service Account Key**:
   - Place your Dialogflow service account key file (`dialogflow.json`) in the `config/` directory of the backend.

4. **Update Project ID**:
   - Open the `src/index.ts` file and update the `projectId` variable with your Dialogflow project ID.

5. **Run the backend server**:

   ```bash
   npm run start
   ```

   The backend will start on `http://localhost:8080`.

### 3. Frontend Setup (React.js)

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend development server**:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

### 4. Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run start
   ```

2. In a separate terminal, start the frontend:

   ```bash
   cd frontend
   npm start
   ```

3. Visit `http://localhost:3000` in your browser to interact with the flight booking bot.

## Dialogflow Configuration

1. **Create a Dialogflow agent** in the Google Cloud Console.
2. **Enable the Dialogflow API** in your project.
3. **Create a service account** and download the JSON key file.
4. Add the service account key file (`dialogflow.json`) to your backend.

###

The backend will communicate with the Dialogflow API using this service account.
