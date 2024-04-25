import { IProject } from "@/lib/types";
import { Project } from "./Project";

const data = [
  {
    id: "ckrp3x78g0000mktn2at2aay3",
    title: "E-commerce Website",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0001mktn0v4fh6sq",
        name: "React.js",
      },
      {
        id: "ckrp3x78h0002mktn44ez3pbu",
        name: "Node.js",
      },
      {
        id: "ckrp3x78h0003mktn80jcl9d1",
        name: "GraphQL",
      },
      {
        id: "ckrp3x78h0004mktnc5lfepqb",
        name: "PostgreSQL",
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
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
  {
    id: "ckrp3x78g0000mktn2at2aay3",
    title: "E-commerce Website",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0001mktn0v4fh6sq",
        name: "React.js",
      },
      {
        id: "ckrp3x78h0002mktn44ez3pbu",
        name: "Node.js",
      },
      {
        id: "ckrp3x78h0003mktn80jcl9d1",
        name: "GraphQL",
      },
      {
        id: "ckrp3x78h0004mktnc5lfepqb",
        name: "PostgreSQL",
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
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
  {
    id: "ckrp3x78g0000mktn2at2aay3",
    title: "E-commerce Website",
    description:
      "Building a responsive e-commerce platform for online shopping.",
    createdAt: "2024-04-25T12:00:00Z",
    technologies: [
      {
        id: "ckrp3x78h0001mktn0v4fh6sq",
        name: "React.js",
      },
      {
        id: "ckrp3x78h0002mktn44ez3pbu",
        name: "Node.js",
      },
      {
        id: "ckrp3x78h0003mktn80jcl9d1",
        name: "GraphQL",
      },
      {
        id: "ckrp3x78h0004mktnc5lfepqb",
        name: "PostgreSQL",
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
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: "2023-11-15T08:00:00Z",
    },
  },
];

export default function Feed() {
  return <div className="flex flex-col grow space-y-6">
	{data.map((project: IProject) => {
		return <Project key={project.id} project={project} />
	})}
  </div>;
}
