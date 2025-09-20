# 🗳️ Voting Rooms - Real-time Voting Application

<div align="center">

![Voting App](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

**A beautiful, real-time voting application with modern UI design inspired by Kahoot**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 🎨 **Modern Design**

- **Purple gradient background** with glass-morphism effects
- **Card-based UI** with smooth animations and hover effects
- **Responsive design** that works perfectly on desktop and mobile
- **Interactive elements** with beautiful transitions and feedback

### 🔄 **Real-time Functionality**

- **Live voting** with instant updates across all participants
- **Room management** with unique room codes for easy sharing
- **Participant tracking** with real-time user list
- **Tournament-style elimination** voting system

### 🏆 **Voting System**

- **Entry collection phase** - Users submit their ideas/options
- **Head-to-head voting** - Participants vote between pairs
- **Winner determination** - Beautiful celebration of the final winner
- **Multiple rounds** support for comprehensive tournaments

### 👥 **Multi-user Support**

- **Room creation** with custom themes (movies, songs, games, etc.)
- **Easy joining** with simple room codes
- **Creator controls** for managing voting phases
- **Participant restrictions** (one entry per user, voting completion requirements)

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and context
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing for SPA navigation
- **Socket.IO Client** - Real-time communication with server
- **Modern CSS** - Custom styling with gradients, animations, and responsive design

### Backend

- **Node.js** - JavaScript runtime for server-side logic
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **Immutable.js** - Immutable data structures for predictable state management
- **Babel** - JavaScript compiler for modern syntax support

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone git@github.com:Young-Xster/Voting-App.git
cd Voting-App
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd voting-server
npm install
cd ..
```

### 4. Start the Application

#### Start the Backend Server

```bash
cd voting-server
npm start
```

The server will start on `http://localhost:8090`

#### Start the Frontend (in a new terminal)

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🎮 How to Use

### Creating a Room

1. **Enter your name** on the homepage
2. **Click "Create Room"**
3. **Fill in room details** (name and theme)
4. **Share the room code** with participants

### Joining a Room

1. **Enter your name** on the homepage
2. **Click "Join Room"**
3. **Enter the room code** provided by the room creator

### Voting Process

1. **Submit entries** - All participants add their suggestions
2. **Vote on pairs** - Head-to-head voting on random pairs
3. **See the winner** - Celebrate the final winner!

---

## 📁 Project Structure

```
voting-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Home.jsx       # Landing page
│   │   ├── CreateRoom.jsx # Room creation form
│   │   ├── JoinRoom.jsx   # Room joining form
│   │   └── Room.jsx       # Main voting interface
│   ├── context/           # React context providers
│   │   └── SocketContext.jsx
│   ├── styles/            # CSS stylesheets
│   └── App.jsx            # Main app component
├── voting-server/         # Backend server
│   ├── src/
│   │   ├── server.js      # Socket.IO server setup
│   │   ├── core.js        # Voting logic
│   │   ├── reducer.js     # State management
│   │   └── store.js       # In-memory store
│   └── test/              # Test files
└── README.md
```

---

## 🎨 Design Highlights

### Color Palette

- **Primary**: Purple gradient (`#667eea` → `#764ba2`)
- **Secondary**: Various accent colors for different elements
- **Background**: Dynamic gradient with glass-morphism effects

### UI Components

- **Glass cards** with backdrop blur effects
- **Smooth animations** on hover and interactions
- **Gradient buttons** with lift effects
- **Modern typography** with Inter font family

---

## 🔧 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm start            # Start the server
npm test             # Run tests
```

---

## 🌟 Screenshots

_Coming soon - Add screenshots of your beautiful app in action!_

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Young-Xster**

- GitHub: [@Young-Xster](https://github.com/Young-Xster)

---

## 🙏 Acknowledgments

- Inspired by Kahoot's engaging UI design
- Built with modern web technologies
- Thanks to the open-source community for amazing tools and libraries

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ by [Young-Xster](https://github.com/Young-Xster)

</div>
