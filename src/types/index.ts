export type ContentBody = {
  start: number
  end: number
  content: string
  label: string | null
  isMarked?: boolean
  abbreviation?: string
  color?: string
}

export type LoadingStatus = 'idle' | 'loading' | 'fulfilled' | 'failed'
