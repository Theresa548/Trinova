// =====================================
// DONATION DETAILS
// =====================================


// =====================================
// CANCEL DONATION
// =====================================

const cancelBtn = document.getElementById("cancelBtn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", function () {

        const confirmed = confirm(
            "Are you sure you want to cancel this donation?"
        );

        if (confirmed) {

            /*
                Later this will call:

                PATCH /api/donations/{donation_id}

                {
                    "status": "CANCELLED"
                }
            */

            alert(
                "Donation cancellation request submitted.\n\n" +
                "Backend integration will be connected later."
            );

        }

    });

}


// =====================================
// MORE BUTTON
// =====================================

const moreBtn = document.getElementById("moreBtn");

if (moreBtn) {

    moreBtn.addEventListener("click", function () {

        alert(
            "More donation actions will be available here."
        );

    });

}


// =====================================
// LOGOUT
// =====================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmed =
            confirm("Are you sure you want to logout?");

        if (confirmed) {

            window.location.href = "login.html";

        }

    });

}


console.log("Donation details page loaded successfully.");