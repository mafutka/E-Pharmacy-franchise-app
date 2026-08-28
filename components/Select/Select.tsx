"use client"

import { useState, useRef, useEffect } from "react"
import scss from "./Select.module.scss"

type Option = {
  value: string
  label: string
}

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(
    (option) => option.value === value
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div
      ref={selectRef}
      className={`${scss.select} ${className}`}
    >
      <button
        type="button"
        className={scss.control}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={
            selectedOption
              ? scss.value
              : scss.placeholder
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <svg
          className={`${scss.arrow} ${
            isOpen ? scss.arrowOpen : ""
          }`}
        >
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </button>

      {isOpen && (
        <div className={scss.dropdown}>
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`${scss.option} ${
                option.value === value
                  ? scss.selected
                  : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}