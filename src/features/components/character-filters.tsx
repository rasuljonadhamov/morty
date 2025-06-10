import { useState } from "react";
import { Search, X } from "lucide-react";
import type { CharacterFilters } from "../../shared/types/character";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface CharacterFiltersProps {
  filters: CharacterFilters;
  onFiltersChange: (filters: CharacterFilters) => void;
}

export function CharacterFiltersComponent({
  filters,
  onFiltersChange,
}: CharacterFiltersProps) {
  const [nameInput, setNameInput] = useState(filters.name || "");

  const handleNameSearch = () => {
    onFiltersChange({ ...filters, name: nameInput || undefined, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const handleGenderChange = (value: string) => {
    onFiltersChange({
      ...filters,
      gender: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const clearFilters = () => {
    setNameInput("");
    onFiltersChange({ page: 1 });
  };

  const hasActiveFilters = filters.name || filters.status || filters.gender;

  return (
    <div className="w-full space-y-4 p-4 bg-card rounded-lg border">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <div className="sm:col-span-2 lg:col-span-1 space-y-2">
          <label className="text-sm font-medium text-foreground">
            Search by name
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter character name..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSearch()}
              className="flex-1 min-w-0"
            />
            <Button onClick={handleNameSearch} size="icon" className="shrink-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <Select
            value={filters.status || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full min-w-[120px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Gender</label>
          <Select
            value={filters.gender || "all"}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className="w-full min-w-[120px]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear filters button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-w-[100px]"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
              <span className="sm:hidden">Clear Filters</span>
            </Button>
          )}
        </div>
      </div>

      {/* Active filters indicator for mobile */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t sm:hidden">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {filters.name && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              Name: {filters.name}
            </span>
          )}
          {filters.status && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              Status: {filters.status}
            </span>
          )}
          {filters.gender && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              Gender: {filters.gender}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
