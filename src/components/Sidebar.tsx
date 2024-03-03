import { SearchButton } from "./SearchButton";

export const Sidebar = () => {
  return (
    <div className="flex h-full w-[32rem] flex-col gap-y-4 bg-gray-100 p-4">
      <SearchButton fullWidth />
      <p className="border-b-2 text-2xl">Widget Name</p>
    </div>
  );
};
