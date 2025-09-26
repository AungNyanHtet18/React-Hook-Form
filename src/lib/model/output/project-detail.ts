import type { TaskListItem } from "./task-list-item"

export type  ProjectDeatil = { 
    id : number,
    name : string,
    startDate : string,
    dueDate : string,
    details : string,
    tasks : TaskListItem[]
}