import Card from "./card";
import { Label } from "@/components/ui/label";
const Cards = () => {
  return (
    <div className="bg-starlight-gray-secondary min-h-screen w-10/12 px-4">
      <Label className="text-starlight-tags-white my-8 text-2xl font-bold">
        Email Templates
      </Label>
      <div className="grid grid-cols-2 gap-8">
        <Card program="Spark" />
      </div>
    </div>
  );
};

export default Cards;
