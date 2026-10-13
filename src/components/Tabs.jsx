export function Tabs({
  id,
  labels,
  active,
  onChange,
  className,
  buttonClassName,
  activeClassName,
  label,
}) {
  return (
    <div className={className} role="tablist" aria-label={label}>
      {labels.map((title, index) => (
        <button
          key={title}
          type="button"
          id={`${id}-tab-${index}`}
          role="tab"
          aria-selected={index === active}
          aria-controls={`${id}-panel-${index}`}
          tabIndex={index === active ? 0 : -1}
          className={`${buttonClassName} ${index === active ? activeClassName : ""}`}
          onClick={() => onChange(index)}
          onKeyDown={(event) => {
            let next;
            if (event.key === "ArrowRight" || event.key === "ArrowDown")
              next = (index + 1) % labels.length;
            if (event.key === "ArrowLeft" || event.key === "ArrowUp")
              next = (index - 1 + labels.length) % labels.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = labels.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            onChange(next);
            document.getElementById(`${id}-tab-${next}`)?.focus();
          }}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
