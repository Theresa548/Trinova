/* =========================================
   FOODLOOP NGO DASHBOARD
========================================= */


document.addEventListener("DOMContentLoaded", function () {

    console.log("FoodLoop NGO Dashboard loaded successfully!");


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    const menuBtn = document.getElementById("ngoMenuBtn");
    const sidebar = document.querySelector(".ngo-sidebar");

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* =========================================
       CLOSE SIDEBAR WHEN NAV LINK CLICKED
    ========================================= */

    const navItems = document.querySelectorAll(".ngo-nav .nav-item");

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 800) {

                sidebar.classList.remove("mobile-open");

            }

        });

    });


    /* =========================================
       FOOD SEARCH
    ========================================= */

    const searchInput = document.getElementById("foodSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const distanceFilter = document.getElementById("distanceFilter");

    const foodCards = document.querySelectorAll(".food-card");
    const noResults = document.getElementById("noFoodResults");


    function filterFood() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const category =
            categoryFilter.value;

        const maxDistance =
            distanceFilter.value;

        let visibleCards = 0;


        foodCards.forEach(function (card) {

            const name =
                card.dataset.name.toLowerCase();

            const cardCategory =
                card.dataset.category;

            const distance =
                parseFloat(card.dataset.distance);


            const matchesSearch =
                name.includes(searchText);


            const matchesCategory =
                category === "all" ||
                cardCategory === category;


            const matchesDistance =
                maxDistance === "all" ||
                distance <= parseFloat(maxDistance);


            if (
                matchesSearch &&
                matchesCategory &&
                matchesDistance
            ) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCards === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterFood
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterFood
        );

    }


    if (distanceFilter) {

        distanceFilter.addEventListener(
            "change",
            filterFood
        );

    }


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    console.log("NGO logout requested.");

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

            }
        );

    }


    /* =========================================
       VIEW / PICKUP BUTTONS
    ========================================= */

    const viewButtons =
        document.querySelectorAll(".outline-btn");


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                alert(
                    "Claim details page will be connected to the backend later."
                );

            }
        );

    });


    const pickupButton =
        document.querySelector(".primary-small-btn");


    if (pickupButton) {

        pickupButton.addEventListener(
            "click",
            function () {

                alert(
                    "Pickup details will be connected to the backend later."
                );

            }
        );

    }


    /* =========================================
       FUTURE API INTEGRATION
    ========================================= */

    /*
        Later, replace demo food cards with:

        GET /api/donations?status=AVAILABLE

        Example:

        fetch(`${API_BASE_URL}/api/donations?status=AVAILABLE`)
            .then(response => response.json())
            .then(data => {
                // display donations
            });


        Claim:

        POST /api/donations/{donation_id}/claims
    */


});