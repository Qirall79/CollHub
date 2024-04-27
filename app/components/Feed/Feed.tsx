"use client";

import { IProject } from "@/lib/types";
import { Project } from "./Project";
import { Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import CreatePostModal from "../Modals/CreateProjectModal";
import FilterModal from "../Modals/FilterModal";

const data = [
  {
    id: "ckrp3x78g0000mktn2at2aay3",
    title: "Cub3D",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0001mktn0v4fh6sq",
        name: "C",
      },
    ],
    applications: [
      {
        id: "ckrp3x78h0005mktned3ghhdo",
        name: "User Authentication",
      },
      {
        id: "ckrp3x78h0006mktng6uy8m2m",
        name: "Product Management",
      },
      {
        id: "ckrp3x78h0007mktngwzlgwl5",
        name: "Shopping Cart",
      },
      {
        id: "ckrp3x78h0008mktngwzmhk8m",
        name: "Order Processing",
      },
    ],
    authorId: "ckrp3x78h0009mktnc54l4r81",
    author: {
      id: "ckrp3x78h0009mktnc54l4r81",
      name: "Travis Dwi",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
  {
    id: "ckrp3x78g0000mktn2at2aay4",
    title: "ft_transcendence",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0003mktn80jcl9d1",
        name: "JavaScript",
      },
      {
        id: "ckrp3x78h0004mktnc5lfepqb",
        name: "Python",
      },
    ],
    applications: [
      {
        id: "ckrp3x78h0005mktned3ghhdo",
        name: "User Authentication",
      },
      {
        id: "ckrp3x78h0006mktng6uy8m2m",
        name: "Product Management",
      },
      {
        id: "ckrp3x78h0007mktngwzlgwl5",
        name: "Shopping Cart",
      },
      {
        id: "ckrp3x78h0008mktngwzmhk8m",
        name: "Order Processing",
      },
    ],
    authorId: "ckrp3x78h0009mktnc54l4r81",
    author: {
      id: "ckrp3x78h0009mktnc54l4r81",
      name: "3abbas lkhatar",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
  {
    id: "ckrp3x78g0000mktn2at2aay5",
    title: "Webserv",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0001mktn0v4fh6sq",
        name: "Cpp",
      },
    ],
    applications: [
      {
        id: "ckrp3x78h0005mktned3ghhdo",
        name: "User Authentication",
      },
      {
        id: "ckrp3x78h0006mktng6uy8m2m",
        name: "Product Management",
      },
      {
        id: "ckrp3x78h0007mktngwzlgwl5",
        name: "Shopping Cart",
      },
      {
        id: "ckrp3x78h0008mktngwzmhk8m",
        name: "Order Processing",
      },
    ],
    authorId: "ckrp3x78h0009mktnc54l4r81",
    author: {
      id: "ckrp3x78h0009mktnc54l4r81",
      name: "maher khayb",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
];

export default async function Feed() {
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
      <div className="flex flex-col grow space-y-6">
        {data.map((project: IProject) => {
          return <Project key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}