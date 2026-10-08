const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 3000;

const usersFile = path.join(__dirname, "users.json");


// Middleware
app.use(express.json());

app.use(express.static(
    path.join(__dirname, "public")
));


// Create users.json if it doesn't exist
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]");
}


// Read users
function getUsers() {

    const data =
        fs.readFileSync(usersFile, "utf8");

    return JSON.parse(data);
}


// Save users
function saveUsers(users) {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );
}


// =========================
// REGISTER
// =========================

app.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password are required."
            });
        }


        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }


        const users = getUsers();


        // Check duplicate username
        const existingUser = users.find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );


        if (existingUser) {

            return res.status(409).json({
                message: "Username already exists."
            });
        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 12);


        // Store user
        users.push({

            username: username,

            password: hashedPassword

        });


        saveUsers(users);


        res.status(201).json({

            message: "Registration successful!"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Registration failed."

        });
    }
});


// =========================
// LOGIN
// =========================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;


        if (!username || !password) {

            return res.status(400).json({

                message:
                    "Username and password are required."

            });
        }


        const users = getUsers();


        // Find username
        const user = users.find(

            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()

        );


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid username or password."

            });
        }


        // Compare password with hash
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid username or password."

            });
        }


        res.json({

            message:
                `Login successful! Welcome ${user.username}.`

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Login failed."

        });
    }
});


// Start server
app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});