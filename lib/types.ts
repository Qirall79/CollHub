export interface IUser {
	id: string,
	name: string | null,
	discord: string | null,
	github: string | null,
	image: string | null
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
	requests?: IRequest[]
}

export interface IRequest {
	id: string,
	body?: string,
	discord: string,
	github?: string,
	senderId: string,
	projectId: string,
	ignored?: boolean,
	sender?: IUser,
	project?: IProject,
}

export interface IRequestInput {
	body?: string,
	discord: string,
	github?: string,
	projectId: string
}