// This file will handle connection logic to the MongoDB database

const mongoose = require("mongoose");

// mongodb://127.0.0.1:27017/MyApp
mongoose.Promise = global.Promise;
mongoose
    .connect(
        "mongodb+srv://the_steve_21:%40Steve21@myapp.ghalrjr.mongodb.net/MyApp",
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to MongoDB successfully :)");
    })
    .catch((e) => {
        console.log("Error while attempting to connect to MongoDB");
        console.log(e);
    });

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
    mongoose,
};
