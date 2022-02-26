import { useState } from 'react'

export const useSelectedText = () => {
  const [text, setText] = useState('')
  const select = () => {
    const selected = window.getSelection() as Selection
    setText(selected.toString())
  }
  return [select, text] as const
}
