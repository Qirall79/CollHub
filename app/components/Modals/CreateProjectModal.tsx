"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { IProjectInput } from "@/lib/types";
import { useForm } from "react-hook-form";
import { SelectLanguage } from "./SelectLanguage";
import { trpc } from "@/lib/trpcClient";

export default function CreatePostModal() {
  const utils = trpc.useUtils();
  const mutation = trpc.projects.createProject.useMutation({
    onSuccess(input) {
      utils.projects.getAll.invalidate();
    },
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProjectInput>();

  const onSubmit = async (data: IProjectInput) => {
    data.technologies = " ,".concat(data.technologies)
    await mutation.mutateAsync(data);

    reset({
      title: "",
      description: "",
      technologies: "",
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
      <Modal
        isOpen={isOpen}
        onClose={() =>
          reset({
            title: "",
            description: "",
            technologies: "",
          })
        }
        onOpenChange={onOpenChange}
        placement="top-center"
      >
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
                  <SelectLanguage errors={errors} register={register} required />
                  <div className="w-full flex justify-end space-x-2">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={mutation.isPending}
                      type="submit"
                      className="bg-cyan-500"
                    >
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
