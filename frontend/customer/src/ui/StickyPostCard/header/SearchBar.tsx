import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar() {
    return (
        <Autocomplete
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[]}
            visibleFrom="xs"
            className="text-yellow-900 dark:text-white"
        />

    );
}