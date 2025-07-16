import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
import DarkModeToggle from "../components/ThemeToggle";
import GithubCorner from "react-github-corner";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const WelcomePage = () => {
  return (
    <div className="  min-h-screen  ">
      <div className="absolute top-0 w-3.5 p-1 h left-20">
        <DarkModeToggle />
      </div>
      <GithubCorner href="https://github.com/pranavkharote/smartPrep" />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          className="text-5xl font-bold mb-4 text-green-600 dark:text-green-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to SmartPrep 🚀
        </motion.h1>
        <motion.p
          className="text-lg opacity-80 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Practice coding challenges, get real-time feedback, and track your
          progress with our AI-powered smart preparation platform.
        </motion.p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/login">
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              className="bg-white text-green-600 border border-green-600 hover:bg-green-50 px-6 py-2 rounded-xl shadow-md font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 px-6 ">
        <h2 className="text-3xl font-bold text-center mb-6">⚙️ Built With</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center text-5xl text-green-600 ">
          <FaReact title="React" />
          <SiTailwindcss title="TailwindCSS" />
          <FaNodeJs title="Node.js" />
          <SiExpress title="Express" />
          <SiMongodb title="MongoDB" />
          <FaDatabase title="Mongoose" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">✨ Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Live Code Execution",
              desc: "Submit and run code in multiple languages with test cases.",
            },
            {
              title: "Smart AI Feedback",
              desc: "Get instant suggestions and explanations powered by AI.",
            },
            {
              title: "Progress Tracking",
              desc: "Monitor your journey with solved count, time, and stats.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 dash-sec bg-opacity-20 shadow-xl rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 bg-opacity-60   text-green-600">
                {feature.title}
              </h3>
              <p className="opacity-70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6 bg-green-100 dark:bg-green-900">
        <motion.h3
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to start your coding journey?
        </motion.h3>
        <Link to="/dashboard">
          <motion.button
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg mt-4 hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Dashboard
          </motion.button>
        </Link>
      </section>

      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        — 🚀 Built with love by{" "}
        <span className="text-indigo-600 font-semibold">Pranav</span> —
        <div className="mt-2 flex justify-center gap-4 text-xl">
          <a
            href="https://github.com/pranavkharote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/pranavkharote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
