import Card from "./card";

const apply = () => {
  return (
    <div className="h-full">
      User Application
      <div className="flex h-full items-center justify-evenly">
        <Card
          image={"[logo]"}
          name={"ACM Ignite"}
          role={"Frontend Engineer"}
          place={"Remote or In Person (UC Riverside)"}
          time={"Fall 2024"}
          buttonName={"Apply"}
        />
        <Card
          image={"[logo]"}
          name={"ACM Create"}
          role={"Website Designer"}
          place={"Remote or Hybrid (UC Riverside)"}
          time={"Fall 2024"}
          buttonName={"Apply"}
        />
        <Card
          image={"[logo]"}
          name={"ACM Forge"}
          role={"Hardware/Software Engineer"}
          place={"In Person (UC Riverside)"}
          time={"Fall 2024"}
          buttonName={"Apply"}
        />
      </div>
    </div>
  );
};

export default apply;
