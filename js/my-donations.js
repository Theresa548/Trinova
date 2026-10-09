// =====================================
// MY DONATIONS
// =====================================

const filterTabs = document.querySelectorAll(".filter-tab");
const donationCards = document.querySelectorAll(".donation-card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let currentFilter = "all";


// =====================================
// FILTER DONATIONS
// =====================================

function filterDonations() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    donationCards.forEach(function(card) {

        const status = card.dataset.status;
        const name = card.dataset.name.toLowerCase();

        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;

        const matchesSearch =
            name.includes(searchText);

        if (matchesFilter && matchesSearch) {

            card.style.display = "flex";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    // Show "no results"
    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }
}


// =====================================
// FILTER BUTTONS
// =====================================

filterTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        filterTabs.forEach(function(item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        currentFilter =
            tab.dataset.filter;

        filterDonations();

    });

});


// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
    "input",
    filterDonations
);


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


console.log("My Donations page loaded successfully.");