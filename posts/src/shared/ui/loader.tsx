import { Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

type LoaderPropsType = { className?: string }

export const Loader = ({ className }: LoaderPropsType) => {
  return <Loader2 className={cn('h-10 w-10 animate-spin', className)} />
}
