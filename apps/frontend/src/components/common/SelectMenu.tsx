import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  placeholder?: string;
  selectItems: {
    label: string;
    value: string;
  }[];
  className?: string;
}

const SelectMenu = ({ placeholder, selectItems, className }: props) => {
  return (
    <Select>
      {placeholder && (
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        <SelectGroup>
          {selectItems.map((singleItems) => {
            return (
              <SelectItem value={singleItems.value} key={singleItems.label}>
                {singleItems.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectMenu;
