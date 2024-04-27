import { Application, Technology } from "@prisma/client";

export interface IUser {
	name?: string,
	email?: string,
	image?: string,
}

export interface IProjectInput {
	title: string,
	description?: string,
	technologies: string
}

export interface IProject {
	id: string,
	title: string,
	description?: string,
	technologies: Technology[],
	author: IUser,
	applications: IApplication[]
}


export interface IApplication {
	id: string,
	name: string
}