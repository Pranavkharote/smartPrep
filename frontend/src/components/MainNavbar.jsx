import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DarkModeToggle from "./ThemeToggle";
const navigation = [{ name: "Dashboard", href: "/", current: true }];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainNavbar() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/questions", {
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
    <Disclosure as="nav" className="bg-gray-100 mainNav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <button className="flex px-2 rounded-2xl text-2xl">
                <a href="/questions">
                  <i className="fa-solid fa-left-long "></i>
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
                        ? "bg-white border text-[#222222] mainNav"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-[#e1e1e1 ] mx-5 text-3xl ps-3 c">
              {prevQuestion ? (
                <Link to={`/questions/${prevQuestion._id}`}>
                  <i class="fa-solid fa-angle-left mr-3 "></i>
                </Link>
              ) : (
                <span className="">
                  <i className="fa-solid fa-angle-left cursor-not-allowed mr-3"></i>
                </span>
              )}
              {nextQuestion ? (
                <Link to={`/questions/${nextQuestion._id}`}>
                  <i className="fa-solid fa-angle-right mr-3 "></i>
                </Link>
              ) : (
                <span className="cursor-not-allowed">
                  <i className="fa-solid fa-angle-right mr-3"></i>
                </span>
              )}
              
            </div>
            <div className=" h-[20px] text-[12px] ms-4 font-medium">
              <p>See all the Questions List</p>
              <a
                href="/questions"
                className="text-center text-blue-400 font-bold hover:underline"
              >
                All Problems
              </a>
            </div>

          </div>
            <DarkModeToggle  />
        </div>
      </div>

         </Disclosure>
  );
}
