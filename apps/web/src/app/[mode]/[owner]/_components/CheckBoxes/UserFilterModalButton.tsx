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
  HStack,
  Heading,
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
      <HStack justify="space-between">
        <Heading>Main Dashboard</Heading>
        <IconButton
          bg="white"
          shadow="xl"
          rounded="lg"
          onClick={onOpen}
          aria-label="Select Users"
          icon={<SettingsIcon />}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckBoxes users={users} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
