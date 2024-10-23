import { Tag as TagType } from "@/types/tag";
import Tag from "@/components/global/tag";

interface props {
  title: string;
  description: string;
  tags: TagType[];
}

const Project = ({ title, description, tags }: props) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <p>{title}</p>

      <div className="flex gap-2">
        {tags.map((text, index) => (
          <Tag key={index}>{text}</Tag>
        ))}
      </div>

      <p>{description}</p>
    </div>
  );
};

export default Project;
