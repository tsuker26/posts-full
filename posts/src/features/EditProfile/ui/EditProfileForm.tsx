import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import type { UserType } from '@/entities/User'

const profileSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  birthDate: z.string().optional(),
  about: z.string().max(300, 'Максимум 300 символов').optional(),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.email().safeParse(val).success, {
      message: 'Некорректный email',
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, {
      message: 'Телефон слишком короткий',
    }),
})

export type EditProfileDTO = z.infer<typeof profileSchema>

type EditProfileFormProps = {
  user: UserType
  isLoading: boolean
  onSubmit: (data: EditProfileDTO) => void
  onCancel: () => void
}

export const EditProfileForm = ({ user, isLoading, onSubmit, onCancel }: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditProfileDTO>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      birthDate: user.birthDate || '',
      about: user.about || '',
      email: user.email || '',
      phone: user.phone || '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-h-[80vh] scrollbar-hidden'>
      <div className='flex-1 overflow-y-auto pr-2 space-y-5 scrollbar-hidden '>
        <div className='grid gap-2 relative'>
          <Label htmlFor='firstName'>Имя</Label>
          <Input id='firstName' {...register('firstName')} />
          {errors.firstName && (
            <p className='text-sm text-red-500  absolute top-14'>{errors.firstName.message}</p>
          )}
        </div>

        <div className='grid gap-2 relative'>
          <Label htmlFor='lastName'>Фамилия</Label>
          <Input id='lastName' {...register('lastName')} />
          {errors.lastName && (
            <p className='text-sm text-red-500 absolute top-14'>{errors.lastName.message}</p>
          )}
        </div>

        <div className='grid gap-2 relative'>
          <Label htmlFor='birthDate'>Дата рождения</Label>
          <Input id='birthDate' type='date' {...register('birthDate')} />
        </div>

        <div className='grid gap-2 relative'>
          <Label htmlFor='about'>О себе</Label>
          <Textarea id='about' {...register('about')} />
          {errors.about && (
            <p className='text-sm text-red-500 absolute top-14'>{errors.about.message}</p>
          )}
        </div>

        <div className='grid gap-2 relative'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' {...register('email')} />
          {errors.email && (
            <p className='text-sm text-red-500 absolute top-14'>{errors.email.message}</p>
          )}
        </div>

        <div className='grid gap-2 relative'>
          <Label htmlFor='phone'>Телефон</Label>
          <Input id='phone' type='tel' {...register('phone')} />
          {errors.phone && (
            <p className='text-sm text-red-500 absolute top-14'>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className='mt-4 flex gap-3 justify-end border-t pt-4 shrink-0 bg-background'>
        <Button variant='outline' type='button' onClick={onCancel}>
          Отмена
        </Button>
        <Button isLoading={isLoading} type='submit' disabled={!isDirty}>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
