const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');  // Import the Swagger config

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Set up Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Your existing routes here...
const taskRoutes = require('./routes/taskRoutes'); // Example routes file
app.use('/api/tasks', taskRoutes); // Example API endpoint

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
