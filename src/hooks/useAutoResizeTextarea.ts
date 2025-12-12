import { useEffect, RefObject } from 'react'

/**
 * Custom hook that automatically adjusts textarea height based on content
 * @param textareaRef - Ref to the textarea element
 * @param value - Current value of the textarea
 */
export function useAutoResizeTextarea(
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string
) {
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'
    
    // Set height to scrollHeight to fit content
    // Use a small offset to prevent scrollbar flicker
    const scrollHeight = textarea.scrollHeight
    textarea.style.height = `${scrollHeight}px`
  }, [value, textareaRef])

  // Also resize on mount to handle initial content
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${scrollHeight}px`
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [textareaRef])
}

