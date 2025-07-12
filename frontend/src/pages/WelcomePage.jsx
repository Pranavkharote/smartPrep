import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center px-4">
        <motion.img
          src="\ChatGPT Image Jul 12, 2025, 01_36_46 PM.png"
          alt="SmartPrep Logo"
          className="w-24 h-24 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
        <h1 className="text-4xl font-bold text-green-700 mb-4">SmartPrep</h1>
        <p className="max-w-xl text-lg text-gray-600 mb-6">
          Code. Practice. Succeed. — SmartPrep helps you master DSA, track your progress, and prepare for tech interviews with ease.
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-lg">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Multi-language Code Editor (Java, C++, Python, JS)",
            "Auto Test Case Evaluation like LeetCode",
            "Code Submission History",
            "Personalized Dashboard",
            "AI-powered Code Explanation",
            "Authentication with JWT & Clerk/Firebase"
          ].map((feature, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-green-700 mb-2">✅ {feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-white to-green-50">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">Tech Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {[
            "React + TailwindCSS + ShadCN UI",
            "Node.js + Express",
            "MongoDB",
            "JWT Authentication",
            "Piston API for Code Execution",
            "Vercel + Render Deployment"
          ].map((tech, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md">
              <p className="text-gray-700 font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Start Practicing Today</h2>
        <Link to="/dashboard">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg">
            Go to Dashboard
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        Built with ❤️ by Pranav · © {new Date().getFullYear()} SmartPrep
      </footer>
    </div>
  );
};

export default Home;
