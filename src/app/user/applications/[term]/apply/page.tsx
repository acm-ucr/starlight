import Application from "@/components/applications/application";
import Project from "@/components/applications/project";
import { forms } from "@/forms/applications";

interface props {
  params: {
    term: string;
  };
}

const Page = ({ params }: props) => {
  const { term } = params;
  const { title, description, questions, projects } = forms(term);

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

        <Application title={title} questions={questions} />
      </div>
    </div>
  );
};

export default Page;
