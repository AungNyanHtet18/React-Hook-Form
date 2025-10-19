import type { ProjectListItem } from "./project-list-item"

export type TaskDetails = {
     id: number
     projectListItem: ProjectListItem
     name: string
     assignee: string
     dueDate: string
     startDate?: string
     endDate?: string
     description?: string
}