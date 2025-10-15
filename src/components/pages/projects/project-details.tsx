import Page from "@/components/custom/page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projectDetails } from "@/lib/client/project-client";
import type { ProjectDetail } from "@/lib/model/output/project-detail";
import type { TaskListItem } from "@/lib/model/output/task-list-item";
import { AlertCircle, AlertCircleIcon, Files, FileStack, Folder, Plus, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProjectDetails() {
    
    const params = useParams()
    const id = params.id

    const [details, setDetails] = useState<ProjectDetail>()

    useEffect(()=> {
        async function load() {
             if(id) {
                 const result = await projectDetails(id)
                 setDetails(result)
             }
        }

        load()

    },[id])
    
    if(!details) {
        return (
            <></>
        )
    }

    return (
      <Page icon={<Folder/>} title="Project Details">
           <div className="flex gap-4">
                <div className="w-1/5">
                    <ProjectInfo info={details} />
                </div>

                <div className="w-4/5">
                    <TasksInProject list={details.tasks} />
                </div>
           </div>
      </Page>
     )
}


function ProjectInfo({info} : {info : ProjectDetail}) {
     return (
        <>
            <Card className="mb-2">
                <CardHeader>
                    <CardTitle>{info.name}</CardTitle>

                    <CardDescription>{info.details}</CardDescription>

                </CardHeader>
            </Card>
        </>
     )
}


function TasksInProject({list} : {list : TaskListItem[]}) { 
    return (
        <>
           <h1 className="flex text-lg items-center justify-between mb-3">
               <div className="flex items-center">
                    <Files className="me-2"/> Tasks in Project
               </div>

               <Button><Plus/>Add New Task</Button>
           </h1>

           {!list.length ? 
            <Alert>
                <AlertCircleIcon/>
                <AlertTitle>Message</AlertTitle>
                <AlertDescription>There is no tasks, Please add task to Projects.</AlertDescription>
            </Alert> :

            <Table>
                 
            </Table> 
           }
        </>
    )
}