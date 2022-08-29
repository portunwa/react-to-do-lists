require('dotenv').config();

const express = require('express');
const cors = require("cors");

const { getAllTask, createTask, updateTask, deleteTask } = require('./controller/taskhandle');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'API running' });
});

//CRUD TO-DO
app.get('/api/task', getAllTask);
app.post('/api/createtask', createTask);
app.put('/api/updatetask/:id', updateTask);
app.delete('/api/deletetask/:id', deleteTask);

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => console.log(`TODOLIST Server is running on port ${PORT}`));

