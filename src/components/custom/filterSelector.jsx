import * as React from "react"

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/ui/combobox"


export function FilterSelector({ tags, placeholder, setFilters }) {
    const [value, setValue] = React.useState([])

    return (
        <Combobox
            items={tags}
            multiple
            value={value}
            onValueChange={(value) => {
                setValue(value)
                setFilters(value)
            }}
        >
            <ComboboxChips>
                <ComboboxValue>
                    {value.map((item) => (
                        <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder={placeholder} />
            </ComboboxChips>
            <ComboboxContent>
                <ComboboxEmpty>Pas de tags trouvés.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}