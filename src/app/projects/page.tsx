import prisma from "@/lib/prisma";
import ProjectCard from "../components/ProjectCard";
import { ThreeDCardDemo } from "../components/Project";

export default async function ProjectsPage() {
  const data = await prisma.project.findMany();
 

  return (
    <div className="container py-4 ">
      <h1 className="text-3xl font-bold tracking-tight ml-5">My Projects</h1>
      <div className="grid grid-cols-1 mx-5 lg:grid-cols-2 md:grid-cols-1 gap-6 ">
        {data.map((items)=>(

        <ThreeDCardDemo project={items} key={items.id}/>
        ))}
      </div>
    </div>
  );
}
