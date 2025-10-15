import type { ProjectForm } from "../model/input/project-form";
import type { ProjectSearch } from "../model/input/project-search";
import type { ModificationResult } from "../model/output/modification-result";
import type { ProjectDetail } from "../model/output/project-detail";
import type { ProjectListItem } from "../model/output/project-list-item";
import { restClient } from "../utils";

export async function createProject(form: ProjectForm): Promise<ModificationResult<number>> {
     const response = await restClient().post('projects',form)
     return response.data
}

export async function upDateProject(id: number, form: ProjectForm): Promise<ModificationResult<number>> {
      const response = await restClient().put(`projects/${id}`,form)
      return response.data
}

export async function searchProject(search: ProjectSearch): Promise<ProjectListItem[]> {
     const response = await restClient().get('projects',{params: search})
     return response.data
}

export async function  projectDetails(id: unknown): Promise<ProjectDetail> {
      const response = await restClient().get(`projects/${id}`) 
      return response.data
}
