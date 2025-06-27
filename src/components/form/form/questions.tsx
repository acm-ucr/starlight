import Checkbox from "@/components/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TextInput,
  RadioInput,
  CheckboxInput,
  TextareaInput,
  BaseFields,
} from "@/types/forms";
import { Dispatch, SetStateAction } from "react";

export type FormObject = {
  [key: string]: string | string[] | boolean | undefined;
};

interface QuestionsProps<T extends FormObject> {
  fields: BaseFields;
  object: T;
  setObject: Dispatch<SetStateAction<T>>;
  onSubmit: (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => void | Promise<void>;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setState: (value: number) => void;
}

const Questions = <T extends FormObject>({
  fields,
  object,
  setObject,
  onSubmit,
  loading,
  setLoading,
  setState,
}: QuestionsProps<T>) => {
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
                <Label
                  htmlFor={(field as TextInput).name}
                  className="font-semibold"
                >
                  {(field as TextInput).title}
                  {(field as TextInput).required && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
              </div>
              <Input
                id={(field as TextInput).name}
                type={(field as TextInput).type}
                placeholder={(field as TextInput).placeholder}
                value={object[(field as TextInput).name] as string}
                maxLength={(field as TextInput).maxLength}
                disabled={!(field as TextInput).editable}
                onChange={(e) =>
                  setObject({
                    ...object,
                    [(field as TextInput).name]: e.target.value,
                  } as T)
                }
              />
            </>
          )}
          {field.input === "checkboxes" && (
            <>
              <p className="mb-1 font-semibold">
                {(field as CheckboxInput).text}
                {(field as CheckboxInput).required && (
                  <span className="text-red-500">*</span>
                )}
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {(field as CheckboxInput).options.map((option, i) => (
                  <Checkbox
                    id={option}
                    checked={
                      Array.isArray(object[(field as CheckboxInput).field]) &&
                      (
                        object[(field as CheckboxInput).field] as string[]
                      ).includes(option)
                    }
                    onClick={() => {
                      const arr = Array.isArray(
                        object[(field as CheckboxInput).field],
                      )
                        ? (object[(field as CheckboxInput).field] as string[])
                        : [];
                      setObject({
                        ...object,
                        [(field as CheckboxInput).field]: arr.includes(option)
                          ? arr.filter((item) => item !== option)
                          : [...arr, option],
                      } as T);
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
                {(field as RadioInput).required && (
                  <span className="text-red-500">*</span>
                )}
              </p>
              <RadioGroup
                value={object[(field as RadioInput).field] as string}
                onValueChange={(value) =>
                  handleClick(value, (field as RadioInput).field)
                }
              >
                <div className="grid grid-cols-2">
                  {Object.values((field as RadioInput).options).map(
                    (option, index) => (
                      <div
                        className="mb-2 flex items-center space-x-2"
                        key={index}
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ),
                  )}
                </div>
              </RadioGroup>
            </>
          )}
          {field.input === "textarea" && (
            <>
              <div className="mb-1">
                <Label
                  htmlFor={(field as TextareaInput).name}
                  className="font-semibold"
                >
                  {(field as TextareaInput).title}
                  {(field as TextareaInput).required && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
              </div>
              <Textarea
                className="placeholder:text-hackathon-gray-200 w-full resize-none border-1 border-black pl-3 focus:outline-none"
                maxLength={500}
                value={object[(field as TextareaInput).name] as string}
                onChange={(e) =>
                  setObject({
                    ...object,
                    [(field as TextareaInput).name]: e.target.value,
                  } as T)
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
