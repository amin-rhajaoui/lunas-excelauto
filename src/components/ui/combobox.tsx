import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  className?: string
  'aria-invalid'?: boolean
}

function Combobox({
  value,
  onChange,
  options,
  placeholder,
  className,
  'aria-invalid': ariaInvalid,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Sync inputValue when value prop changes externally
  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  const filtered = React.useMemo(() => {
    if (!inputValue) return options
    const lower = inputValue.toLowerCase()
    return options.filter(o => o.toLowerCase().includes(lower))
  }, [options, inputValue])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setInputValue(v)
    onChange(v)
    setOpen(true)
  }

  function handleSelect(option: string) {
    setInputValue(option)
    onChange(option)
    setOpen(false)
    inputRef.current?.focus()
  }

  // Close on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Keyboard navigation
  const [highlightIndex, setHighlightIndex] = React.useState(-1)

  React.useEffect(() => {
    setHighlightIndex(-1)
  }, [filtered])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && e.key === "ArrowDown") {
      setOpen(true)
      return
    }
    if (!open) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex(i => (i + 1) % filtered.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex(i => (i <= 0 ? filtered.length - 1 : i - 1))
    } else if (e.key === "Enter" && highlightIndex >= 0 && highlightIndex < filtered.length) {
      e.preventDefault()
      handleSelect(filtered[highlightIndex])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => options.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 pr-8 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
            className
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => { setOpen(!open); inputRef.current?.focus() }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <ChevronsUpDownIcon className="size-4" />
        </button>
      </div>
      {open && filtered.length > 0 && (
        <div
          ref={listRef}
          className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border bg-popover text-popover-foreground shadow-md"
        >
          {filtered.map((option, i) => (
            <button
              key={option}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(option) }}
              onMouseEnter={() => setHighlightIndex(i)}
              className={cn(
                "relative flex w-full items-center gap-2 px-2.5 py-1.5 text-sm cursor-default select-none",
                i === highlightIndex && "bg-accent text-accent-foreground",
              )}
            >
              <CheckIcon
                className={cn(
                  "size-4 shrink-0",
                  value === option ? "opacity-100" : "opacity-0"
                )}
              />
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { Combobox }
export type { ComboboxProps }
