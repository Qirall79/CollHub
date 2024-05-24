"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { VscSettings } from "react-icons/vsc";
import { SelectLanguage } from "./SelectLanguage";

export default function FilterModal({ setFilters }: { setFilters: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any) => {
    setFilters({
      languages: data.technologies.length ? data.technologies : "",
      sort: data.sort ? (data.sort == "0" ? "desc" : "asc") : "desc",
    });
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} startContent={<VscSettings size={24} />} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <SelectLanguage
                  errors={errors}
                  register={register}
                  required={false}
                  placeholder="Filter by language"
                />

                <Select
                  {...register("sort", { required: false })}
                  placeholder="Sort by"
                  size="lg"
                >
                  <SelectItem key={0} value={"ASC"}>
                    Latest
                  </SelectItem>
                  <SelectItem key={1} value={"DESC"}>
                    Oldest
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                  Apply filters
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
