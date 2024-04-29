import { IProjectInput } from "@/lib/types";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const languages = [
  {
    name: "C",
    key: 1,
  },
  {
    name: "Python",
    key: 2,
  },
  {
    name: "JavaScript",
    key: 3,
  },
  {
    name: "TypeScript",
    key: 4,
  },
];

export const SelectLanguage = ({
  errors,
  register,
}: {
  errors: FieldErrors<IProjectInput>;
  register: UseFormRegister<IProjectInput>;
}) => {
  return (
    <Select
      size="lg"
      {...register("technologies", {
        required: {
          value: true,
          message: "Select the languages used for this project",
        },
      })}
      isInvalid={!!errors.technologies}
      errorMessage={errors.technologies?.message}
      items={languages}
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select languages"
      labelPlacement="outside"
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.textValue}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user: { name: string }) => (
        <SelectItem key={user.name} textValue={user.name}>
          <div className="flex gap-2 items-center">{user.name}</div>
        </SelectItem>
      )}
    </Select>
  );
};
