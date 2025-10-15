export type TaskListItem = {
     id : number
     projectId : number
     project : string
     name : string
     assignee : string
     dueDate? : string
     startDate? : string
     endDate? : string
}