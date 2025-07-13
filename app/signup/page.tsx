"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log({ error: error.message, message: "signup failed" });
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            className="bg-gray-600 text-white focus:outline-none p-2"
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            className="bg-gray-600 text-white focus:outline-none p-2"
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="bg-gray-600 text-white focus:outline-none p-2"
          />
        </div>
        <button
          onClick={onSignup}
          className={`${buttonDisabled ? "bg-red-600" : "bg-green-500"} p-2`}
        >
          {buttonDisabled ? "All fields mandatory" : "Sign up"}
        </button>
        <Link href="login" className="text-center">Visit Login Page</Link>
      </div>
    </div>
  );
}
