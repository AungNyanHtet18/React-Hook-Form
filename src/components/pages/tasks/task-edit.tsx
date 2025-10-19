import FormError from "@/components/custom/form-error"
import FormGroup from "@/components/custom/form-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createTask, findTaskById, updateTask } from "@/lib/client/task-client"
import { TaskEditSchema, type TaskEditForm } from "@/lib/model/schema/task-search"
import { zodResolver } from "@hookform/resolvers/zod"
import { List, Save } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams, useSearchParams } from "react-router"

export default function TaskEdit() {

   const {id} = useParams()
   const [queries] = useSearchParams()
   const taskId = queries.get('taskId')

   const {register, handleSubmit,  reset, formState: {errors}} = useForm<TaskEditForm>({resolver : zodResolver(TaskEditSchema)})
   const navigate = useNavigate()

   useEffect(()=> { 
       
      if(id) {
          reset({
              projectId: id
          })
      }

   }, [id, reset])

   useEffect(()=>{
     async function load(id: unknown) {
          const response = await findTaskById(id)
          console.log(response)
          reset({
               projectId: response.projectListItem?.id.toString(),
               name: response.name,
               assignee: response.assignee,
               dueDate: response.dueDate,
               startDate: response.startDate,
               endDate: response.endDate,
               description: response.description
          })
     }

     if(taskId) {
           load(taskId)
     }

   },[taskId, reset])


   async function save(form: TaskEditForm) {
       const response = taskId ?  await updateTask(taskId, form) : await createTask(form)
        
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

            <div>
               <Button type="button" asChild>
                    <Link to= {`/project/${id}`}>
                        <List/> Task List
                    </Link>
               </Button>

               <Button className="ms-2" type="submit">
                    <Save /> Save Task
               </Button>
            </div>

       </form>
     )
}