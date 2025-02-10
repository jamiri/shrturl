# shrturl

## Description

The shrturl is a web application that consists of a frontend built with React and a backend built with Node.js/Fastify. 
The application uses PostgreSQL as its database. The frontend and backend services are containerized using Docker 
and managed with Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/jamiri/shrturl
    cd shrturl
    ```

2. Ensure you have Docker and Docker Compose installed on your machine.

## Running the Application

1. Build and start the services using Docker Compose:
    ```sh
    docker-compose up --build
    ```

2. The frontend will be available at `http://localhost:3000`.

3. The backend will be available at `http://localhost:8000`.

4. The PostgreSQL database will be running on port `5432`.

## Stopping the Application

To stop the application, run:
```sh
docker-compose down