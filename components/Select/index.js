import Select from 'react-select'

export default function SelectForm({options, label}) {
  return (
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{label}</span>
      </label>
      <Select styles={{
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid hsl(var(--p))',
          borderColor: "hsl(var(--p)",
          color: "hsl(var(--p))",
          padding: 10,
        }),
        control: (provided, state) => ({
          "--tw-border-opacity": 1,
          borderColor: "hsl(var(--p) / var(--tw-border-opacity))",
          ":focus": {
            outline: "2px solid hsl(var(--p))",
          },
          outline: state.isFocused ? "2px solid hsl(var(--p))" : "",
          height: "3rem",
          display: "flex",
          width: "100%",
          borderWidth: "1px",
          "--tw-bg-opacity": 1,
          backgroundColor: "hsl(var(--b1) / var(--tw-bg-opacity))",
          borderRadius: "var(--rounded-btn, 0.5rem)",
        }),
        valueContainer: () => ({
          backgroundColor: "transparent",
          width: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          lineHeight: "2",
          color: "hsla(var(--bc) / var(--tw-text-opacity, 1))",
          "-webkit-box-align": "center",
          alignItems: "center",
          display: "grid",
          flex: "1 1 0%",
          flexWrap: "wrap",
          padding: "2px 8px",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }),
        singleValue: (provided, state) => ({
          color: "hsla(var(--bc) / var(--tw-text-opacity, 1))",
          gridArea: "1 / 1 / 2 / 3",
          marginLeft: "2px",
          marginRight: "2px",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
        })
      }} options={options} isClearable />
    </div>
  )
}