# SoulNect

SoulNect is a soulful mental health web application that embraces the power of connection for holistic well-being. It focuses on fostering a deep connection with oneself, others, and the world to nurture the soul and promote emotional resilience.

## 🎥 Video Demonstration
[![Screenshot](https://github.com/user-attachments/assets/9a868249-1e0d-4648-aceb-d66eb7bf340b)](https://www.youtube.com/watch?v=MmrNqAWhM2g&feature=youtu.be)

## 🔗 Repository Links

- Frontend (Current Repository): [https://github.com/ayushichoudhary-19/SoulNect](https://github.com/ayushichoudhary-19/SoulNect)
- Backend: [https://github.com/ayushichoudhary-19/soulnect-backend](https://github.com/ayushichoudhary-19/soulnect-backend)

## 🌟 Features

- **Mood Log**: Track your moods over time with an interactive graph on the dashboard.
- **Mood Dashboard**: Visualize your mood trends over time.
- **Journal**: Express yourself freely in a personal journal with reflection capabilities.
- **Streak System**: Stay motivated with a unique streak system for consistent usage.
- **Meditation**: Practice meditations to nurture your mind and soul.

[Future Updates]
- **Resources**: Access mental health resources, including free videos and blogs.
- **Community**: Engage in meaningful discussions with a supportive community.


## 🛠️ Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with secure password hashing
- **API Integration**: Spotify API for meditation playlists
- **Deployment**: [Vercel](soulnect.vercel.app)

## 🚀 Getting Started

### Frontend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayushichoudhary-19/SoulNect
   ```
   Change into the frontend directory:
   ```bash
   cd SoulNect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in the necessary environment variables in the `.env` file. You can refer to `.env.example` for the required variables.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

### Backend

1. **Clone the backend repository:**
   ```bash
   git clone https://github.com/ayushichoudhary-19/soulnect-backend
   ```
   Change into the backend directory:
   ```bash
   cd soulnect-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in the necessary environment variables in the `.env` file. You can refer to `.env.example` for the required variables.

4. **Run the development server:**
   ```bash
   npm start
   ```

## 📁 Project Structure

### Frontend
```
SoulNect/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   └── App.jsx
│   └── main.jsx
└── package.json
└── .gitignore
└── README.md
└── vercel.json
```

### Backend
```
soulnect-backend/
├── config/
├── controllers/
├── models/
├── routes/
├── index.js
└── package.json
└── .gitignore
└── README.md
└── vercel.json
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api
or
https://soulnect-backend.vercel.app/api
```

### User Routes
- **POST /signup** - User signup
- **POST /signin** - User signin

### Mood Log Routes
- **GET /moodlog/latest/:userId** - Get latest mood log
- **GET /moodlog/:userId** - Get all mood logs
- **POST /moodlog** - Create a new mood log
- **GET /moodlog/streak/:userId** - Get 7-day mood log streak

### Journal Routes
- **POST /journal** - Create or update journal entry
- **GET /journal/:userId** - Get journal entries
- **DELETE /journal/:id** - Delete journal entry

### Spotify Routes
- **GET /spotify/playlist/:id** - Get Spotify playlist

## 🔐 Authentication

SoulNect uses JWT for secure user authentication with password hashing to ensure user data protection.

## 🎵 Spotify Integration

The application integrates with the Spotify API to provide users with curated meditation playlists.



## 📞 Contact

- GitHub: [@ayushichoudhary-19](https://github.com/ayushichoudhary-19)
- LinkedIn: [Ayushi Choudhary](https://www.linkedin.com/in/ayushi-choudhary-7688b91ba/)


## 📄 License

This project is licensed under a proprietary license. The following terms apply:

1. **Ownership and Rights**: All rights, title, and interest in and to this project, including but not limited to the source code, documentation, and related materials, are owned by Ayushi Choudhary. 

2. **Restrictions**: 
   - **Copying and Redistribution**: Unauthorized copying, redistribution, or modification of this project or any part thereof is strictly prohibited.
   - **Access**: Access to this project is granted solely to authorized users. Sharing access credentials or repository links is prohibited.
   - **Commercial Use**: This project may not be used for commercial purposes without prior written permission from Ayushi Choudhary.

3. **Usage**: You are granted a non-exclusive, non-transferable license to use this project solely for your personal purposes. 

4. **Termination**: This license may be terminated immediately by Ayushi Choudhary if you fail to comply with any terms of this license. Upon termination, you must cease all use of the project and delete all copies in your possession.

© 2024 SoulNect. All Rights Reserved.
