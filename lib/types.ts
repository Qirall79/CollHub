import { Application } from "@prisma/client";

export interface IUser {
	id: string,
	name: string | null,
	email: string | null,
	image: string | null,
}

export interface IProjectInput {
	title: string,
	description?: string,
	technologies: string
}

export interface IProject {
	id: string,
	title: string,
	description: string | null,
	technologies: string,
	author: IUser,
	applications?: IApplication[]
}


export interface IApplication {
	id: string,
	name: string
}