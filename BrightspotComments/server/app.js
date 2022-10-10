const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Routers
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
