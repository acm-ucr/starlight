import { Tag as TagType } from "@/types/tag";
import Tag from "../global/tag";

interface props {
  title: string;
  description: string;
  tags: TagType[];
}

const Project = ({ title, description, tags }: props) => {
  return (
    <div>
      {title} {description}
      {tags.map((text, index) => (
        <Tag key={index}>{text}</Tag>
      ))}
    </div>
  );
};

export default Project;
