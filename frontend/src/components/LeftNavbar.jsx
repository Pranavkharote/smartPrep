import { Disclosure } from "@headlessui/react";

import { Routes, Link, useParams } from "react-router-dom";

export default function LeftNavbar() {
  const { questionId } = useParams();
  return (
    <Disclosure as="nav" className=" leftNav bg-gray-300 fixed  w-158">
      <div className="mx-auto max-w-7xl px-1 sm:px-5 lg:px-1">
        <div className="relative flex h-8 items-center justify-between">
          <div className="flex flex-1 items-center justify-evenly sm:items-stretch sm:justify-evenly">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-14">
                <Link to={`/questions/${questionId}`}>Problem</Link>
                <Link to={`/questions/${questionId}/submission`}>
                  Submissions
                </Link>
                <Link to={`/questions/${questionId}/solution`}>Solutions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
