import express from "express" ;
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors" ;


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Add this route at the end to handle dynamic React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// importing routers 
import adminRouter from "./routers/admin.js";
import classRouter from "./routers/class.js";
import studentRouter from "./routers/student.js";


app.use("/admin" , adminRouter);
app.use("/class" , classRouter);
app.use("/student" , studentRouter);




// connect with MongoDB database and run the server 
const port = process.env.PORT ;
mongoose.connect(process.env.DATABASE_URL).then(
    ()=>{
        console.log("connected to database");
        app.listen(port , ()=>{
            console.log("server running at port :" + port);  
        })
    }
);