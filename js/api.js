const API_BASE_URL = "http://127.0.0.1:8000";


// =========================================================
// COMMON API REQUEST
// =========================================================

async function apiRequest(endpoint, options = {}) {

    try {

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,

                headers: {
                    "Content-Type": "application/json",
                    ...(options.headers || {})
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail ||
                data.message ||
                "Something went wrong."
            );
        }

        return data;

    } catch (error) {

        console.error("API Error:", error);

        throw error;
    }
}


// =========================================================
// REGISTER
// =========================================================

async function registerUser(userData) {

    return await apiRequest(
        "/api/auth/register",
        {
            method: "POST",
            body: JSON.stringify(userData)
        }
    );
}


// =========================================================
// LOGIN
// =========================================================

async function loginUser(loginData) {

    return await apiRequest(
        "/api/auth/login",
        {
            method: "POST",
            body: JSON.stringify(loginData)
        }
    );
}


// =========================================================
// CREATE DONATION
// =========================================================

async function createDonation(donationData) {

    return await apiRequest(
        "/api/donations",
        {
            method: "POST",
            body: JSON.stringify(donationData)
        }
    );
}


// =========================================================
// GET DONATIONS
// =========================================================

async function getDonations(params = "") {

    return await apiRequest(
        `/api/donations${params}`
    );
}


// =========================================================
// GET DONATION BY ID
// =========================================================

async function getDonationById(donationId) {

    return await apiRequest(
        `/api/donations/${donationId}`
    );
}