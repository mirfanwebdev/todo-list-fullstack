const express = require("express");
const pool = require("./db");
const authenticate = require("./middleware/auth");

const router = express.Router();

// Get all todos for user
router.get("/", authenticate, async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      req.userId,
    ]);
    // const todos = await pool.query("SELECT * FROM todos");

    res.status(200).json(todos.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
router.post("/", authenticate, async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *",
      [req.userId, task]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo (mark as completed)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_complete } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todos SET is_complete - $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [is_complete, id, req.userId]
    );

    res.status(200).json(updatedTodo.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [
      id,
      req.userId,
    ]);

    res.status(200).json({ message: "Todo successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
