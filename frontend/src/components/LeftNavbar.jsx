import { Disclosure } from "@headlessui/react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function LeftNavbar() {
  const { questionId } = useParams();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Disclosure
      as="nav"
      className=" fixed w-158 border rounded-xl
                  bg-gradient-to-b from-[#0f0f1a] to-[#05050d]
                 border-b border-white/10 
                 shadow-md"
    >
      <div className="mx-auto max-w-7xl px-1 sm:px-5 lg:px-1">
        <div className="relative flex h-8 items-center justify-between">
          <div className="flex flex-1 items-center justify-evenly sm:items-stretch sm:justify-evenly">
            <div className="hidden sm:block">
              <div className="flex space-x-14 text-sm font-semibold">
                <Link
                  to={`/questions/${questionId}`}
                  className={`pb-1 transition
                    ${
                      isActive(`/questions/${questionId}`)
                        ? "text-white border-b-2 border-pink-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  Problem
                </Link>

                <Link
                  to={`/questions/${questionId}/submission`}
                  className={`pb-1 transition
                    ${
                      isActive(`/questions/${questionId}/submission`)
                        ? "text-white border-b-2 border-pink-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  Submissions
                </Link>

                <Link
                  to={`/questions/${questionId}/solution`}
                  className={`pb-1 transition
                    ${
                      isActive(`/questions/${questionId}/solution`)
                        ? "text-white border-b-2 border-pink-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                  Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
