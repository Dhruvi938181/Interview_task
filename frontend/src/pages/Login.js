import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={login}>
          <input className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

          <input className="form-control mb-3" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          New user?
          <Link to="/"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
