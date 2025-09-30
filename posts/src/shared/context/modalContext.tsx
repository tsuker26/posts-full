import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type ModalType =
  | 'editProfile'
  | 'editAvatar'
  | 'createPost'
  | 'editPost'
  | 'removePost'
  | null

type ModalContextProps = {
  type: ModalType
  isOpen: boolean
  checkIsOpen: (currentType: ModalType) => boolean
  openModal: (type: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export function ModalProviderContext({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<ModalType>(null)

  const openModal = useCallback((type: ModalType) => {
    setIsOpen(true)
    setType(type)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setType(null)
  }, [])

  const checkIsOpen = useCallback(
    (currentType: ModalType) => {
      return isOpen && type === currentType
    },
    [isOpen, type]
  )

  const value = useMemo(
    () => ({
      isOpen,
      type,
      checkIsOpen,
      openModal,
      closeModal,
    }),
    [isOpen, type, checkIsOpen, openModal, closeModal]
  )
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProviderContext')
  return ctx
}
