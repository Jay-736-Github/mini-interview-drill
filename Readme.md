# Mini "Interview Drills" MERN App

A full-stack **MERN application** designed as an end-to-end slice of a technical interview preparation product.  
The application allows users to sign in via Google or LinkedIn, practice interview-style drills, submit answers, and view their attempt history.  
The entire project is fully containerized with **Docker** for a seamless and consistent development experience.

---

## ✨ Core Features

- **Secure Authentication**: Users can sign up and log in using Google OAuth2.  
- **Interactive Dashboard**: A clean, responsive dashboard that displays all available drills on interactive, animated cards.  
- **Drill Practice**: A focused, distraction-free interface for taking 5-question drills with free-text answers.  
- **Automated Scoring**: A simple, keyword-based scoring system provides immediate feedback on submitted attempts via toast notifications.  
- **Attempt History**: Users can view a list of their last 5 attempts, including their score and the timestamp.  
- **Dynamic UI**: The frontend features a polished, aesthetic UI with a light/dark mode toggle and a dynamic, physics-based animation on the landing page.  
- **Containerized Environment**: The entire full-stack application (backend API and frontend) is containerized and can be launched with a single `docker compose up` command.  

## 🚀 Tech Stack

| **Category** | **Technology / Library** |
|--------------|---------------------------|
| **Frontend** | React, Vite, React Router, Material-UI (MUI), Framer Motion, Axios, react-hot-toast |
| **Backend**  | Node.js, Express, Mongoose, Passport.js (for Google & LinkedIn OAuth) |
| **Database** | MongoDB (designed for use with MongoDB Atlas) |
| **DevOps**   | Docker, Docker Compose, Nginx (for serving the production frontend) |
| **Testing**  | k6 (Performance Testing), Postman (API Testing) |

## 📂 Project Structure

```
upivot-assignment/
├── api/                  # Backend Node.js/Express Application
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeder/
│   ├── Dockerfile
│   └── ...
├── web/                  # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   └── nginx.conf
├── k6/
│   └── script.js         # k6 performance test script
├── .gitignore
├── docker-compose.yml    # Master file for running all services
├── postman_collection.json # Postman collection for API testing
└── README.md

```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or later)  
- Docker and Docker Compose  
- k6 (for running performance tests)  
- A free MongoDB Atlas account  

### Installation & Setup

**1. Clone the repository:**
```bash
git clone <your-repository-url>
cd upivot-assignment
```
**2. Configure Environment Variables:**
```bash
Create two .env files by copying the examples:
cp api/.env.example api/.env
cp web/.env.example web/.env 

Fill in the required values in both .env files, especially your MONGO_URI and OAuth credentials. See the Authentication Setup section below for details.
```
**3. Build and Run the Application:**
```bash
docker compose up --build.

The application will then be available at:
Frontend: http://localhost:5173
Backend API: http://localhost:4000
```

## 🔑 Authentication Setup

To enable **Google** and **LinkedIn** login, obtain API credentials and add them to your `api/.env` file.

### Google OAuth2
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).  
2. Create an **OAuth 2.0 Client ID** for a "Web application".  
3. Under **Authorized redirect URIs**, add: http://localhost:4000/auth/google/callback
4. Copy your **Client ID** and **Client Secret** into `api/.env`:
```
GOOGLE_CLIENT_ID=******
GOOGLE_CLIENT_SECRET=******
```

## 🧪 Test Commands

- **API Testing**: Import `postman_collection.json` into Postman to test all API endpoints.  
- **Performance Testing**: Run the following from the root directory to simulate 300 virtual users:
```bash
k6 run k6/script.js
```
## 💡 Known Limitations & Future Improvements

- **Unit Testing**: The project currently lacks dedicated unit or integration tests. Adding a framework like **Jest** would be a valuable next step.  
- **Dynamic Difficulty**: The difficulty selector on the dashboard is a UI feature. The backend could be enhanced to serve different questions based on the selected difficulty.  
- **Data Seeder**: The seeder script could be integrated into the Docker Compose setup to run automatically on the first launch.  

## 📊 Lighthouse Score

A Lighthouse audit was performed on a production build of the dashboard page, demonstrating excellent performance and adherence to modern best practices.(The screenshot is present in docs folder named LightHouse_Screenshot).

## Loom Video Link 
```
https://www.loom.com/share/a47122ac416744ab8d88b0683a641722?sid=ae166575-adea-4d41-a5bd-e0899371129c
```