import prisma from "@/lib/prisma";
import ProjectCard from "../components/ProjectCard";
import { ThreeDCardDemo } from "../components/Project";

export default async function ProjectsPage() {
  const data = await prisma.project.findMany();
 

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 ml-5">My Projects</h1>
      <div className="grid grid-cols-1 mx-5 lg:grid-cols-2 md:grid-cols-1 gap-6 ">
        {data.map((items)=>(

        <ThreeDCardDemo project={items} key={items.id}/>
        ))}
      </div>
    </div>
  );
}
