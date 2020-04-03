import React, { FormEvent, ChangeEvent, useRef, useEffect } from "react";

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactChild;
}

function Search({ value, onChange, onSubmit, children }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} ref={inputRef} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  );
}

export { Search };
