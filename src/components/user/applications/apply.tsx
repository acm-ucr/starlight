import Card from "./card";

const apply = () => {
  return (
    <div className="h-full">
      User Application
      <div className="flex h-full items-center justify-evenly">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default apply;
