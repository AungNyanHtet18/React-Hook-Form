import FormError from "@/components/custom/form-error";
import FormGroup from "@/components/custom/form-group";
import Page from "@/components/custom/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject, projectDetails, upDateProject } from "@/lib/client/project-client";
import type { ProjectForm } from "@/lib/model/input/project-form";
import { Pencil, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

export default function ProjectEdit() {

    const {handleSubmit, register, reset, formState : {errors}} = useForm<ProjectForm>()
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const id = params.get("id")


    useEffect(() => { 
        async function load() {
            if(id) {
                 const response = await projectDetails(id)
                 reset({
                    name : response.name,
                    startDate : response.startDate,
                    dueDate : response.dueDate,
                    description : response.details
                 })
            }
        }

        load()

    }, [id, reset])

    async function save (form: ProjectForm) {

        console.log(form)

        if(id) { 
            await upDateProject(id, form)
        } else { 
            await createProject(form)
        }
           navigate(`/project`)
    }

     return (
        <Page title={id ? "Edit Project" : "Creat Project"} icon={<Pencil/>}>
            <form onSubmit={handleSubmit(save)} className="w-1/2">
                <FormGroup className="mb-4" label="Project Name">
                    <Input {...register('name',{required: true})} placeholder="Enter Project Name" />
                    {errors.name && <FormError message="Please Enter Project Name" />}
                </FormGroup>

                <div className="columns-2 mb-4">
                    <FormGroup label="Start Date">
                        <Input {...register('startDate',{required: true})} type="date" />
                        {errors.startDate && <FormError message="Please Enter Start Date" />}
                    </FormGroup>

                    <FormGroup label="Due Date">
                         <Input {...register('dueDate',{required: true})} type="date" />
                         {errors.dueDate && <FormError message="Please Enter Due Date" />}
                    </FormGroup>
                </div>

                <FormGroup label="Description" className="mb-4">
                    <Textarea {...register('description')} placeholder="Enter Description of Project" ></Textarea>
                </FormGroup>

                <Button type="submit">
                    <Save/> Save Project
                </Button>
            </form>
        </Page>
     )
}