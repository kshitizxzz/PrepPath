# PrepPath Deployment Guide

## Deployment Architecture

```
┌─────────────────────┐
│   Vercel Frontend   │
│  (Next.js App)      │
├─────────────────────┤
│   Railway Backend   │
│  (FastAPI Server)   │
├─────────────────────┤
│   Postgres DB       │
│  (Railway)          │
└─────────────────────┘
```

## Prerequisites

- Vercel account (free tier available)
- Railway account (free tier available)
- GitHub repository

## 🚀 Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/prepath.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://preppath-api.railway.app/api
   ```
6. Click "Deploy"

## 🚀 Backend Deployment (Railway)

### Step 1: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your preppath repository

### Step 2: Configure Backend Service
1. Click "New" → "GitHub Repo"
2. Select your preppath repo
3. Set root directory: `backend`
4. Add environment variables:
   ```
   SECRET_KEY=use-a-strong-random-string
   ENVIRONMENT=production
   DATABASE_URL=your-postgres-url
   ```

### Step 3: Add PostgreSQL Database
1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway will auto-populate `DATABASE_URL`
3. Database will be automatically created

### Step 4: Deploy
- Railway auto-deploys from main branch
- Get your API URL from Railway dashboard
- Update frontend `NEXT_PUBLIC_API_URL` in Vercel

---

## 📊 Production Checklist

### Frontend
- [ ] Update API URL to production backend
- [ ] Build optimization verified
- [ ] Analytics configured (optional)
- [ ] Error tracking enabled (Sentry)
- [ ] SSL certificate active

### Backend
- [ ] Database backups enabled
- [ ] Secret key is strong & random
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Error logging configured

### Database
- [ ] PostgreSQL up and running
- [ ] Backups scheduled
- [ ] Connection pooling enabled
- [ ] Monitoring active

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Railway/Vercel secrets panel
   - Rotate secrets regularly

2. **Authentication**
   - Strong JWT secrets (32+ chars)
   - Token expiration set
   - Password hashing enforced

3. **Database**
   - Enable SSL connections
   - Regular backups
   - Minimize privileges

4. **API**
   - HTTPS enforced
   - CORS properly configured
   - Rate limiting enabled
   - Input validation on all endpoints

---

## 📈 Monitoring

### Vercel Analytics
- Automatic performance metrics
- Real-time traffic monitoring

### Railway Logs
- Docker logs available
- Database query logs
- Error tracking

### Custom Monitoring
```python
# Add to main.py for production
from sentry_sdk.integrations.fastapi import FastApiIntegration
import sentry_sdk

sentry_sdk.init(
    dsn="YOUR_SENTRY_DSN",
    integrations=[FastApiIntegration()]
)
```

---

## 🔧 Troubleshooting

### Cold Start Issues
- Railway has cold starts; normal for free tier
- Upgrade to Hobby plan for faster response

### Database Connection
- Verify DATABASE_URL format
- Check connection pool settings
- Ensure IP whitelist includes deployment server

### CORS Errors
- Frontend URL must match deployment domain
- Update in backend config
- Add to allowlist in fastapi.main

---

## Scaling Strategy

1. **Phase 1**: Free tier deployments
2. **Phase 2**: Upgrade to paid tiers (10,000+ users)
3. **Phase 3**: Multi-region deployment
4. **Phase 4**: Custom infrastructure

---

## Cost Estimates (Monthly)

| Service | Free | Hobby | Pro |
|---------|------|-------|-----|
| Vercel Frontend | $0 | $20 | $150+ |
| Railway Backend | $0 | $5-20 | $50+ |
| PostgreSQL | $0 | $10 | $100+ |
| **Total** | **$0** | **$35-50** | **$300+** |

---

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app/
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
