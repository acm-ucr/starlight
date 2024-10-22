import { TextareaInput } from "@/types/questions";
import { Label } from "@/components/ui/label"
import { Textarea as TextareShadCN} from "@/components/ui/textarea"

const Textarea = ({ meta }: { meta: TextareaInput }) => {
  const { title, placeholder } = meta;
  return (
    <div className="grid w-full gap-1.5">
        <Label htmlFor="message">{title}</Label>
      <TextareShadCN placeholder= {placeholder} id="message" />
    </div>
  )
}

export default Textarea;