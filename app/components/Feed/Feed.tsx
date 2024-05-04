"use client";

import { Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import CreatePostModal from "../Modals/CreateProjectModal";
import FilterModal from "../Modals/FilterModal";
import { Projects } from "./Projects";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Feed() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) params.set("query", term);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-col grow space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-2 items-center space-y-2 md:space-y-0">
        <Input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          variant="bordered"
          placeholder="Search..."
          startContent={<FiSearch color="gray" size={22} />}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <FilterModal />
          <CreatePostModal />
        </div>
      </div>
      <Projects query={searchParams.get("query")?.toString()} />
    </div>
  );
}
