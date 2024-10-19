const title = "ACM Ignite Winter 2024";

const projects = [
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
  },
];

const Page = () => {
  return (
    <div className="w-10/12 bg-white text-black">
      <p>{title}</p>

      {projects.map(({ title, description }) => (
        <>
          w<p>{title}</p>
          <p>{description}</p>
        </>
      ))}

      <button>Submit</button>
    </div>
  );
};

export default Page;
