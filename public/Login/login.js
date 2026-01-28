 async function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                alert("Please fill in both fields");
                return;
            }

            let formData = {
                userName: username,
                pass: password
            };

            try {
                let response = await fetch("/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                console.log(response);

                if (response.ok) {
                    window.location.href = "/Home";
                } else {
                    const errorData = await response.json();
                    alert("Login failed: " + (errorData.message || "Unknown error"));
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert("An error occurred while trying to login.");
            }

            console.log("login attempt finished");
        }

    document.getElementById("password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
    });