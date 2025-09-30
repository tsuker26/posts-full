import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'
import { baseURL } from '../api/api'

type DropzoneUploaderProps = {
  urls: string[]
  multiple?: boolean
  onFilesSelected: (files: File[]) => void
  onRemove: (url: string) => void
  className?: string
}

export const DropzoneUploader = ({
  urls,
  multiple = false,
  onFilesSelected,
  onRemove,
  className,
}: DropzoneUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles)
    },
    [onFilesSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition',
        isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-secondary',
        className
      )}
    >
      <input {...getInputProps()} />
      {urls.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {urls.map((url, i) => (
            <div key={i} className='relative group'>
              <img
                src={`${baseURL}/${url}`}
                alt='Preview'
                className='w-20 h-20 object-cover rounded-lg'
              />
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(url)
                }}
                className='absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition'
              >
                <X className='w-3 h-3 text-white' />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>Перетащите файлы сюда или кликните для выбора</p>
      )}
    </div>
  )
}
