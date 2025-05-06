const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

sequelize.sync({ /*force:true*/ }).then(() => { // remove force:true to prevent sqlite fromd dropping the table each time the server resets
  console.log("Database synced")
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
