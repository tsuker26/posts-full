import { useUploadFile } from '@/shared/api/uploadToStorage'
import { DropzoneUploader } from '@/shared/components/DropZone'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const postSchema = z.object({
  text: z.string().min(1, 'Текст обязателен'),
  images: z.array(z.string()).optional(),
})

export type PostFormData = z.infer<typeof postSchema>

type PostFormProps = {
  initialData?: PostFormData
  isLoading?: boolean
  onSubmit: (data: PostFormData) => void
  onCancel?: () => void
}

export const PostForm = ({ initialData, isLoading, onSubmit, onCancel }: PostFormProps) => {
  const [urls, setUrls] = useState<string[]>(initialData ? (initialData?.images ?? []) : [])

  const { mutate: uploadFile } = useUploadFile()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      text: '',
      images: [],
    },
  })

  const handleFilesSelected = (files: File[]) => {
    uploadFile(
      { files, folder: 'posts' },
      {
        onSuccess: (data) => {
          const newUrls = data.map((d) => d.url)
          setUrls((prev) => [...prev, ...newUrls])
          setValue('images', [...urls, ...newUrls], { shouldDirty: true })
        },
      }
    )
  }

  const handleRemove = (url: string) => {
    const { images } = getValues()
    const newValues = images?.filter((imageUrl) => imageUrl !== url)

    setUrls((prev) => prev.filter((u) => u !== url))
    setValue('images', newValues, { shouldDirty: true })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 max-h-[80vh] overflow-y-auto'
    >
      <div className='grid gap-2 relative'>
        <Label htmlFor='text'>Текст поста</Label>
        <Textarea id='text' {...register('text')} rows={4} />
        {errors.text && (
          <p className='text-sm text-red-500 absolute top-14'>{errors.text.message}</p>
        )}
      </div>

      <DropzoneUploader
        urls={urls}
        onFilesSelected={handleFilesSelected}
        onRemove={handleRemove}
        multiple
      />

      <div className='mt-4 flex gap-3 justify-end border-t pt-4 shrink-0 bg-background'>
        {onCancel && (
          <Button variant='outline' type='button' onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button type='submit' disabled={!isDirty || isLoading} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
