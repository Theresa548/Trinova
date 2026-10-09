# 🌱 FoodLoop — Food Redistribution Platform

> **Turning Surplus Food Into Support**

FoodLoop is a web-based food redistribution platform that connects **food donors** such as restaurants, caterers, supermarkets, and other organizations with **verified NGOs and shelters** that can collect and redistribute surplus food.

The platform aims to reduce food waste while helping surplus food reach communities that need it.

---

## 📌 Problem Statement

A significant amount of safe, usable food is wasted every day by restaurants, caterers, supermarkets, events, and other food providers.

At the same time, NGOs and shelters often need food resources but may not have an efficient way to discover available surplus food nearby.

The lack of a centralized platform creates a gap between:

**Food Surplus → Food Donors → NGOs → Communities**

FoodLoop addresses this gap by providing a digital platform for listing, matching, claiming, collecting, and tracking surplus food donations.

---

## 💡 Our Solution

FoodLoop provides a centralized platform where:

* 🍽️ Food donors can list surplus food.
* 🏢 Verified NGOs can discover available donations.
* 📍 Donations can be matched based on location and eligibility.
* 🤝 NGOs can claim suitable food donations.
* 📱 Pickup can be verified using a secure verification mechanism.
* 📊 The platform can track food redistribution and social impact.
* 🔐 Role-based access helps protect donor, NGO, and administrator functionality.

---

## 🎯 Objectives

1. Reduce food wastage through redistribution.
2. Connect surplus food donors with verified organizations.
3. Make food donation management easier and more organized.
4. Enable location-based discovery of available food.
5. Provide a transparent donation and pickup workflow.
6. Track the overall social impact of food redistribution.
7. Build a scalable platform that can be extended with AI and optimization features.

---

## 👥 User Roles

### 🍽️ Food Donor

Restaurants, caterers, supermarkets, event organizers, and other eligible food providers can:

* Register and manage their profile.
* Create food donation listings.
* Provide quantity and food details.
* Add pickup location and deadline.
* View donation status.
* Track claimed and completed donations.

### 🏢 NGO / Shelter

Verified NGOs and shelters can:

* Register and submit verification details.
* Browse available food donations.
* Filter donations based on relevant criteria.
* View donation details.
* Claim eligible food.
* Manage pickup information.
* Confirm collection and receipt.

### 🛡️ Administrator

Administrators can:

* Verify organizations.
* Manage users.
* Monitor donations.
* Review flagged listings.
* Manage platform activity.
* View impact statistics.
* Maintain audit information.

---

## 🔄 Core Workflow

```text
Food Donor
    │
    ▼
Create Food Listing
    │
    ▼
Validation & Eligibility Check
    │
    ▼
Donation Published
    │
    ▼
Verified NGO Discovers Donation
    │
    ▼
NGO Claims Donation
    │
    ▼
Pickup Scheduled
    │
    ▼
Pickup Verification
    │
    ▼
Food Collected
    │
    ▼
Donation Completed
    │
    ▼
Impact Statistics Updated
```

---

## 🏗️ System Architecture

```text
                    USERS
                      │
                      ▼
              ┌───────────────┐
              │   FRONTEND    │
              │ HTML/CSS/JS   │
              └───────┬───────┘
                      │
                 REST API
                      │
                      ▼
              ┌───────────────┐
              │    FASTAPI    │
              │    BACKEND    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │     MySQL     │
              │   DATABASE    │
              └───────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      Maps / Geo              Notifications
       Services                 Services
```

The initial implementation uses a modular backend architecture rather than multiple independent microservices, making the platform easier to develop and deploy during the hackathon.

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

### Backend

* Python
* FastAPI
* REST APIs

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman

### Deployment

The project is designed for separate frontend and backend deployment.

Possible deployment setup:

```text
Frontend  → Vercel / Netlify
Backend   → Cloud hosting platform
Database  → Cloud MySQL
```

The final deployment provider may be selected based on the team's requirements and available services.

---

## 📁 Project Structure

```text
FOOD-REDISTRIBUTION-PLATFORM/
│
├── frontend/
│   │
│   ├── index.html
│   │
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── donor-dashboard.html
│   │   ├── create-donation.html
│   │   ├── my-donations.html
│   │   ├── ngo-dashboard.html
│   │   ├── donation-details.html
│   │   ├── pickup.html
│   │   └── admin-dashboard.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   ├── donor.js
│   │   ├── ngo.js
│   │   ├── admin.js
│   │   └── api.js
│   │
│   └── assets/
│       ├── images/
│       └── icons/
│
├── backend/
│   └── ...
│
├── docs/
│   └── ...
│
└── README.md
```

---

## ✨ Key Features

### 1. Food Donation Management

Donors can create and manage surplus food listings containing:

* Food name
* Food category
* Quantity
* Unit
* Preparation/packaging information
* Storage information
* Pickup location
* Pickup deadline
* Additional notes

### 2. NGO Verification

Organizations can submit their details for verification before accessing restricted donation functionality.

### 3. Food Discovery

Verified NGOs can browse available donations and find suitable food based on relevant criteria such as:

* Food category
* Quantity
* Location
* Pickup deadline
* Eligibility

### 4. Location-Based Matching

The system can use donor and NGO locations to help identify nearby suitable donations.

### 5. Donation Claiming

An eligible NGO can claim an available donation.

The backend ensures that multiple organizations cannot successfully claim the same donation simultaneously.

### 6. Pickup Verification

A secure verification mechanism can be used to confirm that the correct donation has been collected.

### 7. Donation Status Tracking

Example statuses include:

```text
PENDING_REVIEW
AVAILABLE
RESERVED
PICKUP_SCHEDULED
COLLECTED
COMPLETED
CANCELLED
EXPIRED
FLAGGED
```

### 8. Impact Analytics

The platform can calculate statistics such as:

* Completed donations
* Food redistributed
* Meal portions
* Participating organizations

Impact numbers will be calculated from actual completed records rather than permanently hard-coded values.

---

## 🔐 Security Considerations

The system is designed with basic security principles including:

* Password hashing
* Role-based authorization
* Backend-side permission checks
* Input validation
* Secure API communication
* Database constraints
* Audit logging
* Secure pickup verification
* Restricted access to verification documents

Sensitive information and API credentials should be stored using environment variables and should never be committed to GitHub.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd FOOD-REDISTRIBUTION-PLATFORM
```

### 3. Open the frontend

Navigate to:

```text
frontend/
```

Open `index.html` using VS Code Live Server.

The frontend will initially run locally.

### 4. Backend Setup

Backend setup instructions will be added once the FastAPI backend is integrated.

### 5. Database Setup

MySQL database configuration and schema instructions will be added as the backend implementation is completed.

---

## 🔗 API Integration

The frontend communicates with the FastAPI backend through REST APIs.

Example:

```text
Frontend
   │
   │ POST /api/donations
   ▼
FastAPI Backend
   │
   ▼
MySQL Database
```

The frontend will use a centralized API configuration so that the backend URL can be changed easily between development and production.

Example:

```javascript
const API_BASE_URL = "http://localhost:8000";
```

For production, this will be replaced with the deployed backend URL.

---

## 🧪 Testing

Important workflows to test include:

* User registration
* User login
* Role-based access
* Creating a donation
* Viewing available donations
* Claiming a donation
* Preventing duplicate claims
* Pickup verification
* Donation completion
* Impact calculation
* Expired donation handling
* Unauthorized access prevention

---

## 🌍 Future Enhancements

Potential future improvements include:

* 🤖 AI-based food demand prediction
* 📍 Advanced route optimization
* 🧠 Intelligent donor-NGO matching
* 📱 Mobile application
* 🔔 Real-time notifications
* 🗺️ Live pickup tracking
* 📊 Advanced analytics
* 🌐 Multi-city expansion
* 🏪 Integration with restaurant and supermarket systems
* 🌱 More detailed environmental impact estimation

---

## 👩‍💻 Team

### Team Members

| Member   | Responsibility                  |
| -------- | ------------------------------- |
| Member 1 | Frontend Development & UI/UX    |
| Member 2 | Backend Development & Database  |
| Member 3 | Matching, Safety & Verification |

---

## 📌 Project Status

**Current Stage:** 🚧 Development

The frontend foundation and project architecture are being developed first, followed by backend API integration and deployment.

---

## ❤️ Mission

> **Reduce food waste. Connect surplus with need. Create measurable impact.**

FoodLoop aims to turn unused food into a meaningful resource for communities while making the redistribution process organized, transparent, and technology-driven.
# Trinova
# Food Loss Redistribution Platform

## Project Overview

A web-based platform that connects restaurants, supermarkets, and catering services with nearby NGOs and shelters to redistribute surplus food, reduce food waste, and support communities in need.

## Objectives

* Minimize avoidable food waste.
* Simplify surplus food donation and collection.
* Connect donors with verified NGOs and shelters.
* Promote safe and efficient food redistribution.

## Key Features

* User authentication and role-based access.
* Surplus food listing and management.
* NGO donation discovery and claiming.
* Pickup and donation status tracking.
* Food-handling information and eligibility checks.
* Redistribution impact analytics.

## Tech Stack

* **Programming Language:** Python
* **Backend Framework:** FastAPI
* **Database:** MySQL
* **ORM:** SQLAlchemy
* **API Server:** Uvicorn
* **Version Control:** Git and GitHub
* **Deployment:** Render (planned)

## Project Status

In Development.

