const mongoose = require("mongoose");

const uri = "mongodb+srv://nomanmangalzai4:Katapoorkooz1@cluster0.nvltbzm.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log("No connection"));

// const connectDB = async () => {
//   try {
//     const DB =
//       "mongodb+srv://nomanmangalzai4:noman123@cluster0.pye8sfv.mongodb.net/DawoodzaiMallDb?retryWrites=true&w=majority";
//     mongoose.connect(DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connection successful");
//   } catch (error) {
//     console.log("No connection");
//   }
// };
// mongoose.connect(
//   "mongodb://localhost:27017/DawoodzaiMallDb",
//   (err, success) => {
//     if (err) {
//       console.log("connection failed");
//     }
//     if (success) {
//       console.log("connection successful to Local Mongodb");
//     }
//   }