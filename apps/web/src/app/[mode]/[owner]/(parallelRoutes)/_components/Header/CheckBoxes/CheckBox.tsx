import { FC } from 'react'
import {
  Avatar,
  Box,
  HStack,
  Checkbox as ChakraCheckbox,
} from '@chakra-ui/react'

type Props = {
  login: string
  avatarUrl: string
  isChecked: boolean
  onClick: (login: string, isChecked: boolean) => void
}

export const CheckBox: FC<Props> = ({
  login,
  avatarUrl,
  isChecked,
  onClick,
}) => (
  <ChakraCheckbox
    isChecked={isChecked}
    onChange={(e) => onClick(login, e.target.checked)}
  >
    <HStack pl={2} spacing={4}>
      <Avatar src={avatarUrl} size="sm" />
      <Box pt={1}>{login}</Box>
    </HStack>
  </ChakraCheckbox>
)
