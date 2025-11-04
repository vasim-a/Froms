"use client";
import { useState } from "react";
import "../register/page.css";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/spinner";

export default function Registrations() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const leaves = [
    "/assets/leaf_01.png",
    "/assets/leaf_02.png",
    "/assets/leaf_03.png",
    "/assets/leaf_04.png",
  ];

  const formSubmit = async () => {
    setDisabled(true);
    setLoading(true);
    try {
      const response = await axios.post("/api/register", { email, password });

      if (response.data.ok) {
        toast.success("Login Successful!");
      } else {
        toast.error(response.data.message || "Login Failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong!");
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="login-main">
        {/* Leaves animation section */}
        <div className="leaves">
          <div className="set">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <img
                  src={leaves[index % leaves.length]}
                  alt={`Leaf ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Background images */}
        <img src="/assets/bg.jpg" className="bg" alt="Background" />
        <img src="/assets/girl.png" className="girl" alt="Girl" />
        <img src="/assets/trees.png" className="trees" alt="Trees" />

        {/* Login form */}
        <div className="login">
          <h2>Sign In</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit();
            }}
          >
            <div className="inputBox">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="inputBox">
              <input type="submit" disabled={disabled} value="Login" id="btn" />
            </div>
          </form>
          <div className="group">
            <a href="#">Signup</a>
          </div>
        </div>
      </section>
      {loading && <Spinner />}
    </div>
  );
}
