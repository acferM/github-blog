interface SearchFormProps {
  onChange: (value: string) => void
}

export function SearchForm({ onChange }: SearchFormProps) {
  return (
    <header>
      <form className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <strong className="text-base-subtitle font-default font-bold text-lg leading-default">
            Publicações
          </strong>

          <span className="text-base-span font-default text-sm leading-default">
            6 publicações
          </span>
        </div>

        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar conteúdo"
          className="px-4 py-3 bg-base-input border border-base-border rounded-md text-base-title placeholder:text-base-label focus:outline focus:outline-blue"
        />
      </form>
    </header>
  )
}
