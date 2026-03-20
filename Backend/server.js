import app from "./src/app.js";
import connectDB from "./src/config/database/db.js";

const PORT = process.env.PORT || 3000;

//connect to database

connectDB().then(() => {
    // server listening
    app.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT} at http://localhost:${PORT}`)
    })

})

