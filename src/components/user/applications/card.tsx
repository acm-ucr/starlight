import Button from "../../global/button";

interface Props {
  image: string; //PLACEHOLDER FOR ACTUAL IMAGE
  name: string;
  role: string;
  place: string;
  time: string;
  buttonName: string;
}

const Card = ({ image, name, role, place, time, buttonName }: Props) => {
  return (
    <div className="flex h-1/2 w-1/4 flex-col items-center border-2 border-gray-300 p-10">
      <div className="p-6 text-6xl font-bold">{image}</div>
      <div className="text-nowrap p-3 text-center text-4xl font-bold">
        {name}
      </div>
      <div className="p-8 font-bold">
        {/*Info*/}
        <div className="text-nowrap p-1 text-center text-sm">{role}</div>
        <div className="text-nowrap p-1 text-center text-sm">{place}</div>
        <div className="text-nowrap p-1 text-center text-sm">{time}</div>
      </div>
      <div className="h-24 w-36">
        <Button children={buttonName} />
      </div>
    </div>
  );
};

export default Card;
