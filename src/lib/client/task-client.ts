import type { ModificationResult } from "../model/output/modification-result";
import type { TaskListItem } from "../model/output/task-list-item";
import type { TaskEditForm, TaskSearch } from "../model/schema/task-search";
import { restClient } from "../utils";
import type { TaskDetails } from "../model/output/task-details";

export async function searchTask(search: TaskSearch) : Promise<TaskListItem[]> {
     const response = await restClient().get('/tasks', {params : search})
     return response.data
}

export async function createTask(form: TaskEditForm) : Promise<ModificationResult<number>> {
     const response = await restClient().post('/tasks', form) 
     return response.data
}

export async function findTaskById(id: unknown) : Promise<TaskDetails> {
      const response = await restClient().get(`/tasks/${id}`)
      return response.data
}

export async function updateTask(id: unknown,form: TaskEditForm) : Promise<ModificationResult<number>> {
      const response = await restClient().put(`/tasks/${id}`,form)
      return response.data
}