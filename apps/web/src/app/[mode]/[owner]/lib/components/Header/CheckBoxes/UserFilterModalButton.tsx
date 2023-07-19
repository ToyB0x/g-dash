'use client'
import 'client-only'

import { FC } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckBoxes } from './CheckBoxes'
import { SettingsIcon } from '@chakra-ui/icons'

type Props = {
  users: {
    id: string
    login: string
    avatarUrl: string
  }[]
}

export const UserFilterModalButton: FC<Props> = ({ users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        bg="white"
        shadow="xl"
        rounded="lg"
        onClick={onOpen}
        aria-label="Select Users"
        icon={<SettingsIcon />}
      >
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckBoxes users={users} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
