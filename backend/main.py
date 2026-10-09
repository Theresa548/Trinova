
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Trinova - Food Redistribution API",
    description="Connect surplus food donors with NGOs and shelters.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5500/",
        "http://localhost:5500/",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Temporary in-memory storage; no database required
donations = {}


class DonationCreate(BaseModel):
    food_name: str = Field(..., min_length=2, max_length=100)
    quantity: float = Field(..., gt=0)
    unit: str = Field(..., min_length=1, max_length=20)
    donor_name: str = Field(..., min_length=2, max_length=100)
    location: str = Field(..., min_length=2, max_length=200)
    pickup_deadline: Optional[datetime] = None
    description: Optional[str] = None


class DonationResponse(DonationCreate):
    id: str
    status: str
    created_at: datetime


@app.get("/")
def home():
    return {
        "message": "Welcome to Trinova Food Redistribution API",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/donations", response_model=DonationResponse, status_code=201)
def create_donation(donation: DonationCreate):
    if donation.pickup_deadline is not None:
        deadline = donation.pickup_deadline
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        if deadline <= datetime.now(timezone.utc):
            raise HTTPException(
                status_code=400,
                detail="Pickup deadline must be in the future.",
            )

    donation_id = str(uuid4())

    record = DonationResponse(
        **donation.model_dump(),
        id=donation_id,
        status="AVAILABLE",
        created_at=datetime.now(timezone.utc),
    )

    donations[donation_id] = record
    return record


@app.get("/api/donations")
def get_donations(status: Optional[str] = None):
    results = list(donations.values())

    if status:
        results = [
            item for item in results
            if item.status.lower() == status.lower()
        ]

    return {
        "count": len(results),
        "donations": results,
    }


@app.get("/api/donations/{donation_id}", response_model=DonationResponse)
def get_donation(donation_id: str):
    donation = donations.get(donation_id)

    if donation is None:
        raise HTTPException(status_code=404, detail="Donation not found")

    return donation


@app.post("/api/donations/{donation_id}/claim")
def claim_donation(donation_id: str, ngo_name: str):
    donation = donations.get(donation_id)

    if donation is None:
        raise HTTPException(status_code=404, detail="Donation not found")

    if donation.status != "AVAILABLE":
        raise HTTPException(
            status_code=409,
            detail="This donation is no longer available.",
        )

    updated = donation.model_copy(
        update={
            "status": "RESERVED",
        }
    )
    donations[donation_id] = updated

    return {
        "message": "Donation reserved successfully",
        "donation_id": donation_id,
        "ngo_name": ngo_name,
        "status": updated.status,
    }