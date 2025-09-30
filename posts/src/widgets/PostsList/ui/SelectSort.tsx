import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

type SelectSortPropsType = {
  sort: 'ASC' | 'DESC'
  onChangeSort: (value: 'ASC' | 'DESC') => void
}

export const SelectSort = ({ sort, onChangeSort }: SelectSortPropsType) => {
  return (
    <div className='flex justify-end items-center gap-2 w-full mb-6'>
      <Select value={sort} onValueChange={onChangeSort}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Выберите сортировку' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='DESC'>Сначала новые</SelectItem>
          <SelectItem value='ASC'>Сначала старые</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
