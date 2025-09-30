import { ModalProviderContext } from '@/shared/context/modalContext'
import type { ReactNode } from 'react'

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  return <ModalProviderContext>{children}</ModalProviderContext>
}
