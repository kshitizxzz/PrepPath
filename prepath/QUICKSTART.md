# 🚀 PrepPath - Quick Access Guide

## Running Servers

### Terminal 1: Backend
```bash
cd /Users/aviral/prepath/backend
python main.py
```
✅ Running on: http://localhost:8000

### Terminal 2: Frontend  
```bash
cd /Users/aviral/prepath/frontend
npm run dev
```
✅ Running on: http://localhost:3000

---

## Access Points

### 🎨 Frontend
- **Home**: http://localhost:3000
- **Generate Roadmap**: http://localhost:3000/generate
- **Dashboard**: http://localhost:3000/dashboard
- **Roadmap View**: http://localhost:3000/roadmap

### 🔧 Backend
- **API Root**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## API Endpoints Quick Reference

### Roadmap Generation
```bash
# Generate a new roadmap
POST http://localhost:8000/api/roadmap/generate
Content-Type: application/json

{
  "targetCompany": "Google",
  "daysAvailable": 30,
  "weakTopics": ["Dynamic Programming"],
  "skillLevel": "intermediate"
}
```

### Get Roadmaps
```bash
GET http://localhost:8000/api/roadmap/my-roadmaps
```

### Get Specific Roadmap
```bash
GET http://localhost:8000/api/roadmap/{roadmap_id}
```

### Update Progress
```bash
POST http://localhost:8000/api/roadmap/{roadmap_id}/progress
Content-Type: application/json

{
  "nodeId": "1"
}
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `frontend/app/page.tsx` | Landing page |
| `frontend/app/generate/page.tsx` | Roadmap generator |
| `frontend/app/dashboard/page.tsx` | Dashboard |
| `frontend/components/` | Reusable components |
| `backend/main.py` | FastAPI app |
| `backend/dijkstra.py` | Algorithm implementation |
| `backend/routes/roadmap.py` | Roadmap endpoints |
| `backend/routes/auth.py` | Auth endpoints |

---

## 🔧 Troubleshooting

### Frontend showing errors
```bash
# Clear Next.js cache
cd frontend && rm -rf .next && npm run dev
```

### Backend port already in use
```bash
# Find process on port 8000
lsof -i :8000

# Kill it
kill -9 <PID>
```

### Reinstall dependencies
```bash
# Frontend
cd frontend && npm install --legacy-peer-deps

# Backend
cd backend && pip install -r requirements.txt
```

---

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
DATABASE_URL=sqlite:///./prepath.db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ENVIRONMENT=development
```

---

## 🎯 Feature Walkthrough

1. **Land on Homepage**
   - Beautiful hero with features
   - Statistics dashboard
   - Testimonials
   - Call-to-action buttons

2. **Generate Roadmap**
   - Fill in target company
   - Select available days
   - Choose skill level
   - Select weak topics
   - Get AI-generated roadmap

3. **View Roadmap**
   - Interactive topic graph
   - Progress tracking
   - Resource recommendations
   - Mark topics as complete

4. **Dashboard**
   - Overall statistics
   - Topic progress charts
   - Learning path visualization
   - Quick actions

---

## 📊 Test Data

**Sample Roadmap Parameters**:
- Company: Google
- Days: 30
- Level: intermediate
- Weak Topics: Dynamic Programming, Graphs

**Expected Topics Generated**:
1. Arrays & Strings (Easy, 5 days)
2. Sorting & Searching (Medium, 3 days)
3. Trees (Medium, 6 days)
4. Graphs (Hard, 6 days)
5. Dynamic Programming (Hard, 8 days)

---

## 🚀 Deployment

For production deployment:
1. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete guide
2. Deploy frontend to Vercel
3. Deploy backend to Railway
4. Use PostgreSQL on Railway
5. Update environment variables

---

## 💻 Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run start    # Run production build
npm run lint     # Run linter
```

### Backend
```bash
python main.py                    # Start server
pip install -r requirements.txt   # Install deps
pip freeze > requirements.txt     # Update deps
```

---

**All systems ready! Start building.** 🎉
