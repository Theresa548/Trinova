// ==========================================
// FoodLoop - API Configuration
// ==========================================

// Change this URL when the backend is deployed
const API_BASE_URL = "http://127.0.0.1:8000";


// ==========================================
// Generic API Request Function
// ==========================================

async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        // Try to read JSON response
        const data = await response.json();

        // Handle backend errors
        if (!response.ok) {
            throw new Error(
                data.detail || data.message || "Something went wrong."
            );
        }

        return data;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}


// ==========================================
// Authentication APIs
// ==========================================

// Register a new user
async function registerUser(userData) {
    return await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}


// Login user
async function loginUser(loginData) {
    return await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData)
    });
}


// ==========================================
// Donation APIs
// ==========================================

// Create a new food donation
async function createDonation(donationData) {
    return await apiRequest("/api/donations", {
        method: "POST",
        body: JSON.stringify(donationData)
    });
}


// Get available donations
async function getDonations(params = "") {
    return await apiRequest(`/api/donations${params}`);
}


// Get a specific donation
async function getDonationById(donationId) {
    return await apiRequest(`/api/donations/${donationId}`);
}


// Update donation
async function updateDonation(donationId, donationData) {
    return await apiRequest(`/api/donations/${donationId}`, {
        method: "PUT",
        body: JSON.stringify(donationData)
    });
}


// Cancel donation
async function cancelDonation(donationId) {
    return await apiRequest(`/api/donations/${donationId}`, {
        method: "DELETE"
    });
}


// ==========================================
// Donation Claim APIs
// ==========================================

// NGO claims a donation
async function claimDonation(donationId) {
    return await apiRequest(`/api/donations/${donationId}/claims`, {
        method: "POST"
    });
}


// ==========================================
// Pickup APIs
// ==========================================

// Verify pickup using QR/code
async function verifyPickup(pickupId, verificationData) {
    return await apiRequest(`/api/pickups/${pickupId}/verify`, {
        method: "POST",
        body: JSON.stringify(verificationData)
    });
}


// ==========================================
// Analytics APIs
// ==========================================

// Get FoodLoop impact statistics
async function getImpactAnalytics() {
    return await apiRequest("/api/analytics/impact");
}