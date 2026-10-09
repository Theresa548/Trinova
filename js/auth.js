// =========================================
// REGISTRATION
// =========================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const password =
            document.getElementById("registerPassword").value;


        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        const name =
            document.getElementById("name").value;


        const email =
            document.getElementById("registerEmail").value;


        const role =
            document.getElementById("role").value;


        console.log("Registration details:");

        console.log({
            name: name,
            email: email,
            role: role
        });


        /*
            BACKEND INTEGRATION WILL BE ADDED LATER.

            Example:

            POST /api/auth/register
        */


        alert(
            "Registration API will be connected after the backend is ready."
        );

    });

}