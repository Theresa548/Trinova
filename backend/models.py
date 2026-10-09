
from datetime import datetime

from sqlalchemy import (
    String, Integer, DateTime, ForeignKey,
    UniqueConstraint, func
)
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(
        String(255), unique=True, index=True
    )
    role: Mapped[str] = mapped_column(String(20))
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )


class Donation(Base):
    __tablename__ = "donations"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )
    donor_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )
    food_name: Mapped[str] = mapped_column(String(150))
    quantity: Mapped[float] = mapped_column()
    unit: Mapped[str] = mapped_column(String(30))
    expiry_datetime: Mapped[datetime] = mapped_column(
        DateTime
    )
    pickup_address: Mapped[str] = mapped_column(String(500))
    status: Mapped[str] = mapped_column(
        String(30), default="available"
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )


class Claim(Base):
    __tablename__ = "claims"
    __table_args__ = (
        UniqueConstraint(
            "donation_id",
            name="uq_claim_donation"
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )
    donation_id: Mapped[int] = mapped_column(
        ForeignKey("donations.id")
    )
    ngo_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )
    status: Mapped[str] = mapped_column(
        String(30), default="claimed"
    )
    claimed_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now()
    )