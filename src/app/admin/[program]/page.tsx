import Button from "@/components/global/button";
import Add from "@/components/programs/add";
import Project from "@/components/programs/project";
import { Project as ProjectType } from "@/types/projects";

const projects: ProjectType[] = [
  {
    title: "ACM WEBSITE",
    description: "HELLO THIS IS A VERY COOL DESCRIPTION",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "ACM WEBSITE",
    description: "HELLO THIS IS A VERY COOL DESCRIPTION",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "ACM WEBSITE",
    description: "HELLO THIS IS A VERY COOL DESCRIPTION",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
];

const Page = () => {
  return (
    <div className="">
      <Button>Add Project</Button>

      <div className="grid grid-cols-3 gap-4">
        {projects.map(({ title, description, tags }, index) => (
          <Project
            key={index}
            title={title}
            description={description}
            tags={tags}
          />
        ))}
      </div>

      <Add />
    </div>
  );
};

export default Page;
