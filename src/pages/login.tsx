import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  return (
    <div className="login-container">
      <div className="card login-form" style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 className="login-title">Login Disabled</h1>
        <p>Login is temporarily disabled for all users.</p>
      </div>
    </div>
  );
} 