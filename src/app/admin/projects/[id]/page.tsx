import EditForm from "@/app/components/EditForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

async function getData(projectId:string){
const data = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const EditProject = async ({params}:{params:{id:string}}) => {
  const data =await getData(params.id)
  return <EditForm data={data}/> ;
};

export default EditProject;
