from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from database import get_db
from models import User, Donation
from schemas import (
    UserCreate,
    UserResponse,
    LoginRequest,
    DonationCreate,
    DonationResponse
)


# =========================
# PASSWORD HASHING
# =========================

password_hash = PasswordHash.recommended()


# =========================
# FASTAPI APP
# =========================

app = FastAPI(
    title="Trinova - Food Redistribution API",
    description="Connect surplus food donors with NGOs and shelters.",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# =========================
# ROOT
# =========================

@app.get("/")
def root():
    return {
        "message": "FoodLoop backend is running successfully."
    }


# =========================================================
# REGISTER
# =========================================================

@app.post(
    "/api/auth/register",
    response_model=UserResponse,
    status_code=201
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # Check whether email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email is already registered."
        )

    # Hash password
    hashed_password = password_hash.hash(user.password)

    # Create user
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================================================
# LOGIN
# =========================================================

@app.post("/api/auth/login")
def login_user(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):

    # Find user using email
    user = (
        db.query(User)
        .filter(User.email == login_data.email)
        .first()
    )

    # Email not found
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    # Verify password
    if not password_hash.verify(
        login_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    # Login successful
    return {
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }


# =========================================================
# CREATE DONATION
# =========================================================

@app.post(
    "/api/donations",
    response_model=DonationResponse,
    status_code=201
)
def create_donation(
    donation: DonationCreate,
    db: Session = Depends(get_db)
):

    # Check donor exists
    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if not donor:
        raise HTTPException(
            status_code=404,
            detail="Donor not found."
        )

    if donor.role != "donor":
        raise HTTPException(
            status_code=403,
            detail="Only donors can create donations."
        )

    # Create donation
    new_donation = Donation(
        donor_id=donation.donor_id,
        food_name=donation.food_name,
        quantity=donation.quantity,
        unit=donation.unit,
        expiry_datetime=donation.expiry_datetime,
        pickup_address=donation.pickup_address,
        status="available"
    )

    db.add(new_donation)
    db.commit()
    db.refresh(new_donation)

    return new_donation


# =========================================================
# GET ALL DONATIONS
# =========================================================

@app.get(
    "/api/donations",
    response_model=list[DonationResponse]
)
def get_donations(
    db: Session = Depends(get_db)
):

    donations = (
        db.query(Donation)
        .order_by(Donation.created_at.desc())
        .all()
    )

    return donations


# =========================================================
# GET DONATION BY ID
# =========================================================

@app.get(
    "/api/donations/{donation_id}",
    response_model=DonationResponse
)
def get_donation(
    donation_id: int,
    db: Session = Depends(get_db)
):

    donation = (
        db.query(Donation)
        .filter(Donation.id == donation_id)
        .first()
    )

    if not donation:
        raise HTTPException(
            status_code=404,
            detail="Donation not found."
        )

    return donation