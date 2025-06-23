import Checkbox from "@/components/checkbox";
import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Description,
  TextInput,
  CheckboxInput,
  RadioInput,
  TextareaInput,
  SelectInput,
  ToggleInput,
  SliderInput,
} from "@/types/forms";
type TField =
  | Description
  | TextInput
  | CheckboxInput
  | RadioInput
  | TextareaInput
  | SelectInput
  | ToggleInput
  | SliderInput;

interface QuestionProps<TObj> {
  fields: Record<string,TField>;
  object: TObj;
  setObject: Dispatch<SetStateAction<TObj>>;
  onSubmit: (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => Promise<void> | void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setState: Dispatch<SetStateAction<number>>;
}

const Questions = <TObj,>({
  fields,
  object,
  setObject,
  onSubmit,
  loading,
  setLoading,
  setState,
}: QuestionProps<TObj>) => {
  const handleClick = (option: string, field: string) => {
    setObject({
      ...object,
      [field]: option,
    });
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {Object.values(fields).map((field, index) => (
        <div key={index}>
          {field.input === "description" &&
            field.texts.map((description, index) => (
              <div key={index}>
                <p>{description}</p> <br />
                {index === field.texts.length - 1 && (
                  <p>
                    Fields with
                    <span className="text-red-500"> * </span>
                    are required.
                  </p>
                )}
              </div>
            ))}
          {field.input === "input" && (
            <>
              <div className="pb-1">
                <Label htmlFor={(field as TextInput).name} className="font-semibold">
                  {(field as TextInput).title}
                  {(field as TextInput).required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Input
                id={(field as TextInput).name}
                type={(field as TextInput).type}
                placeholder={(field as TextInput).placeholder}
                value={object[(field as TextInput).name]}
                maxLength={(field as TextInput).maxLength}
                disabled={!(field as TextInput).editable}
                onChange={(e) =>
                  setObject({ ...object, [(field as TextInput).name]: e.target.value })
                }
              />
            </>
          )}
          {field.input === "checkboxes" && (
            <>
              <p className="mb-1 font-semibold">
                {(field as CheckboxInput).text}
                {(field as CheckboxInput).required && <span className="text-red-500">*</span>}
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {(field as CheckboxInput).options.map((option, i) => (
                  <Checkbox
                    id={option.id}
                    checked={object[(field as CheckboxInput).field].includes(option)}
                    onClick={() => {
                      setObject({
                        ...object,
                        [(field as CheckboxInput).field]: object[(field as CheckboxInput).field].includes(option)
                          ? object[(field as CheckboxInput).field].filter(
                              (item) => item !== option,
                            )
                          : [...object[(field as CheckboxInput).field], option],
                      });
                    }}
                    key={i}
                  >
                    {option}
                  </Checkbox>
                ))}
              </div>
            </>
          )}
          {field.input === "radio" && (
            <>
              <p className="mb-1 font-semibold">
                {(field as RadioInput).text}
                {(field as RadioInput).required && <span className="text-red-500">*</span>}
              </p>
              <RadioGroup
                value={object[(field as RadioInput).field]}
                onValueChange={(value) => handleClick(value, field.field)}
              >
                <div className="grid grid-cols-2">
                  {Object.values((field as RadioInput).options).map((option, index) => (
                    <div
                      className="mb-2 flex items-center space-x-2"
                      key={index}
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </>
          )}
          {field.input === "textarea" && (
            <>
              <div className="mb-1">
                <Label htmlFor={(field as TextareaInput).name} className="font-semibold">
                  {(field as TextareaInput).title}
                  {(field as TextareaInput).required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Textarea
                className="w-full resize-none border-1 border-black pl-3 placeholder:text-gray-200 focus:outline-none"
                maxLength={500}
                value={object[(field as TextareaInput).name]}
                onChange={(e) =>
                  setObject({ ...object, [(field as TextareaInput).name]: e.target.value })
                }
                placeholder={(field as TextareaInput).placeholder}
                rows={(field as TextareaInput).rows}
                title={(field as TextareaInput).title}
              />
            </>
          )}
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          onClick={() => onSubmit(setLoading, setState)}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Questions;
