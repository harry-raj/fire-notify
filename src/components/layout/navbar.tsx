// Navbar
import { NotificationsDropdown } from "@/components";

export const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center ">
                <a className="text-white text-2xl font-bold" href="/">
                  Fire Notify
                </a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    href="/"
                  >
                    Dashboard
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <NotificationsDropdown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
