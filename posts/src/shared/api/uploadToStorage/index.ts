import { api } from '@/shared/api/api'
import { useMutation } from '@tanstack/react-query'

export type UploadFileParams = {
  folder: string
  files: File[]
}

export type UploadFileResponse = {
  url: string
  filename: string
  folder: string
}

export const uploadFile = async ({ folder, files }: UploadFileParams) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await api.post<UploadFileResponse[]>(`/upload/${folder}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}

export type DeleteFileParams = {
  folder: string
  filename: string
}

export const deleteFile = async ({ folder, filename }: DeleteFileParams) => {
  const response = await api.delete(`/upload/${folder}/${filename}`)
  return response.data
}

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data: UploadFileParams) => uploadFile(data),
  })
}

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (data: DeleteFileParams) => deleteFile(data),
  })
}
