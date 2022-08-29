const pool = require("../config/db");

const createTask = (req, res) =>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }

        const name = req.body.Name;
        const description = req.body.Description;

        connection.query(`INSERT INTO tasktodo (Name, Description) VALUES (?,?)`, 
        [name, description], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
        console.log(`INSERT TASK NAME: ${name} | DESCRIPTION: ${description} TO DATABASE`);
    });
}

const getAllTask = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        connection.query(`SELECT * FROM tasktodo`,
            (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
        console.log("Select ALL Task");
   });
};

const updateTask = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        } 

        const name = req.body.Name;
        const description = req.body.Description;

        connection.query("UPDATE tasktodo SET Name = ?, Description = ? WHERE TaskID = ? ",
        [name, description, req.params.id], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
        console.log(`UPDATE Task ID ${req.params.id} Name: ${name} Description: ${description}`);
   });
};


const deleteTask = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        connection.query("DELETE FROM tasktodo WHERE TaskID = ?",
        [req.params.id], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
        console.log(`DELETE Task ID ${req.params.id}`);
    });
}

module.exports = { createTask, getAllTask, updateTask, deleteTask };

