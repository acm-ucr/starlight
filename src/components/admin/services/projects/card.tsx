interface CardProps {
  program: string;
}

const Card = ({ program }: CardProps) => {
  return (
    <div>
      <p className="text-3xl text-white">{program}</p>
      <div className="bg-white">RAWR</div>
    </div>
  );
};

export default Card;

//get projects
