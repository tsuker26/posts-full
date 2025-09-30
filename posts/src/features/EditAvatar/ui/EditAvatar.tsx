import { DropzoneUploader } from '@/shared/components/DropZone'
import { useModal } from '@/shared/context/modalContext'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { useUploadAvatar } from '../api'
import { useState } from 'react'
import { useDeleteFile, useUploadFile } from '@/shared/api/uploadToStorage'

export const EditAvatar = () => {
  const { checkIsOpen, closeModal } = useModal()
  const { mutate: uploadAvatar, isPending } = useUploadAvatar()
  const { mutate: uploadFile } = useUploadFile()
  const { mutate: deleteFile } = useDeleteFile()

  const [urls, setUrls] = useState<string[]>([])

  const handleUpload = () => {
    uploadAvatar(urls[0], {
      onSuccess: () => closeModal(),
    })
  }

  const handleFilesSelected = (files: File[]) => {
    uploadFile(
      { files, folder: 'avatar' },
      {
        onSuccess: (data) => {
          if (urls.length) {
            const filename = urls[0].split('/').pop()!
            deleteFile({ filename, folder: 'avatar' })
          }
          setUrls([data[0].url])
        },
      }
    )
  }

  const handleRemove = (url: string) => {
    setUrls((prev) => prev.filter((u) => u !== url))
  }

  return (
    <Dialog open={checkIsOpen('editAvatar')} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
        <DialogHeader>
          <DialogTitle>Загрузка новой фотографии</DialogTitle>
        </DialogHeader>
        <DialogDescription>Выберите файл или перетащите его сюда.</DialogDescription>
        <DropzoneUploader
          urls={urls}
          multiple={false}
          onFilesSelected={handleFilesSelected}
          onRemove={handleRemove}
          className='mt-4'
        />

        <div className='mt-6 flex justify-end gap-3'>
          <Button variant='outline' onClick={closeModal}>
            Отмена
          </Button>
          <Button
            isLoading={isPending}
            onClick={handleUpload}
            disabled={Boolean(!urls.length) || isPending}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
