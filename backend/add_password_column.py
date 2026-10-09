from sqlalchemy import text
from database import engine

with engine.connect() as connection:
    connection.execute(
        text(
            "ALTER TABLE users "
            "ADD COLUMN password_hash VARCHAR(255) NOT NULL"
        )
    )
    connection.commit()

print("password_hash column added successfully!")