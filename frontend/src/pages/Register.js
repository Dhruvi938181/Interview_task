import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/register", { name, email, password });

    alert("Registration successful");

    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        <form onSubmit={register}>
          <input className="form-control mb-3" placeholder="Name" onChange={(e) => setName(e.target.value)} />

          <input className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

          <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-primary w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
