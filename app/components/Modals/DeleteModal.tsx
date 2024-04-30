"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteModal({
  action,
  isLoading,
}: {
  action: any;
  isLoading: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        className="w-full bg-transparent hover:bg-danger transition"
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-1">
                Are you sure ?
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={isLoading} color="default" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="danger"
                  onPress={() => action(onClose)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
