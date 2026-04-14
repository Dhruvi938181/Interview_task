import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (editId) {
      await axios.put(
        "http://localhost:5000/api/tasks/" + editId,
        { title: task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/tasks/add",
        { title: task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }

    setTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete("http://localhost:5000/api/tasks/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  const toggleComplete = async (t) => {
    await axios.put(
      "http://localhost:5000/api/tasks/" + t._id,
      { completed: !t.completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchTasks();
  };

  const editTask = (t) => {
    setTask(t.title);
    setEditId(t._id);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Task Dashboard</h3>

        <div className="d-flex gap-2 mb-4">
          <input className="form-control" placeholder="Enter task..." value={task} onChange={(e) => setTask(e.target.value)} />

          <button className="btn btn-primary" onClick={addTask}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div className="mb-4 text-center">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter("all")}>
            All
          </button>

          <button className="btn btn-outline-success me-2" onClick={() => setFilter("completed")}>
            Completed
          </button>

          <button className="btn btn-outline-warning" onClick={() => setFilter("pending")}>
            Pending
          </button>
        </div>

        <ul className="list-group">
          {filteredTasks.map((t) => (
            <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}>
                {t.title}
              </span>

              <div>
                <button className="btn btn-sm btn-success me-2" onClick={() => toggleComplete(t)}>
                  {t.completed ? "Undo" : "Complete"}
                </button>

                <button className="btn btn-sm btn-warning me-2" onClick={() => editTask(t)}>
                  Edit
                </button>

                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
