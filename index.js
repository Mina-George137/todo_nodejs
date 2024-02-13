// init express
const express = require('express');
const app = express();

// use dotenv to secure the environment variables
require('dotenv').config();
const port = process.env.PORT;

// use cors to allow requests from the frontend
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// use body-parser to parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));


// init database connection
const initConnection = require('./DB/config');
initConnection();

// use the routes
const {userRoutes, taskRoutes} = require('./src/routes/routes');
app.use('/user', userRoutes);
app.use('/task', taskRoutes);


app.get('/', (req, res) => {res.json({message: 'TO-DO app listening'})})


app.listen(port, () => console.log('TO-DO app listening on port ' + port +'!'))

/*
**User Module APIs:**
User Registration API: DONE
    POST /api/users/register: Register a new user. It typically accepts user details like username, email, and password.
User Login API:
    POST /api/users/login: Authenticate a user by username/email and password. It returns an authentication token upon successful login.
User Profile API: DONE
    GET /api/users/profile: Retrieve the user's profile information. Requires authentication.
User Update Profile API: DONE
    PUT /api/users/profile: Update the user's profile information. Requires authentication.
User Logout API: DONE
    POST /api/users/logout: Invalidate the current user session. Requires authentication.

**Task Module APIs:**
Task Creation API:
    POST /api/tasks: Create a new task. It accepts task details such as title, description, due date, etc. Requires authentication.
Task List API:
    GET /api/tasks: Retrieve a list of tasks for the authenticated user.
Task Details API:
    GET /api/tasks/:taskId: Retrieve details of a specific task identified by taskId. Requires authentication.
Task Update API:
    PUT /api/tasks/:taskId: Update details of a specific task identified by taskId. Requires authentication.
Task Deletion API:
    DELETE /api/tasks/:taskId: Delete a specific task identified by taskId. Requires authentication.
Task Mark as Completed API:
    POST /api/tasks/:taskId/complete: Mark a specific task identified by taskId as completed. Requires authentication.
Task Search API:
    GET /api/tasks/search?q=<query>: Search for tasks based on a query string. Requires authentication.
Task Filtering API:
    GET /api/tasks?status=<status>&priority=<priority>: Filter tasks based on status and priority. Requires authentication. 
*/