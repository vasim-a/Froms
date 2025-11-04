"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "../[mode]/page.css";
import axios from "axios";
import Spinner from "../../components/spinner";

export default function AuthPage() {
  const router = useRouter();
  const { mode } = useParams(); // "login" or "signup"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // for signup only
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    setSignup(mode === "signup");
  }, [mode]);

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
      const endpoint = signup ? "/api/register" : "/api/login";
      const payload = signup ? { name, email, password } : { email, password };

      const response = await axios.post(endpoint, payload);
      if (response.data.OK) {
        if (signup) {
          toast.success("User created successfully! Redirecting to login page...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 4000);
          return;
        }
        toast.success("Login Successful!");
      } else {
        toast.error(response.data.error || "Something went wrong!");
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
        {/* Leaves animation */}
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

        {/* Backgrounds */}
        <img src="/assets/bg.jpg" className="bg" alt="Background" />
        <img src="/assets/girl.png" className="girl" alt="Girl" />
        <img src="/assets/trees.png" className="trees" alt="Trees" />

        {/* Auth form */}
        <div className="login">
          <h2>{signup ? "Sign Up" : "Sign In"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit();
            }}
          >
            {signup && (
              <div className="inputBox">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
            )}
            <div className="inputBox">
              <input
                type="email"
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
              <input
                type="submit"
                disabled={disabled}
                value={signup ? "Signup" : "Login"}
                id="btn"
              />
            </div>
          </form>

          <div className="group">
            {signup ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/login");
                }}
              >
                Already have an account? <span className="link">Login</span>
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/signup");
                }}
              >
                Don’t have an account? <span className="link"> Signup</span>
              </a>
            )}
          </div>
        </div>
      </section>
      {loading && <Spinner />}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
