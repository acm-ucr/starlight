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

  return (
    <div className="flex w-full gap-2 lg:w-4/12">
      <ToggleGroup
        type="multiple"
        value={selectedFilters} // ✅ controlled
        onValueChange={(newValues) => {
          setFilters((prev) =>
            prev.map((f) =>
              f.id === "status" ? { ...f, value: newValues } : f,
            ),
          );
        }}
      >
        {Object.entries(statuses).map(([key, value]) => (
          <ToggleGroupItem
            key={key}
            value={key}
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
