import Checkbox from "@/components/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Questions = ({
  fields,
  object,
  setObject,
  onSubmit,
  loading,
  setLoading,
  setState,
}) => {
  const handleClick = (option, field) => {
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
                <Label htmlFor={field.name} className="font-semibold">
                  {field.title}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={object[field.name]}
                maxLength={field.maxLength}
                disabled={!field.editable}
                onChange={(e) =>
                  setObject({ ...object, [field.name]: e.target.value })
                }
              />
            </>
          )}
          {field.input === "checkboxes" && (
            <>
              <p className="mb-1 font-semibold">
                {field.text}
                {field.required && <span className="text-red-500">*</span>}
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {field.options.map((option, i) => (
                  <Checkbox
                    id={option.id}
                    checked={object[field.field].includes(option)}
                    onClick={() => {
                      setObject({
                        ...object,
                        [field.field]: object[field.field].includes(option)
                          ? object[field.field].filter(
                              (item) => item !== option,
                            )
                          : [...object[field.field], option],
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
                {field.text}
                {field.required && <span className="text-red-500">*</span>}
              </p>
              <RadioGroup
                value={object[field.field]}
                onValueChange={(value) => handleClick(value, field.field)}
              >
                <div className="grid grid-cols-2">
                  {Object.values(field.options).map((option, index) => (
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
                <Label htmlFor={field.name} className="font-semibold">
                  {field.title}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Textarea
                className="w-full resize-none border-1 border-black pl-3 placeholder:text-gray-200 focus:outline-none"
                maxLength={500}
                value={object[field.name]}
                onChange={(e) =>
                  setObject({ ...object, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                rows={field.rows}
                title={field.title}
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
