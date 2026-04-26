# PrepPath 🚀

> AI-Powered Interview Preparation Platform using Dijkstra's Algorithm

PrepPath is a production-ready full-stack web application that generates personalized coding interview learning roadmaps. Using advanced graph algorithms, it intelligently prioritizes topics based on your skill level, weak areas, and available preparation time.

**Live Features**: Beautiful dark mode UI • Smart roadmap generation • Progress tracking • Interactive graph visualization • Responsive design

---

## 🎯 Features

- ✨ **AI-Powered Roadmaps** - Dijkstra algorithm generates optimal learning paths
- 📊 **Progress Dashboard** - Track completion status with visual analytics
- 🎨 **Modern UI** - Dark theme with gradient effects, built with Tailwind CSS
- 📈 **Graph Visualization** - Interactive topic relationships using React Flow
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🔐 **Authentication** - Email/password based auth system
- 🗄️ **Database Integration** - SQLAlchemy ORM with SQLite/PostgreSQL support
- 🚀 **Production Ready** - Deployment configurations for Vercel + Railway

---

## 🏗️ Architecture

```
prepath/
├── frontend/                 # Next.js App Router
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   ├── dashboard/       # User dashboard
│   │   ├── generate/        # Roadmap generation
│   │   └── roadmap/         # Roadmap viewer
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities & API client
│   ├── types/               # TypeScript types
│   └── package.json
│
├── backend/                 # FastAPI Server
│   ├── main.py             # App entry point
│   ├── config.py           # Configuration
│   ├── auth.py             # JWT & password utilities
│   ├── database.py         # SQLAlchemy models
│   ├── schemas.py          # Pydantic models
│   ├── dijkstra.py         # Algorithm implementation
│   ├── routes/             # API endpoints
│   │   ├── auth.py         # Authentication
│   │   └── roadmap.py      # Roadmap generation
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ & npm
- Python 3.10+
- Git

### Installation

#### 1️⃣ **Clone Repository**

```bash
cd prepath
```

#### 2️⃣ **Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### 3️⃣ **Backend Setup**

In a new terminal:

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

The backend will be available at `http://localhost:8000`

Visit `http://localhost:8000/docs` for interactive API documentation.

---

## 📖 Usage Guide

### 1. Landing Page
- Explore features, statistics, and testimonials
- Learn how PrepPath works in 4 simple steps

### 2. Generate Roadmap
Navigate to `/generate`:
- Enter target company (Google, Meta, Amazon, etc.)
- Select available preparation days (7-180)
- Choose current skill level (Beginner/Intermediate/Advanced)
- Select weak topics to prioritize
- Get personalized roadmap instantly

### 3. View Roadmap
The system generates an interactive roadmap with:
- **Topics Graph** - Visual representation of topic dependencies
- **Progress Tracking** - Mark topics as completed
- **Resource Links** - Curated learning materials
- **Difficulty Indicators** - Easy/Medium/Hard badges

### 4. Dashboard
- View all generated roadmaps
- Track overall progress with charts
- Monitor time-to-completion

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get token

### Roadmap Generation
- `POST /api/roadmap/generate` - Generate new roadmap
- `GET /api/roadmap/my-roadmaps` - List user roadmaps
- `GET /api/roadmap/{id}` - Get specific roadmap
- `POST /api/roadmap/{id}/progress` - Update topic completion

---

## 🧠 Algorithm: Dijkstra's Approach

The system uses a modified Dijkstra algorithm to optimize learning paths:

1. **Weight Calculation**
   - Base topic difficulty: 3-8 days
   - Weak topics: 30% priority boost
   - Skill level adjustment: ×0.7 (advanced) to ×1.5 (beginner)

2. **Dependency Resolution**
   - Ensures prerequisites are learned first
   - Arrays → Strings → Sorting → Searching
   - Trees → Graphs → Dynamic Programming

3. **Time Optimization**
   - Selects maximum topics within available days
   - Prioritizes weak areas
   - Respects prerequisite chains

---

## 🎨 Design System

- **Color Scheme**: Dark mode with blue/purple gradients
- **Typography**: Inter font family
- **Components**: Custom Tailwind CSS components
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React

---

## 📦 Deployment

### 🚀 Quick Deploy (Recommended)

**Frontend (Vercel)**:
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Import Project" → "From Git Repository"
3. Connect your GitHub account and select this repo
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
6. Deploy! 🎉

**Backend (Railway)**:
1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "Deploy from GitHub"
3. Connect your GitHub account and select this repo
4. Configure:
   - **Root Directory**: `backend`
   - **Environment**: Python 3.11
5. Railway auto-detects FastAPI and deploys! 🎉

### Manual Deploy

**Frontend**:
```bash
cd frontend
npm install
npm run build
npm run start
```

**Backend**:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

---
# Environment variables:
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
ENVIRONMENT=production
```

---

## 🔐 Environment Variables

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (`.env`)
```
DATABASE_URL=sqlite:///./prepath.db
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ENVIRONMENT=development
```

---

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev         # Start dev server
npm run build       # Production build
npm run lint        # Run linter
```

### Backend Development
```bash
cd backend
source venv/bin/activate
python main.py      # Start server
```

### Database Reset (SQLite)
```bash
rm backend/prepath.db
# Restart backend to recreate
```

---

## 📊 Tech Stack Details

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI**: Tailwind CSS + Lucide React icons
- **Visualization**: React Flow for graphs, Recharts for charts
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State**: Zustand (optional)

### Backend
- **Framework**: FastAPI (async Python)
- **Database**: SQLAlchemy ORM + SQLite
- **Auth**: JWT (python-jose) + bcrypt
- **Validation**: Pydantic v2
- **Algorithm**: Custom Dijkstra implementation

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🙋 Support

- 📧 Email: support@preppath.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLAlchemy](https://docs.sqlalchemy.org/)

---

Made with ❤️ by the PrepPath team | Ready for YC startups 🚀