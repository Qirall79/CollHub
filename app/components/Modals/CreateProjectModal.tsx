"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { IProjectInput } from "@/lib/types";
import { useForm } from "react-hook-form";
import { SelectLanguage } from "./SelectLanguage";

export default function CreatePostModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IProjectInput>();

  const onSubmit = (data: IProjectInput) => {
    console.log(data);
    reset({
      title: "",
      description: "",
      technologies: ""
    });
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-cyan-600 grow md:w-1/4 font-semibold"
      >
        Create Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Project
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    autoComplete="off"
                    {...register("title", {
                      required: {
                        message: "Please enter a name for your project",
                        value: true,
                      },
                    })}
                    label="Name"
                    size="sm"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                  <Textarea
                    {...register("description")}
                    label="Description"
                    size="sm"
                  />
                  <SelectLanguage errors={errors} register={register} />
                  <div className="w-full flex justify-end space-x-2">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-cyan-500">
                      Post
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
