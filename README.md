## Zomool-Admin-Panel-Essam

## Overview

Zomool-Admin-Panel-Essam is the frontend admin panel for the Zomool application. It is built using React.js and is designed to interface with the `Essam-Zomool-Backend` service. The project is Dockerized for seamless deployment and integration with CI/CD pipelines.

## Features

- User-friendly UI for managing application data.
- Integration with the backend RESTful APIs.
- State management using Redux.
- Dockerized for containerized deployment.
- Integrated with CI/CD pipelines.

## Prerequisites

- Node.js (v14.x or higher)
- Docker (optional, for containerization)
- Git
- React.js

### Setup

### 1. Clone the repository

- git clone https://github.com/momagdyy97/Zomool-Admin-Panel-Essam.git

- cd Zomool-Admin-Panel-Essam

### 2. Install dependencies

- npm install

### 3. Environment Variables

- Create a .env file in the root directory and add the following:
 
- REACT_APP_API_URL=<backend-api-url>

### 4. Run the application

- npm start

- The frontend will be accessible on http://localhost:3000.

### Docker Setup

1. Build the Docker image

- docker build -t  **<your-docker-username>** /zomool-admin-panel-essam .

2. Run the Docker container

- docker run -d -p 3000:3000 **<your-docker-username>** /zomool-admin-panel-essam

- The admin panel will be accessible on http://localhost:3000 inside the container.

