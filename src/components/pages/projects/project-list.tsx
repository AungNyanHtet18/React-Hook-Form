import ButtonWrapper from "@/components/custom/button-wrapper";
import FormGroup from "@/components/custom/form-group";
import ListView from "@/components/custom/list-view";
import Page from "@/components/custom/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { searchProject } from "@/lib/client/project-client";
import type { ProjectSearch } from "@/lib/model/input/project-search";
import type { ProjectListItem } from "@/lib/model/output/project-list-item";
import { ArrowRight, Folder, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function ProjectList() {
   
   const [list, setProjectList] = useState<ProjectListItem[] | undefined>(undefined)

   useEffect(()=> {
      
      async function search(){
         const projectSearch = await searchProject(undefined)
         setProjectList(projectSearch)
      }

      search()

   },[])

   async function search(form: ProjectSearch) {
       const projectSearch = await searchProject(form)
      setProjectList(projectSearch)
   }

   return (
        <Page title="Project List" icon={<Folder/>}>
           <ListView search={<SearchForm search={search} />}>
               <ResultTable list={list} />
           </ListView >
        </Page>
     )
}

function SearchForm({search} : {search : (form:ProjectSearch) => void}) {

   const {register, handleSubmit} = useForm<ProjectSearch>()

    return (
         <form onSubmit={handleSubmit(search)} className="flex gap-2">
               <FormGroup label="Start From">
                  <Input {...register('startFrom')} type="date" />
               </FormGroup>

               <FormGroup label="Start To">
                  <Input {...register('startTo')} type="date" />
               </FormGroup>

               <FormGroup className="w-1/4" label="Keyword">
                  <Input {...register('keyword')} type="text" placeholder="Search Keyword" />
               </FormGroup>

               <ButtonWrapper>
                  <Button type="submit">
                      <Search />Search
                  </Button>

                  <Button asChild variant={"outline"} className="ms-2">
                      <Link to="/project/edit">
                         <Plus />Add New 
                      </Link>
                  </Button>
               </ButtonWrapper>
         </form>
    )
}

function ResultTable({list} : {list : ProjectListItem[] | undefined}) {

   if( list ==  undefined) {
       return (
          <div className="border-1 rounded-2xl p-2 w-2/3  text-2xl text-red-500 font-bold">There is no project </div>
       )
   }

    return (
      <Table className="border border-solid" >
         <TableHeader>
            <TableRow>
               <TableHead>ID</TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Start Date</TableHead>
               <TableHead>Due Date</TableHead>
               <TableHead className="text-end" >Tasks</TableHead>
               <TableHead></TableHead>
            </TableRow>
         </TableHeader>

         <TableBody>
               {list.map(project => 
               <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell className="text-end" >{project.tasks}</TableCell>
                  <TableCell className="flex justify-center">
                     <Link to={`/project/${project.id}`}>
                        <ArrowRight/>
                     </Link>
                  </TableCell>
               </TableRow>
               )}
            
         </TableBody>
      </Table>
    )
}