import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import DarkModeToggle from "./ThemeToggle";

const navigation = [{ name: "Dashboard", href: "/dashboard", current: true }];
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainNavbar() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/questions`, {
          withCredentials: true,
        });
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  const { questionId } = useParams();
  const currentIndex = questions
    ? questions.findIndex((q) => q._id === questionId)
    : -1;

  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex >= 0 && currentIndex < questions.length - 1
      ? questions[currentIndex + 1]
      : null;

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-[#0b0b15] to-[#05050d] border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
 
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            {/* Back Button */}
            <div className="flex shrink-0 items-center">
              <button className="flex px-3 py-1.5 rounded-full text-lg text-gray-300 hover:text-white hover:bg-white/10 transition">
                <a href="/questions">
                  <i className="fa-solid fa-left-long"></i>
                </a>
              </button>
            </div>
 
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-gray-400 hover:bg-white/10 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium transition"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
 
            <div className="text-gray-300 mx-5 text-2xl ps-3 flex items-center">
              {prevQuestion ? (
                <Link to={`/questions/${prevQuestion._id}`}>
                  <i
                    className="fa-solid fa-angle-left mr-4 hover:text-white transition"
                    title="Previous Question"
                  ></i>
                </Link>
              ) : (
                <span>
                  <i className="fa-solid fa-angle-left mr-4 text-gray-700 cursor-not-allowed"></i>
                </span>
              )}

              {nextQuestion ? (
                <Link to={`/questions/${nextQuestion._id}`}>
                  <i
                    className="fa-solid fa-angle-right mr-3 hover:text-white transition"
                    title="Next Question"
                  ></i>
                </Link>
              ) : (
                <span className="cursor-not-allowed">
                  <i className="fa-solid fa-angle-right mr-3 text-gray-700"></i>
                </span>
              )}
            </div>

            
            <div className="h-[20px] text-[12px] ms-4 font-medium text-gray-400">
              <p>See all the Questions</p>
              <a
                href="/questions"
                className="text-blue-400 font-bold hover:underline"
              >
                All Problems
              </a>
            </div>
          </div>

 
        </div>
      </div>
    </Disclosure>
  );
}
