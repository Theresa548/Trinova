// ============================================================
// FoodLoop - Authentication JavaScript
// Handles Login + Registration
// ============================================================


// ============================================================
// PASSWORD SHOW / HIDE
// ============================================================

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "Hide";
    } else {
        input.type = "password";
        button.textContent = "Show";
    }
}


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function showError(messageElement, message) {
    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.style.display = "block";
}


function showSuccess(messageElement, message) {
    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.style.display = "block";
}


function hideMessage(messageElement) {
    if (!messageElement) {
        return;
    }

    messageElement.style.display = "none";
}


// ============================================================
// LOGIN
// ============================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        const errorMessage = document.getElementById("errorMessage");
        const successMessage = document.getElementById("successMessage");

        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value : "";

        hideMessage(errorMessage);
        hideMessage(successMessage);

        // --------------------------------------------------------
        // Basic validation
        // --------------------------------------------------------

        if (!email || !password) {
            showError(
                errorMessage,
                "Please enter your email and password."
            );
            return;
        }

        // --------------------------------------------------------
        // Email validation
        // --------------------------------------------------------

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError(
                errorMessage,
                "Please enter a valid email address."
            );
            return;
        }

        // --------------------------------------------------------
        // Call backend
        // --------------------------------------------------------

        try {

            const loginData = {
                email: email,
                password: password
            };

            console.log("Sending login request:", {
                email: email
            });

            const response = await loginUser(loginData);

            console.log("Login successful:", response);

            // ----------------------------------------------------
            // Save logged-in user information
            // ----------------------------------------------------

            if (response.user) {
                localStorage.setItem(
                    "foodloop_user",
                    JSON.stringify(response.user)
                );
            } else {
                localStorage.setItem(
                    "foodloop_user",
                    JSON.stringify(response)
                );
            }

            // Save token if backend provides one
            if (response.access_token) {
                localStorage.setItem(
                    "foodloop_token",
                    response.access_token
                );
            }

            showSuccess(
                successMessage,
                "Login successful! Redirecting..."
            );

            // ----------------------------------------------------
            // Redirect according to role
            // ----------------------------------------------------

            const user = response.user || response;

            setTimeout(function () {

                if (user.role === "donor") {

                    window.location.href =
                        "donor-dashboard.html";

                } else if (user.role === "ngo") {

                    window.location.href =
                        "ngo-dashboard.html";

                } else if (user.role === "admin") {

                    window.location.href =
                        "admin-dashboard.html";

                } else {

                    window.location.href =
                        "donor-dashboard.html";
                }

            }, 1000);

        } catch (error) {

            console.error("Login failed:", error);

            showError(
                errorMessage,
                error.message ||
                "Login failed. Please check your email and password."
            );
        }
    });
}


// ============================================================
// REGISTRATION
// ============================================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const fullNameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const roleInput = document.getElementById("role");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput =
            document.getElementById("confirmPassword");

        const errorMessage =
            document.getElementById("errorMessage");

        const successMessage =
            document.getElementById("successMessage");

        const fullName =
            fullNameInput ? fullNameInput.value.trim() : "";

        const email =
            emailInput ? emailInput.value.trim() : "";

        const role =
            roleInput ? roleInput.value : "";

        const password =
            passwordInput ? passwordInput.value : "";

        const confirmPassword =
            confirmPasswordInput
                ? confirmPasswordInput.value
                : "";

        hideMessage(errorMessage);
        hideMessage(successMessage);


        // --------------------------------------------------------
        // Check required fields
        // --------------------------------------------------------

        if (
            !fullName ||
            !email ||
            !role ||
            !password ||
            !confirmPassword
        ) {

            showError(
                errorMessage,
                "Please fill in all required fields."
            );

            return;
        }


        // --------------------------------------------------------
        // Name validation
        // --------------------------------------------------------

        if (fullName.length < 2) {

            showError(
                errorMessage,
                "Please enter your full name."
            );

            return;
        }


        // --------------------------------------------------------
        // Email validation
        // --------------------------------------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showError(
                errorMessage,
                "Please enter a valid email address."
            );

            return;
        }


        // --------------------------------------------------------
        // Password validation
        // --------------------------------------------------------

        if (password.length < 8) {

            showError(
                errorMessage,
                "Password must be at least 8 characters."
            );

            return;
        }


        // --------------------------------------------------------
        // Confirm password
        // --------------------------------------------------------

        if (password !== confirmPassword) {

            showError(
                errorMessage,
                "Passwords do not match."
            );

            return;
        }


        // --------------------------------------------------------
        // Role validation
        // --------------------------------------------------------

        if (role !== "donor" && role !== "ngo") {

            showError(
                errorMessage,
                "Please select a valid account type."
            );

            return;
        }


        // --------------------------------------------------------
        // Prepare registration data
        // --------------------------------------------------------

        const registrationData = {

            name: fullName,

            email: email,

            role: role,

            password: password
        };


        console.log(
            "Sending registration request:",
            {
                name: fullName,
                email: email,
                role: role
            }
        );


        // --------------------------------------------------------
        // Send registration request to FastAPI
        // --------------------------------------------------------

        try {

            const response =
                await registerUser(registrationData);

            console.log(
                "Registration successful:",
                response
            );


            // ----------------------------------------------------
            // Show success message
            // ----------------------------------------------------

            showSuccess(
                successMessage,
                "Account created successfully! Redirecting to login..."
            );


            // ----------------------------------------------------
            // Clear form
            // ----------------------------------------------------

            registerForm.reset();


            // ----------------------------------------------------
            // Redirect to login
            // ----------------------------------------------------

            setTimeout(function () {

                window.location.href = "login.html";

            }, 1500);


        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );


            // ----------------------------------------------------
            // Handle duplicate email
            // ----------------------------------------------------

            if (
                error.message &&
                error.message.toLowerCase().includes("already registered")
            ) {

                showError(
                    errorMessage,
                    "This email is already registered. Please login instead."
                );

                return;
            }


            // ----------------------------------------------------
            // Generic error
            // ----------------------------------------------------

            showError(
                errorMessage,
                error.message ||
                "Registration failed. Please try again."
            );
        }
    });
}


// ============================================================
// FORGOT PASSWORD
// ============================================================

const forgotPasswordLink =
    document.getElementById("forgotPassword");

if (forgotPasswordLink) {

    forgotPasswordLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Password reset functionality will be available soon."
            );
        }
    );
}


// ============================================================
// REMEMBER ME
// ============================================================

const rememberMe =
    document.getElementById("rememberMe");

if (rememberMe) {

    const savedEmail =
        localStorage.getItem("foodloop_saved_email");

    if (savedEmail) {

        const emailInput =
            document.getElementById("email");

        if (emailInput) {
            emailInput.value = savedEmail;
        }

        rememberMe.checked = true;
    }


    // Save/remove email when login form is submitted

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function () {

                const emailInput =
                    document.getElementById("email");

                if (!emailInput) {
                    return;
                }

                if (rememberMe.checked) {

                    localStorage.setItem(
                        "foodloop_saved_email",
                        emailInput.value.trim()
                    );

                } else {

                    localStorage.removeItem(
                        "foodloop_saved_email"
                    );
                }
            }
        );
    }
}


// ============================================================
// PASSWORD TOGGLE BUTTONS
// ============================================================

// Supports buttons using:
// onclick="togglePassword('password', this)"

console.log("FoodLoop auth.js loaded successfully.");