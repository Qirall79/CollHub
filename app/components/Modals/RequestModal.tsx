"use client";

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
import { IProject, IRequest, IRequestInput, IUser } from "@/lib/types";
import { useForm } from "react-hook-form";
import { trpc } from "@/lib/trpcClient";
import { useState } from "react";

export default function RequestModal({ project, user }: { project: IProject, user: IUser }) {
  const [isRequested, setIsRequested] = useState(
    !!project.requests?.filter(
      (req: IRequest) => req.senderId === user?.id
    ).length
  );
  const utils = trpc.useUtils();
  const mutation = trpc.requests.sendRequest.useMutation({
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
  } = useForm<IRequestInput>();

  const onSubmit = async (data: IRequestInput) => {
    reset({
      body: "",
    });
    data.projectId = project.id;
    await mutation.mutateAsync({
      discord: data.discord,
      github: data.github,
      projectId: data.projectId,
      body: data.body,
    });
    onClose();
    setIsRequested(true);
  };

  console.log(project.requests, user?.id);
  

  return (
    <>
      <Button
        isDisabled={isRequested}
        onPress={onOpen}
        className="mt-6 mb-1 max-w-40 bg-cyan-950"
      >
        {isRequested ? "Sent √" : "Send Request"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Send Request
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    autoComplete="off"
                    {...register("discord", {
                      required: {
                        message: "Please enter your discord username",
                        value: true,
                      },
                    })}
                    label="Discord"
                    size="sm"
                    isInvalid={!!errors.discord}
                    errorMessage={errors.discord?.message}
                    defaultValue={user?.discord ?? ""}
                  />

                  <Input
                    autoComplete="off"
                    {...register("github", {
                      required: false,
                    })}
                    label="Github"
                    size="sm"
                    defaultValue={user?.github ?? ""}
                  />
                  <Textarea
                    {...register("body")}
                    label="Body"
                    size="sm"
                    placeholder="Want to add something ?"
                  />

                  <div className="w-full flex justify-end space-x-2">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={mutation.isPending}
                      type="submit"
                      className="bg-cyan-500"
                    >
                      Send
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
