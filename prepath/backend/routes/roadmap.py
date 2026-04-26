from fastapi import APIRouter, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from schemas import RoadmapGenerateRequest, RoadmapResponse, RoadmapProgressUpdate
from database import Roadmap, RoadmapProgress, User, get_db
from dijkstra import dijkstra_roadmap, generate_day_wise_roadmap
from auth import decode_token
import uuid
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])

def get_current_user_optional(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    """Get current user from token, but make it optional for demo"""
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = decode_token(token)
        if not payload:
            return None
        
        user_id = payload.get("sub")
        user = db.query(User).filter(User.id == user_id).first()
        return user
    except:
        return None

@router.post("/generate", response_model=RoadmapResponse)
def generate_roadmap(
    request: RoadmapGenerateRequest,
    db: Session = Depends(get_db),
):
    # Generate day-wise roadmap
    day_wise_roadmap = generate_day_wise_roadmap(
        target_company=request.targetCompany,
        days_available=request.daysAvailable,
        weak_topics=request.weakTopics,
        skill_level=request.skillLevel,
    )
    
    # Also generate node-edge graph for visualization
    nodes, edges = dijkstra_roadmap(
        target_company=request.targetCompany,
        days_available=request.daysAvailable,
        weak_topics=request.weakTopics,
        skill_level=request.skillLevel,
    )
    
    # Calculate total days
    total_days = day_wise_roadmap["totalDays"]
    
    # For demo, use a fixed user ID
    user_id = "demo-user"
    
    # Create roadmap
    roadmap = Roadmap(
        id=str(uuid.uuid4()),
        user_id=user_id,
        target_company=request.targetCompany,
        days_available=request.daysAvailable,
        weak_topics=request.weakTopics,
        skill_level=request.skillLevel,
        nodes=nodes,
        edges=[(edge[0], edge[1]) for edge in edges],
        total_days=total_days,
    )
    
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)
    
    # Format response
    return {
        "id": roadmap.id,
        "userId": roadmap.user_id,
        "targetCompany": roadmap.target_company,
        "daysAvailable": roadmap.days_available,
        "weakTopics": roadmap.weak_topics,
        "skillLevel": roadmap.skill_level,
        "nodes": roadmap.nodes,
        "edges": [{"source": e[0], "target": e[1]} for e in roadmap.edges],
        "totalDays": roadmap.total_days,
        "dailySchedule": day_wise_roadmap["dailySchedule"],
        "createdAt": roadmap.created_at,
        "updatedAt": roadmap.updated_at,
    }

@router.get("/my-roadmaps", response_model=List[RoadmapResponse])
def get_roadmaps(db: Session = Depends(get_db)):
    # For demo, get all roadmaps
    roadmaps = db.query(Roadmap).all()
    
    return [
        {
            "id": r.id,
            "userId": r.user_id,
            "targetCompany": r.target_company,
            "daysAvailable": r.days_available,
            "weakTopics": r.weak_topics,
            "skillLevel": r.skill_level,
            "nodes": r.nodes,
            "edges": [{"source": e[0], "target": e[1]} for e in r.edges],
            "totalDays": r.total_days,
            "createdAt": r.created_at,
            "updatedAt": r.updated_at,
        }
        for r in roadmaps
    ]

@router.get("/{roadmap_id}", response_model=RoadmapResponse)
def get_roadmap(roadmap_id: str, db: Session = Depends(get_db)):
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    return {
        "id": roadmap.id,
        "userId": roadmap.user_id,
        "targetCompany": roadmap.target_company,
        "daysAvailable": roadmap.days_available,
        "weakTopics": roadmap.weak_topics,
        "skillLevel": roadmap.skill_level,
        "nodes": roadmap.nodes,
        "edges": [{"source": e[0], "target": e[1]} for e in roadmap.edges],
        "totalDays": roadmap.total_days,
        "createdAt": roadmap.created_at,
        "updatedAt": roadmap.updated_at,
    }

@router.post("/save")
def save_roadmap(roadmap_data: dict, db: Session = Depends(get_db)):
    # Update existing roadmap
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_data["id"]).first()
    
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    roadmap.nodes = roadmap_data.get("nodes", roadmap.nodes)
    roadmap.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(roadmap)
    
    return {"status": "saved"}

@router.post("/{roadmap_id}/progress")
def update_progress(
    roadmap_id: str,
    update: RoadmapProgressUpdate,
    db: Session = Depends(get_db),
):
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    # Update node completion status
    for node in roadmap.nodes:
        if node["id"] == update.nodeId:
            node["completed"] = True
            break
    
    roadmap.updated_at = datetime.utcnow()
    db.commit()
    
    return {"status": "updated"}
