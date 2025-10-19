import FormError from "@/components/custom/form-error"
import FormGroup from "@/components/custom/form-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createTask } from "@/lib/client/task-client"
import { TaskEditSchema, type TaskEditForm } from "@/lib/model/schema/task-search"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"

export default function TaskEdit() {

   const {id} = useParams()
   const {register, handleSubmit,  resetField, formState: {errors}} = useForm<TaskEditForm>({resolver : zodResolver(TaskEditSchema)})

   const navigate = useNavigate()

   useEffect(()=> { 
       
      if(id) {
          resetField('projectId', {defaultValue: id})
      }

   }, [id, resetField])

   async function save(form: TaskEditForm) {
       console.log(form)
       const response = await createTask(form)

       if(response.success) {
            navigate(`/project/${id}`)
       }
   } 

     return (
       <form onSubmit={handleSubmit(save)}>
            <input type="hidden" {...register('projectId')} />
            
            <div className="grid grid-cols-2 gap-4 mb-3">
               <FormGroup label= "Task Name" >
                    <Input {...register('name')} placeholder= "Enter Task Name" />
                    {errors.name && <FormError message = "Plese enter task name." />}
               </FormGroup>

               <FormGroup label= "Assignee" >
                    <Input {...register('assignee')} placeholder = "Enter Assignee" />
                     {errors.assignee && <FormError message = "Please enter assignee." />}
               </FormGroup>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
               <FormGroup label="Due Date" >
                    <Input {...register('dueDate')} type = "date" />
                    {errors.dueDate && <FormError message = "Please enter due date" />}
               </FormGroup>

               <FormGroup label="Start Date" >
                    <Input {...register('startDate')} type = "date" />
                    {errors.startDate && <FormError message = "Please enter start date" />}
               </FormGroup>

               <FormGroup label="End Date" >
                    <Input {...register('endDate')} type = "date" />
                    {errors.endDate && <FormError message = "Please enter end date" />}
               </FormGroup>
            </div>

            <FormGroup className="mb-3" label="Description"  >
                 <Textarea {...register('description')} placeholder="Enter Description" />
            </FormGroup>

            <Button type="submit">
               <Save /> Save Task
            </Button>
       </form>
     )
}