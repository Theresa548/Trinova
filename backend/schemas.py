
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=255)
    role: Literal["donor", "ngo"]


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    role: str


class DonationCreate(BaseModel):
    donor_id: int
    food_name: str = Field(min_length=2, max_length=150)
    quantity: float = Field(gt=0)
    unit: str = Field(min_length=1, max_length=30)
    expiry_datetime: datetime
    pickup_address: str = Field(
        min_length=5, max_length=500
    )


class DonationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    donor_id: int
    food_name: str
    quantity: float
    unit: str
    expiry_datetime: datetime
    pickup_address: str
    status: str


class ClaimCreate(BaseModel):
    ngo_id: int


class StatusUpdate(BaseModel):
    status: Literal[
        "available", "claimed", "picked_up", "completed",
        "cancelled"
    ]


class ClaimResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    donation_id: int
    ngo_id: int
    status: str