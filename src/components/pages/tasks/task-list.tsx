import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import FormGroup from "@/components/custom/form-group";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router";
import { useEffect } from "react";

const SearchFormSchema = z.object({
    projectId: z.number(),
    startFrom: z.string(),
    startTo: z.string(),
    keyword: z.string()
})


type SearchForm = z.infer<typeof SearchFormSchema>

export default function TaskList() {

   const params = useParams()
   const projectId = params.id

   const {register, handleSubmit, resetField} = useForm<SearchForm>({resolver: zodResolver(SearchFormSchema)})
   
   useEffect(()=> {

      if(projectId) {
          
      }
      
   }, [projectId, resetField])

   async function search(form: SearchForm) { 
         console.log(form)
   }

     return (
        <>
           <form onSubmit={handleSubmit(search)} className="flex gap-2">
               <FormGroup label= "Start From">
                  <Input type= "date" {...register('startFrom')} />
               </FormGroup>

               <FormGroup label= "Start To">
                   <Input type= "date" {...register('startTo')} />
               </FormGroup>

                <FormGroup label= "Keyword">
                     <Input {...register('keyword')}  placeholder="Search Keyword" />
                </FormGroup>
           </form>
         </>
     )
}