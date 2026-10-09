/* =========================================
   FOODLOOP ADMIN DASHBOARD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("FoodLoop Admin Dashboard loaded successfully!");


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    const menuBtn =
        document.getElementById("adminMenuBtn");

    const sidebar =
        document.querySelector(".admin-sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* =========================================
       CLOSE MOBILE SIDEBAR
    ========================================= */

    const navItems =
        document.querySelectorAll(".admin-nav-item");


    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 800) {

                sidebar.classList.remove("mobile-open");

            }

        });

    });


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutBtn =
        document.getElementById("adminLogout");


    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                console.log("Admin logout requested.");

                /*
                    FUTURE BACKEND:

                    localStorage.removeItem("token");

                    window.location.href =
                        "login.html";
                */

                alert(
                    "Logout API will be connected after the backend is ready."
                );

            }

        });

    }


    /* =========================================
       TABLE VIEW BUTTONS
    ========================================= */

    const viewButtons =
        document.querySelectorAll(".table-action");


    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const isReview =
                button.classList.contains("review");


            if (isReview) {

                alert(
                    "Donation review page will be connected to the backend later."
                );

            } else {

                alert(
                    "Donation details will be connected to the backend later."
                );

            }

        });

    });


    /* =========================================
       REVIEW FLAGGED DONATIONS
    ========================================= */

    const reviewButtons =
        document.querySelectorAll(".review-btn");


    reviewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Admin review functionality will be connected to the backend later."
            );

        });

    });


    /* =========================================
       FUTURE API INTEGRATION
    ========================================= */

    /*
        Later this dashboard will use APIs such as:

        GET /api/admin/dashboard

        GET /api/admin/donations

        GET /api/admin/users

        GET /api/admin/claims

        GET /api/admin/flagged

        GET /api/analytics/impact


        Example:

        fetch(`${API_BASE_URL}/api/admin/dashboard`)
            .then(response => response.json())
            .then(data => {
                // Update dashboard statistics
            });
    */

});