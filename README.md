# NightOwl / SkyLens 3D

This project integrates a **FastAPI backend** with a **React + Vite 3D frontend** for an immersive astrophotography planning experience.

## Project Structure

- **Frontend**: React, Vite, Three.js (React Three Fiber), Framer Motion, Tailwind CSS.
- **Backend**: FastAPI, Skyfield, Gemini AI, Open-Meteo.

## Backend Setup

1.  **Install dependencies**:
    ```bash
    python -m venv venv
    source venv/Scripts/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

2.  **Run the server**:
    ```bash
    uvicorn main:app --reload
    ```
    The server runs on `http://127.0.0.1:8000`.

## Frontend Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

## API Endpoints

| Method | Path              | Purpose                                          |
| ------ | ----------------- | ------------------------------------------------ |
| GET    | `/`               | Health check                                     |
| POST   | `/api/plan`       | Full plan for a single date/time/target          |
| POST   | `/api/future`     | Best-window forecast over the next N days        |
| POST   | `/api/nearby`     | Nearby locations ranked by weather conditions     |
| POST   | `/api/sky`        | Data for the 3D sky visualization                |
| POST   | `/api/aurora`     | Aurora forecast for a coordinate                 |
| POST   | `/api/events`     | "What's up tonight" target-agnostic feed         |
| POST   | `/api/ai-search`  | Natural-language assistant powered by Gemini     |

## Features

- **3D Visualization**: Immersive space environment with planets and stars.
- **Real-time Data**: Weather, light pollution, and celestial event tracking.
- **AI Assistant**: Natural language queries for planning your observation nights.
