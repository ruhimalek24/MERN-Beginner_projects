const db = require("../config/db");

exports.getAllTasks = (req, res) => {
    const query = "SELECT * FROM tasks";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("Fetched tasks:", results);
        res.json(results);
    });
};

exports.addTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required!" });
    }

    const query = "INSERT INTO tasks (title, completed) VALUES (?, ?)";
    db.query(query, [title, false], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("Task added:", result);
        res.status(201).json({ message: "Task added successfully!", taskId: result.insertId, title: title });
    });
};

exports.markTaskCompleted = (req, res) => {
    const { id } = req.params;

    const query = "UPDATE tasks SET completed = ? WHERE id = ?";
    db.query(query, [true, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("Task marked as completed:", result);
        res.json({ message: "Task marked as completed!" });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("Task deleted:", result);
        res.json({ message: "Task deleted successfully!" });
    });
};
