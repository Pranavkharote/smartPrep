import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";
import DarkModeToggle from "../components/ThemeToggle";
import GithubCorner from "react-github-corner";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const WelcomePage = () => {
  const router = useNavigate();

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router("/dashboard");
    } else {
      router("/auth");
    }
  };

  return (
    <div className="min-h-screen">
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
          className="text-lg opacity-80 max-w-xl text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Practice coding challenges, get real-time feedback, and track your
          progress with our AI-powered smart preparation platform.
        </motion.p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/auth">
            <motion.button
              className="bg-white text-green-600 border border-green-600 hover:bg-green-50 px-6 py-2 rounded-xl shadow-md font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try for Free
            </motion.button>
          </Link>
        </div>
      </section>

      {/* TECH STACK */}
{/* BUILT WITH */}
<section className="py-24 px-6  ">
  <motion.h2
    className="text-4xl font-extrabold text-center mb-6 text-green-700 dark:text-green-400 tracking-tight"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    ⚙️ Built With Modern Technologies
  </motion.h2>
  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14 text-lg opacity-90">
    SmartPrep is powered by cutting-edge web technologies designed for speed, scalability, and seamless user experience.
  </p>

  <div className=" text-gray-700 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 justify-items-center max-w-6xl mx-auto text-green-600">
    {[
      { icon: <FaReact className="text-6xl" />, name: "React" },
      { icon: <SiTailwindcss className="text-6xl" />, name: "TailwindCSS" },
      { icon: <FaNodeJs className="text-6xl" />, name: "Node.js" },
      { icon: <SiExpress className="text-6xl" />, name: "Express.js" },
      { icon: <SiMongodb className="text-6xl" />, name: "MongoDB" },
      { icon: <FaDatabase className="text-6xl" />, name: "Mongoose" },
      // extended extras
      {/* { icon: <i className="devicon-javascript-plain text-6xl"></i>, name: "JavaScript" },
      { icon: <i className="devicon-github-original text-6xl"></i>, name: "GitHub" },
      { icon: <i className="devicon-restapi-plain text-6xl"></i>, name: "REST API" }, */}
    ].map((tech, i) => (
      <motion.div
        key={i}
        className="flex flex-col items-center group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-200/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="transition-transform transform group-hover:scale-110 duration-300">
            {tech.icon}
          </div>
        </div>
        <p className="mt-3 text-base font-medium text-gray-900 dark:text-gray-400">
          {tech.name}
        </p>
      </motion.div>
    ))}
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
      {
        title: "Multi-Language Support",
        desc: "Write code in C++, Java, Python, and JavaScript — all inside one unified editor.",
      },
      {
        title: "In-Browser Editor",
        desc: "A fast and modern editor with syntax highlighting and real-time code validation.",
      },
      
      {
        title: "AI-Powered Hints",
        desc: "Get dynamic hints and step-by-step guidance without revealing full solutions.",
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
        <h3 className="text-xl font-semibold mb-2 bg-opacity-60 text-green-600">
          {feature.title}
        </h3>
        <p className="opacity-70">{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* HOW IT WORKS */}
      <section className="py-20 px-6 ">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700 dark:text-green-400">
          🧠 How SmartPrep Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              step: "1️⃣",
              title: "Pick a Problem",
              desc: "Choose from curated DSA questions categorized by difficulty and topic.",
            },
            {
              step: "2️⃣",
              title: "Code in Real-Time",
              desc: "Write and execute code instantly in multiple languages with test case validation.",
            },
            {
              step: "3️⃣",
              title: "Get AI Insights",
              desc: "Receive AI-powered explanations, feedback, and optimization tips to improve faster.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className=" shadow-lg rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{item.step}</div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {item.title}
              </h3>
              <p className="opacity-70">{item.desc}</p>
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
        <motion.button
          onClick={isLoggedIn}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg mt-4 hover:bg-green-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Dashboard
        </motion.button>
      </section>

      {/* FOOTER */}
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
