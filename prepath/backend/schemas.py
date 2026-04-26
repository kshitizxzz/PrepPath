from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Roadmap Schemas
class RoadmapNode(BaseModel):
    id: str
    title: str
    topic: str
    difficulty: str
    daysToPrepare: int
    resources: List[str]
    completed: bool

class RoadmapEdge(BaseModel):
    source: str
    target: str

class DayScheduleEntry(BaseModel):
    day: int
    topics: List[dict]
    isRevisionDay: Optional[bool] = False
    isMockContest: Optional[bool] = False
    totalProblems: int

class RoadmapGenerateRequest(BaseModel):
    targetCompany: str
    daysAvailable: int
    weakTopics: List[str]
    skillLevel: str

class RoadmapResponse(BaseModel):
    id: str
    userId: str
    targetCompany: str
    daysAvailable: int
    weakTopics: List[str]
    skillLevel: str
    nodes: List[RoadmapNode]
    edges: List[RoadmapEdge]
    totalDays: int
    dailySchedule: Optional[List[DayScheduleEntry]] = None
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True

class RoadmapProgressUpdate(BaseModel):
    nodeId: str
