/* =========================================
   FOODLOOP PICKUP PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("FoodLoop Pickup page loaded successfully!");


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.querySelector(".pickup-sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* =========================================
       CLOSE SIDEBAR
    ========================================= */

    const navLinks =
        document.querySelectorAll(".pickup-nav a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 800) {

                sidebar.classList.remove("mobile-open");

            }

        });

    });


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                console.log("Logout requested.");

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
       DIRECTIONS
    ========================================= */

    const directionsBtn =
        document.getElementById("directionsBtn");


    if (directionsBtn) {

        directionsBtn.addEventListener("click", function () {

            alert(
                "Map / navigation integration will be connected later."
            );

        });

    }


    /* =========================================
       PICKUP CODE INPUT
    ========================================= */

    const codeInputs =
        document.querySelectorAll(".code-input");


    codeInputs.forEach(function (input, index) {

        input.addEventListener("input", function () {

            input.value =
                input.value.replace(/[^0-9]/g, "");


            if (
                input.value &&
                index < codeInputs.length - 1
            ) {

                codeInputs[index + 1].focus();

            }

        });


        input.addEventListener("keydown", function (event) {

            if (
                event.key === "Backspace" &&
                !input.value &&
                index > 0
            ) {

                codeInputs[index - 1].focus();

            }

        });

    });


    /* =========================================
       VERIFY PICKUP
    ========================================= */

    const verifyBtn =
        document.getElementById("verifyBtn");

    const verificationMessage =
        document.getElementById("verificationMessage");

    const completeSection =
        document.getElementById("completeSection");


    if (verifyBtn) {

        verifyBtn.addEventListener("click", function () {

            let code = "";


            codeInputs.forEach(function (input) {

                code += input.value;

            });


            if (code.length !== 6) {

                verificationMessage.textContent =
                    "Please enter the complete 6-digit pickup code.";

                verificationMessage.style.color =
                    "#f0a28a";

                return;

            }


            /*
                DEMO VERIFICATION

                For frontend testing only.

                Demo code:
                123456
            */

            if (code === "123456") {

                verificationMessage.textContent =
                    "✓ Pickup verified successfully!";

                verificationMessage.style.color =
                    "#a9d49d";


                verifyBtn.textContent =
                    "Pickup Verified ✓";


                verifyBtn.disabled = true;


                codeInputs.forEach(function (input) {

                    input.disabled = true;

                });


                completeSection.style.display =
                    "flex";


                /*
                    FUTURE BACKEND:

                    POST /api/pickups/{pickup_id}/verify

                    {
                        "verification_code": "123456"
                    }

                    Backend should then update:

                    PICKUP_SCHEDULED
                            ↓
                    COLLECTED
                            ↓
                    COMPLETED
                */


            } else {

                verificationMessage.textContent =
                    "Invalid pickup code. Please check with the donor.";

                verificationMessage.style.color =
                    "#f0a28a";

            }

        });

    }

});