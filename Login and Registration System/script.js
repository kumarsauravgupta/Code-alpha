async function register() {

    const username =
        document.getElementById("regUsername").value.trim();

    const password =
        document.getElementById("regPassword").value;

    const message =
        document.getElementById("registerMessage");

    if (!username || !password) {
        showMessage(
            message,
            "Username and password are required.",
            false
        );
        return;
    }

    if (password.length < 6) {
        showMessage(
            message,
            "Password must contain at least 6 characters.",
            false
        );
        return;
    }

    try {

        const response = await fetch("/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

        const data = await response.json();

        showMessage(
            message,
            data.message,
            response.ok
        );

        if (response.ok) {
            document.getElementById("regUsername").value = "";
            document.getElementById("regPassword").value = "";
        }

    } catch (error) {

        showMessage(
            message,
            "Server error. Please try again.",
            false
        );
    }
}


async function login() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (!username || !password) {

        showMessage(
            message,
            "Please enter username and password.",
            false
        );

        return;
    }

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

        const data = await response.json();

        showMessage(
            message,
            data.message,
            response.ok
        );

    } catch (error) {

        showMessage(
            message,
            "Server error. Please try again.",
            false
        );
    }
}


function showMessage(element, text, success) {

    element.textContent = text;

    element.className =
        success
            ? "message success"
            : "message error";
}