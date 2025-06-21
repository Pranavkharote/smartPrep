import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <Disclosure as="nav" className="bg-gray-800 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <button className="flex px-2 rounded-2xl text-white text-2xl">
                <a href="/questions">
                  <i class="fa-solid fa-left-long"></i>
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
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-white mx-5 text-3xl ps-3">
                {prevQuestion ? (
      <Link
        to={`/questions/${prevQuestion._id}`}
       
      >
        <i class="fa-solid fa-angle-left mr-3"></i>
      </Link>
    ) : (
      <span className="">
       <i class="fa-solid fa-angle-left cursor-not-allowed mr-3"></i>
      </span>
    )}
     {nextQuestion ? (
      <Link
        to={`/questions/${nextQuestion._id}`}>
       <i class="fa-solid fa-angle-right mr-3"></i>
      </Link>
    ) : (
      <span className="cursor-not-allowed">
       <i class="fa-solid fa-angle-right mr-3"></i>
      </span>
    )}
              {/* <Link to={`/questions/${nextQuestion._id}`}>
                <i class="fa-solid fa-angle-right mr-3"></i>
              </Link> */}
            </div>
            <div className="text-white h-[20px] text-[12px] ms-4 font-medium">
              <p>See all the Questions List</p>
              <a
                href="/questions"
                className="text-center text-blue-400 font-bold hover:underline"
              >
                All Problems
              </a>
            </div>

            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
