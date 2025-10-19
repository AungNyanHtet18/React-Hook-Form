import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "@/components/custom/form-group";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import ButtonWrapper from "@/components/custom/button-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search } from "lucide-react";
import { TaskSearchSchema, type TaskSearch } from "@/lib/model/schema/task-search";
import { searchTask } from "@/lib/client/task-client";
import type { TaskListItem } from "@/lib/model/output/task-list-item";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TaskList() {

   const [list, setList] = useState<TaskListItem[]>([])

   async function search(form: TaskSearch) { 
         const response = await searchTask(form)
         setList(response)
   }

     return (
        <>
           <SearchForm  search= {search}/>
           <ResultTable  list= {list}  />
         </>
     )
}

function SearchForm({search} : {search: (form: TaskSearch)=> void}) {

    const {id} = useParams()
    const {register, handleSubmit, resetField} = useForm<TaskSearch>({resolver: zodResolver(TaskSearchSchema)})

    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(()=> {

      if(id) {
        resetField('projectId', {defaultValue : id})   
        formRef.current?.requestSubmit()
      }
      
   }, [id, resetField])

     return (
         <form ref={formRef} onSubmit={handleSubmit(search)} className="flex gap-2">

               <Input type= "hidden"  {...register('projectId')} />
               
               <FormGroup label= "Start From">
                  <Input type= "date" {...register('startFrom')} />
               </FormGroup>

               <FormGroup label= "Start To">
                   <Input type= "date" {...register('startTo')} />
               </FormGroup>

                <FormGroup label= "Keyword">
                     <Input {...register('keyword')}  placeholder="Search Keyword" />
                </FormGroup>

                <ButtonWrapper>
                   <Button type= "submit">
                        <Search /> Search
                   </Button>

                   <Button asChild className="ms-1">
                       <Link to={`/project/${id}/task/edit`}>
                           <Plus /> Create Task
                       </Link>
                   </Button>
                </ButtonWrapper>
           </form>
     )
}

function ResultTable({list} : {list: TaskListItem[]}) {
    
  const {id} = useParams()
     


  if(list.length == 0 ) { 
      return (
            <div className="border-1 rounded-2xl p-2 w-2/3 text-2xl  text-red-500 font-bold mt-2">
                There is no task
            </div>)
    }
    
    return (
        <Table className="border border-solid mt-2">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

             <TableBody>
                {list.map(task =>
                <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>{task.startDate}</TableCell>
                    <TableCell>{task.endDate}</TableCell>
                    <TableCell>
                        <Link to={`/project/${id}/task/${task.id}`}>
                           <ArrowRight/>
                        </Link>
                    </TableCell>
                </TableRow>
                )}
             </TableBody>
        </Table>
     )
}
