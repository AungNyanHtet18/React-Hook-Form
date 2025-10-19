import Page from "@/components/custom/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projectDetails } from "@/lib/client/project-client";
import type { ProjectDetail } from "@/lib/model/output/project-detail";

import { Calendar, Files, Folder, Info, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

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
           <div className="flex gap-6">
                <div className="w-1/4">
                    <ProjectInfo info={details} />
                </div>

                <div className="w-3/4">
                    <TasksInProject  />
                </div>
           </div>
      </Page>
     )
}


function ProjectInfo({info} : {info : ProjectDetail}) {

    const navigate = useNavigate()

    function edit(id: unknown) {
        navigate(`/project/edit?id=${id}`)         
    }

     return (
        <>
            <Card className="mb-2">
                <CardHeader>
                    <CardTitle className="flex items-center"><Info className="me-2"/> {info.name}</CardTitle>

                    <CardDescription>{info.details}</CardDescription>
                </CardHeader>

                <CardContent>
                    <ProjectInfoItem name= "Start At" value= {info.startDate}/>
                    <ProjectInfoItem name= "Due Date" value= {info.dueDate} />
                
                    <div>
                        <Button onClick={() => edit(info.id)} className="w-full">
                            <Pencil /> Edit Project
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </>
     )
}


function ProjectInfoItem({name, value} : {name: string, value?: string}) {
     return (
        <div className="flex gap-4 mb-3">

            <Calendar/>

            <div className="mb-3">
                <div className="text-gray-500  text-sm">{name}</div>
                <div>{value}</div>
            </div>
        </div>
     )
}


function TasksInProject() { 
    return (
        <>
            <Card className="mb-2">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center">
                            <Files className="me-2"/> Tasks in Project
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Outlet />
                </CardContent>
            </Card>
        </>
    )
}