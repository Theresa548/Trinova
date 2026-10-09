// =====================================
// CREATE DONATION
// =====================================

const donationForm = document.getElementById("donationForm");


// Elements for live preview
const foodName = document.getElementById("foodName");
const quantity = document.getElementById("quantity");
const quantityUnit = document.getElementById("quantityUnit");
const foodCategory = document.getElementById("foodCategory");
const pickupDate = document.getElementById("pickupDate");

const reviewFood = document.getElementById("reviewFood");
const reviewQuantity = document.getElementById("reviewQuantity");
const reviewCategory = document.getElementById("reviewCategory");
const reviewPickup = document.getElementById("reviewPickup");


// =====================================
// LIVE REVIEW
// =====================================

function updateReview() {

    reviewFood.textContent =
        foodName.value || "—";

    reviewQuantity.textContent =
        quantity.value
            ? `${quantity.value} ${quantityUnit.value}`
            : "—";

    reviewCategory.textContent =
        foodCategory.value
            ? foodCategory.options[foodCategory.selectedIndex].text
            : "—";

    reviewPickup.textContent =
        pickupDate.value || "—";
}


foodName.addEventListener("input", updateReview);
quantity.addEventListener("input", updateReview);
quantityUnit.addEventListener("change", updateReview);
foodCategory.addEventListener("change", updateReview);
pickupDate.addEventListener("change", updateReview);


// =====================================
// SUBMIT
// =====================================

donationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const safetyConfirm =
        document.getElementById("safetyConfirm");

    if (!safetyConfirm.checked) {

        alert(
            "Please confirm that the food is safe for distribution."
        );

        return;
    }


    /*
        Backend integration will be added later.

        Example future API:

        POST /api/donations

        {
            food_name: "...",
            category: "...",
            quantity: 25,
            unit: "meals",
            preparation_date: "...",
            preparation_time: "...",
            storage_condition: "...",
            expiry: "...",
            pickup_address: "..."
        }
    */


    alert(
        "Donation form submitted successfully!\n\n" +
        "Backend API will be connected next."
    );

    console.log("Donation submitted.");
});


// =====================================
// SAVE DRAFT
// =====================================

const saveDraftBtn =
    document.getElementById("saveDraftBtn");

saveDraftBtn.addEventListener("click", function() {

    alert(
        "Donation saved as draft.\n\n" +
        "Draft storage will be connected to the backend later."
    );

    console.log("Donation saved as draft.");

});


// =====================================
// LOGOUT
// =====================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href = "login.html";

        }

    });

}