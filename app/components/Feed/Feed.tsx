"use client"

import { Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import CreatePostModal from "../Modals/CreateProjectModal";
import FilterModal from "../Modals/FilterModal";
import { Projects } from "./Projects";

export default function Feed() {
  return (
    <div className="flex flex-col grow space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-2 items-center space-y-2 md:space-y-0">
        <Input
          variant="bordered"
          placeholder="Search..."
          startContent={<FiSearch color="gray" size={22} />}
        />
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <FilterModal />
          <CreatePostModal />
        </div>
      </div>
      <Projects />
    </div>
  );
}
