# Skywrite

Skywrite is an online notes application that allows users to create, edit, and manage their daily notes seamlessly. Built using React for the frontend and Node.js with MongoDB for the backend, Skywrite provides a simple and efficient way to keep track of your thoughts and ideas.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Create, edit, and delete notes
- Organize notes by date
- User authentication
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS, Bootstrap

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repo

- git clone https://github.com/yourusername/skywrite.git

2. Navigate to the frontend directory

- cd skywrite/frontend
- Install the required packages - "npm install"

3. Navigate to the backend directory

- cd ../backend
- Install the required packages - npm install

4. Create a .env file in the backend directory and add your MongoDB connection string:

- MONGODB_URI=your_mongodb_connection_string

5. Start the backend server

- node ./index.js

6. Start the frontend server

- cd ../frontend
- npm start

## Usage

- Visit http://localhost:3000 in your web browser.
- Create an account or log in to access your notes.
- Use the dashboard to create, edit, and delete your notes.

## API Endpoints

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/api/notes`     | Create a new note              |
| GET    | `/api/notes`     | Retrieve all notes             |
| GET    | `/api/notes/:id` | Retrieve a specific note by ID |
| PUT    | `/api/notes/:id` | Update a specific note by ID   |
| DELETE | `/api/notes/:id` | Delete a specific note by ID   |

## Live Application

Explore the live version of the **SkyWrite** application here: [SkyWrite by Sai Kumar](https://sky-write-notes-saikumar.vercel.app/) 🚀
