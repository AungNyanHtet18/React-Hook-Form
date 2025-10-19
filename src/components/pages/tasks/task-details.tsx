import FormGroup from "@/components/custom/form-group";
import { Button } from "@/components/ui/button";
import { findTaskById } from "@/lib/client/task-client";
import type { TaskDetails } from "@/lib/model/output/task-details";
import { Edit, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function TaskDetails() {

   const {id,taskId} = useParams()
   const [details, setDetails] = useState<TaskDetails>();

   useEffect(()=> {

      async function load() {
         if(taskId) {
            const response = await findTaskById(taskId)
            setDetails(response)
         }
      }

      load()

   }, [taskId])

   if(!details) {
       return <></>
   }

     return (
        <>
           <div className="grid grid-cols-2 gap-4 mb-4">
               <FormGroup label= "Task Name">
                  <div className="form-control">{details.name} </div>
               </FormGroup>

                <FormGroup label= "Assignee">
                  <div className="form-control">{details.assignee}</div>
               </FormGroup>
           </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
               <FormGroup label= "Due Date">
                  <div className="form-control">{details.dueDate || 'Not Yet'}</div>
               </FormGroup>

                <FormGroup label= "Start Date">
                  <div className="form-control">{details.startDate || 'Not Yet'}</div>
               </FormGroup>

               <FormGroup label= "End Date">
                  <div className="form-control">{details.endDate || 'Not Yet'}</div>
               </FormGroup>
           </div>

            <FormGroup label="Description" className="mb-4">
               <div className="form-control h-20">
                  {details.description || 'No Description'}
               </div>
            </FormGroup>

            <div>
               <Button asChild>
                   <Link to={`/project/${id}`}>
                      <List/> Task List
                   </Link>
               </Button>

               <Button asChild className="ms-2">
                   <Link to={`/project/${id}/task/edit?taskId=${taskId}`}>
                      <Edit/>Edit
                   </Link>
               </Button>
            </div>

        </>
     )
}