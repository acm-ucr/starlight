import { Filter } from "./dashboard";
import { COLORS } from "@/data/tags";
import { cn } from "@/utils/tailwind";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FiltersProps {
  statuses: Record<string, string>;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const Filters = ({ statuses, filters, setFilters }: FiltersProps) => {
  const selectedFilters =
    filters.find(({ id }) => id === "status")?.value || [];

  const onClick = (value: number, isActive: boolean) => {
    setFilters((prev) => {
      const statuses = prev.find(({ id }) => id === "status")?.value;
      if (!statuses) {
        return prev.concat({
          id: "status",
          value: [value],
        });
      }

      return prev.map((f) =>
        f.id === "status"
          ? {
              id: "status",
              value: isActive
                ? statuses.filter((s) => s !== value)
                : statuses.concat(value),
            }
          : f,
      );
    });
  };

  return (
    <div className="flex w-full gap-2 lg:w-4/12">
      <ToggleGroup type="multiple">
        {Object.entries(statuses).map(([key, value]) => (
          <ToggleGroupItem
            key={key}
            value={key}
            onClick={() =>
              onClick(parseInt(key), selectedFilters.includes(parseInt(key)))
            }
            className={cn(
              COLORS["gray"]?.background,
              COLORS["gray"]?.text,
              COLORS["gray"]?.hover,
              "capitalize",
            )}
          >
            {value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default Filters;
