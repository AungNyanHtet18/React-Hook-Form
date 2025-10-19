import type { TaskListItem } from "../model/output/task-list-item";
import type { TaskSearch } from "../model/schema/task-search";
import { restClient } from "../utils";

export async function searchTask(search: TaskSearch) : Promise<TaskListItem[]> {
     const response = await restClient().get('/tasks', {params : search})
    return response.data
}

