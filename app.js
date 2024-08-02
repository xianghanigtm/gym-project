const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const app = express();
// const bcrypt = require("bcrypt");
const session = require("express-session");
// Set up view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////MULTER IMAGE AND VIDEO////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set up multer for file uploads lesson 9                                                    
const storage = multer.diskStorage({                                                          
    destination: (req, file, cb) => {                                                         
        if (file.mimetype.startsWith("image/")) {                                             
            cb(null, "public/images"); // Store images in this directory                      
        } else if (file.mimetype.startsWith("video/")) {                                      
            cb(null, "public/videos"); // Store videos in this directory                      
        } else {                                                                              
            cb("Unsupported file type", null);                                                
        }                                                                                     
    },                                                                                        
    filename: (req, file, cb) => {                                                            
        cb(null, file.originalname); // Use original filename for simplicity                  
    }                                                                                          
});                                                                                          
const upload = multer({ storage: storage });                                                  


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// creating a const so i dont have to manually type in the following//////////////
//content each time used in index.ejs to display//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {                                                               
    const body = {                                                                          
        title: "Welcome to Gymreaper",                                              
        text: "build custom workout plans, explore trainers\
        and maintain healthy diet with acheivable goals with this app"
    };
    res.render("index", { body: body });
});


// Create MySQL connection lesson 8
const connection = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "c237_gymproject"
    host: "freedb.tech",
    user: "freedb_gymapp",
    pass: "@ZURq?PEXUV3vTw",
    database: "freedb_week12db"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////EVERYTHING THAT IS RELATED TO PROFILE ETC/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//lesson 8 display profile 
app.get("/profile", (req, res) => {
    if (!req.session.loggedin) {
        res.redirect("/logIn");
        return;
    }

    const sql = "SELECT * FROM user";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving profile data");
        }
        if (results.length > 0) {
            res.render("profile", { user: results, loggedIn: true });
        } else {
            res.status(404).send("Profile not found");
        }
    });
});

app.get("/profile/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM user WHERE userId = ?";
    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving user");
        }
        if (results.length > 0) {
            res.render("userProfile", { user: results[0] });
        } else {
            res.status(404).send("User not found");
        }
    });
});


//lesson 9
app.get("/deleteProfile/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM user WHERE userId = ?";
    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Error deleting profile:", error);
            res.status(500).send("Error deleting ");
        } else {
            res.redirect("/profile");
        }
    });
});

//lesson 9
app.get("/editProfile/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM user WHERE userId = ?";
    //get the data from the database created 
    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving profile by ID");
        }
        //check for profile with the given id
        if (results.length > 0) {
            res.render("editProfile", { user: results[0] });
        } else {
            res.status(404).send("profile not found");
        }
    });
});

//lesson 9
app.post("/editProfile/:id", upload.single("image"), (req, res) => {
    const userId = req.params.id;
    const { name, dob, contact, email } = req.body;
    let image = req.body.currentImage;
    if (req.file) {
        image = req.file.filename;
    }
    const sql = "UPDATE user SET name = ?, dob = ?, contact = ?, email = ?, image = ? WHERE userId = ?";
    connection.query(sql, [name, dob, contact, email, image, userId], (error, results) => {
        if (error) {
            console.error("Error updating profile:", error);
            res.status(500).send("Error updating profile");
        } else {
            res.redirect("/profile");
        }
    });
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////EVERYTHING THAT IS RELATED TO TRAINERS ETC/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//this section is for trainers
//data base to store provided trainers
app.get("/trainers", (req, res) => {
    if (!req.session.loggedin) {
        res.redirect("/logIn");
        return;
    }

    const sql = "SELECT * FROM trainer";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving trainers");
        }
        res.render("trainers", { trainers: results, loggedIn: true });
    });
});


app.get("/trainers/:id", (req, res) => {
    const trainerId = req.params.id;
    const sql = "SELECT * FROM trainer WHERE trainerId = ?";
    connection.query(sql, [trainerId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving trainer");
        }
        if (results.length > 0) {
            res.render("trainerProfile", { trainer: results[0] });
        } else {
            res.status(404).send("Trainer not found");
        }
    });
});

//lesson 9
app.get("/deleteTrainer/:id", (req, res) => {
    const trainerId = req.params.id;
    const sql = "DELETE FROM trainer WHERE trainerId = ?";
    connection.query(sql, [trainerId], (error, results) => {
        if (error) {
            console.error("Error deleting trainer:", error);
            return res.status(500).send("Error deleting trainer");
        }
        res.redirect("/trainers");
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////EVERYTHING THAT IS RELATED TO SESSION ETC/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//logging each workout session under profiles created
app.get("/logSession", (req, res) => {
    const sql = "SELECT workoutId, exerciseName FROM workout";
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching workouts");
      }
      res.render("sessionLogs", { workouts: results });
    });
  });



app.post("/logSession", (req, res) => {
    const { date, duration, bodyPart, exercise, food, sets } = req.body;
    const query = "INSERT INTO session (date, duration, bodyPart, exercise, food, sets) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [date, duration, bodyPart, exercise, food, sets], (err, result) => {
        if (err) {
            console.error("Error logging session:", err);
            return res.status(500).send("Server error");
        }
        res.redirect("/viewSession");
    });
});

app.get("/viewSession", (req, res) => {
    if (!req.session.loggedin) {
        res.redirect("/logIn");
        return;
    }
    const sql = "SELECT * FROM session";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving sessions");
        }
        res.render("sessionViews", { sessions: results });
    });
});


app.get("/deleteSession/:id", (req, res) => {
    const sessionId = req.params.id;
    const sql = "DELETE FROM session WHERE sessionId = ?";
    connection.query(sql, [sessionId], (error, results) => {
        if (error) {
            console.error("Error deleting session:", error);
            return res.status(500).send("Error deleting session");
        }
        res.redirect("/viewSession");
    });
});


app.get("/editSession/:id", (req, res) => {
    const sessionId = req.params.id;
    const sqlSession = "SELECT * FROM session WHERE sessionId = ?";
    const sqlWorkouts = "SELECT workoutId, exerciseName FROM workout";
    connection.query(sqlSession, [sessionId], (error, sessionResults) => {
        if (error) {
            return res.status(500).send("Error fetching session");
        }
        if (sessionResults.length > 0) {
            connection.query(sqlWorkouts, (err, workoutResults) => {
                if (err) {
                    return res.status(500).send("Error fetching workouts");
                }
                res.render("sessionEdits", { session: sessionResults[0], workouts: workoutResults });
            });
        } else {
            res.status(404).send("Session not found");
        }
    });
});


app.post("/editSession/:id", (req, res) => {
    const sessionId = req.params.id;
    const { date, duration, bodyPart, exercise, food, sets } = req.body;
    const sql = "UPDATE session SET date = ?, duration = ?, bodyPart = ?, exercise = ?, food = ?, sets = ? WHERE sessionId = ?";
    connection.query(sql, [date, duration, bodyPart, exercise, food, sets, sessionId], (error, results) => {
        if (error) {
            console.error("Error updating session:", error);
            return res.status(500).send("Error updating session");
        }
        res.redirect("/viewSession");
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////EVERYTHING THAT IS RELATED TO WORKOUT ETC/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//a database that provides user with pre defined plans? will allow user to add their own workout ig
app.get("/workouts", (req, res) => {
    if (!req.session.loggedin) {
        res.redirect("/logIn");
        return;
    }

    const sql = "SELECT * FROM workout";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving workouts");
        }
        res.render("workouts", { workouts: results, loggedIn: true });
    });
});

app.get("/workouts/:id", (req, res) => {
    const workoutId = req.params.id;
    const sql = "SELECT * FROM workout WHERE workoutId = ?";
    connection.query(sql, [workoutId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving workour");
        }
        if (results.length > 0) {
            res.render("workoutsDetails", { workout: results[0] });
        } else {
            res.status(404).send("Trainer not found");
        }
    });
});


app.get("/deleteWorkouts/:id", (req, res) => {
    const workoutId = req.params.id;
    const sql = "DELETE FROM workout WHERE workoutId = ?";
    connection.query(sql, [workoutId], (error, results) => {
        if (error) {
            console.error("Error deleting workout:", error);
            return res.status(500).send("Error deleting workout");
        }
        res.redirect("/workouts");
    });
});

app.get("/addWorkouts", (req, res) => {  
    res.render("workoutsAdd");
  });
  
// add new workout 
app.post("/addWorkout", upload.single("video"), (req, res) => {
    // Handle multer errors
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
    }
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    //etract workout data from the request body
    const { exerciseName, muscleGrp, reps, weight, workoutDescription } = req.body;
    let video = req.file.filename;

    const sql = "INSERT INTO workout (exerciseName, muscleGrp, reps, weight, exampleVideo, workoutDescription) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [exerciseName, muscleGrp, reps, weight, video, workoutDescription], (error, results) => {
        if (error) {
            console.error("Error adding workout:", error);
            return res.status(500).send("Error adding workout");
        }
        console.log("Workout added successfully: ", results);
        res.redirect("/workouts");
    });
});


app.get("/editWorkouts/:id", (req, res) => {
    const workoutId = req.params.id;
    const sql = "SELECT * FROM workout WHERE workoutId = ?";
    connection.query(sql, [workoutId], (error, results) => {
        if (error) {
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving workout by ID");
        }
        if (results.length > 0) {
            res.render("workoutsEdit", { workout: results[0] });
        } else {
            res.status(404).send("workout not found");
        }
    });
});


app.post("/editWorkouts/:id", upload.single("video"), (req, res) => {
    const workoutId = req.params.id;
    const { exerciseName, muscleGrp, reps, weight, workoutDescription } = req.body;
    let video = req.body.currentVideo;

    if (req.file) {
        video = req.file.filename;
    }

    const sql = "UPDATE workout SET exerciseName = ?, muscleGrp = ?, reps = ?, weight = ?, exampleVideo = ?, workoutDescription = ? WHERE workoutId = ?";
    connection.query(sql, [exerciseName, muscleGrp, reps, weight, video, workoutDescription, workoutId], (error, results) => {
        if (error) {
            console.error("Error updating workout:", error);
            return res.status(500).send("Error updating workout");
        }
        console.log("Workout updated successfully");
        res.redirect("/workouts");
    });
});




//not sure how to do this rn will update essentially whatsapp in the app to store convo with trainer?
//app.get("/messages", (req, res) => {
//    const sql = "SELECT * FROM messages";
//    connection.query(sql, (error, results) => {
//        if (error) {
//            console.error("Database query error:", error.message);
//            return res.status(500).send("Error retrieving messages");
//        }
//        res.render("messages", { messages: results });
//    });
//});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////EVERYTHING THAT IS RELATED TO REGISTER ETC////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/register", (req, res) => {
    res.render("register", { error: " " });
});

//register route similar to lesson 8 where we add student
app.post("/register", upload.single("image"), (req, res) => {
    const { username, password, dob, contact, email, name } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }

    const sql = "INSERT INTO user (username, password, dob, contact, email, image, name) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [username, password, dob, contact, email, image, name], (error, results) => {
        if (error) {
            console.error("Error adding account:", error);
            res.status(500).send("Error adding account");
        } else {
            res.redirect("/");
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////EVERYTHING THAT IS RELATED TO LOGIN ETC///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//routeing for log in 
app.get("/logIn", (req, res) => {
    res.render("logIn", { error: " " });
});

//handling log in sudmission
app.post("/logIn", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
        connection.query(sql, [username, password], (error, results) => {
            if (error) {
                console.error("Database query error:", error.message);
                return res.status(500).send("Database error");
            }
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.userId = results[0].userId; 
                res.redirect("/profile");
            } else {
                res.render("logIn", { error: "Incorrect Username or Password!" });
            }
        });
    } else {
        res.render("logIn", { error: "Please enter Username and Password!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

