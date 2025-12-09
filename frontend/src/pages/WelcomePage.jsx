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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#080812] to-[#05050d] text-white">
      <div className="absolute top-4 left-6 flex items-center gap-3 z-50">
        {/* <DarkModeToggle /> */}
      </div>

      <GithubCorner href="https://github.com/pranavkharote/smartPrep" />

      <section className="flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight 
                 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
                 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SmartPrep
        </motion.h1>

        <motion.p
          className="text-lg opacity-80 max-w-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Practice real coding problems, get AI-powered feedback, and track your
          growth — all in one modern preparation platform.
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={isLoggedIn}
            className="bg-gradient-to-r from-purple-500 to-pink-600 
                   px-7 py-3 rounded-full font-bold text-white 
                   shadow-[0_0_30px_rgba(236,72,153,0.6)]
                   hover:scale-110 transition"
            whileTap={{ scale: 0.95 }}
          >
            🚀 Try for Free
          </motion.button>
        </div>
      </section>

      <section className="py-24 px-6">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-6 text-cyan-400 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ⚙️ Built With Modern Technologies
        </motion.h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
          SmartPrep is engineered with scalable, production-ready technologies.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 justify-items-center max-w-6xl mx-auto text-cyan-400">
          {[
            { icon: <FaReact className="text-6xl" />, name: "React" },
            {
              icon: <SiTailwindcss className="text-6xl" />,
              name: "TailwindCSS",
            },
            { icon: <FaNodeJs className="text-6xl" />, name: "Node.js" },
            { icon: <SiExpress className="text-6xl" />, name: "Express.js" },
            { icon: <SiMongodb className="text-6xl" />, name: "MongoDB" },
            { icon: <FaDatabase className="text-6xl" />, name: "Mongoose" },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="group-hover:scale-110 transition">
                {tech.icon}
              </div>
              <p className="mt-3 text-base font-medium text-gray-300">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">
          ✨ Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["Live Code Execution", "Run & submit code with real test cases."],
            ["Smart AI Feedback", "Instant code explanations and suggestions."],
            ["Progress Tracking", "Track solved problems and time spent."],
            ["Multi-Language Support", "C++, Java, Python & JavaScript."],
            ["In-Browser Editor", "Fast syntax-highlighted IDE."],
            ["AI-Powered Hints", "Step-by-step guidance without spoilers."],
          ].map(([title, desc], i) => (
            <motion.div
              key={i}
              className="bg-black/40 border border-white/10 shadow-xl rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                {title}
              </h3>
              <p className="text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-pink-400">
          🧠 How SmartPrep Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            ["1️⃣", "Pick a Problem", "Choose from curated DSA questions."],
            ["2️⃣", "Code in Real-Time", "Run and validate instantly."],
            ["3️⃣", "Get AI Insights", "Learn faster with smart feedback."],
          ].map(([step, title, desc], i) => (
            <motion.div
              key={i}
              className="bg-black/40 border border-white/10 shadow-xl rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-4xl mb-3">{step}</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {title}
              </h3>
              <p className="text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-6 
                   bg-gradient-to-r from-purple-400 to-pink-500 
                   bg-clip-text text-transparent"
          >
            🧠 SmartPrep AI — Built Around Your Code
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            SmartPrep doesn’t use AI as a chatbot on the side. The AI here works
            directly with your{" "}
            <span className="text-white font-semibold">
              problem, your code, and your intent
            </span>
            . Every suggestion is generated using your live editor state and the
            current question context.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              {
                label: "✨ Understand Problem",
                desc: "Explains the problem in simple language",
              },
              {
                label: "🤖 Explain My Code",
                desc: "Breaks down what your solution is doing line-by-line",
              },
              {
                label: "🧾 Summarize Code",
                desc: "Gives a high-level overview in seconds",
              },
              {
                label: "🧩 Review Code",
                desc: "Finds issues and suggests improvements",
              },
              {
                label: "🧠 Logic Help",
                desc: "Guides you toward the right approach",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
            bg-black/40 border border-white/10 
            rounded-2xl px-5 py-4 
            shadow-lg backdrop-blur
            text-left
          "
              >
                <p className="text-sm font-semibold text-cyan-400">
                  {item.label}
                </p>
                <p className="text-xs mt-1 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-12 max-w-3xl mx-auto leading-relaxed">
            Unlike generic AI tools, SmartPrep’s AI is always aware of the
            current problem statement, your written solution, and your execution
            output — making the feedback specific, not generic.
          </p>
        </div>
      </section>

      <section className="text-center py-24 px-6">
        <motion.h3 className="text-3xl font-bold mb-6 text-white">
          Ready to start your coding journey?
        </motion.h3>

        <motion.button
          onClick={isLoggedIn}
          className="bg-gradient-to-r from-purple-500 to-pink-600 
                 px-8 py-3 rounded-full font-bold text-white 
                 shadow-[0_0_30px_rgba(236,72,153,0.6)]
                 hover:scale-110 transition"
        >
          Go to Dashboard
        </motion.button>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400 border-t border-white/10">
        — 🚀 Built by{" "}
        <span className="text-cyan-400 font-semibold">Pranav</span> —
        <div className="mt-3 flex justify-center gap-6 text-xl">
          <a
            href="https://github.com/pranavkharote"
            target="_blank"
            className="hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/pranavkharote"
            target="_blank"
            className="hover:text-white"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
