import FormGroup from "@/components/custom/form-group";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { Link, useParams } from "react-router";

export default function TaskDetails() {

   const {id,taskId} = useParams()

     return (
        <>
           <div className="grid grid-cols-2 gap-4 mb-4">
               <FormGroup label= "Task Name">
                  <div className="form-control">Task Name</div>
               </FormGroup>

                <FormGroup label= "Task Name">
                  <div className="form-control">Task Name</div>
               </FormGroup>
           </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
               <FormGroup label= "Task Name">
                  <div className="form-control">Task Name</div>
               </FormGroup>

                <FormGroup label= "Task Name">
                  <div className="form-control">Task Name</div>
               </FormGroup>

               <FormGroup label= "Task Name">
                  <div className="form-control">Task Name</div>
               </FormGroup>
           </div>

            <FormGroup label="Description" className="mb-4">
               <div className="form-control h-20">
                  Description
               </div>
            </FormGroup>

            <div>
               <Button asChild>
                   <Link to={`/project/${id}`}>
                      <ArrowLeft/>Back
                   </Link>
               </Button>

               <Button asChild className="ms-2">
                   <Link to={``}>
                      <Edit/>Edit
                   </Link>
               </Button>
            </div>

        </>
     )
}