import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Submission from "./Submission";
import { Routes, Link, useParams } from "react-router-dom";

export default function LeftNavbar() {
  const { questionId} = useParams();
  return (
    <Disclosure as="nav" className="bg-gray-300 fixed  w-153">
      <div className="mx-auto max-w-7xl px-1 sm:px-5 lg:px-1" >
        <div className="relative flex h-8 items-center justify-between">
          <div className="flex flex-1 items-center justify-evenly sm:items-stretch sm:justify-evenly">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-14" >
          <Link to={`/questions/${questionId}`}>Problem</Link>
          <Link to={`/questions/${questionId}/submission`}>Submissions</Link>
          <Link to={`/questions/${questionId}/solution`}>Solutions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
