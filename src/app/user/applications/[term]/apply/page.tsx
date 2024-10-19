import Application from "@/components/applications/application";
import Project from "@/components/applications/project";
import { projects } from "@/forms/Ignite-F24";

const title = "ACM Ignite Winter 2024";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const Page = () => {
  return (
    <div className="flex justify-center bg-white text-black">
      <div className="flex w-10/12 flex-col items-center">
        <p className="my-4 font-bold text-starlight-blue">{title}</p>
        <p>{description}</p>

        <div className="mt-4 flex flex-col gap-3">
          {projects.map(({ title, description, tags }, index) => (
            <Project
              title={title}
              description={description}
              tags={tags}
              key={index}
            />
          ))}
        </div>

        <Application title={title} />
      </div>
    </div>
  );
};

export default Page;
