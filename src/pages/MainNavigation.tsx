import { useLocation, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAuth } from "@/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { User } from "lucide-react";

const initialNavigation = [
  { name: "Dashboard", href: "mainpage", current: false },
  { name: "Settings", href: "settings", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MainNavigation = () => {
  const [navigation, setNavigation] = useState(initialNavigation);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    setNavigation((prev) =>
      prev.map((item) => ({
        ...item,
        current: item.href === currentPath,
      }))
    );
  }, [location.pathname]);

  const handleMenuClick = (href: string) => {
    if (href === "logout") {
      logout();
      navigate("/", { replace: true });
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Disclosure as="nav" className="bg-slate-200 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => handleMenuClick(item.href)}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-slate-300 dark:bg-gray-900 text-black dark:text-white font-bold"
                          : "text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white font-medium",
                        "rounded-md px-3 py-2 text-sm"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ModeToggle />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-slate-100 dark:bg-gray-800 p-1 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-slate-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700">
                    <span className="sr-only">Open user menu</span>                   
                    <User aria-hidden="true" className="size-6 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      onClick={() => handleMenuClick("settings")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      onClick={() => handleMenuClick("logout")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                onClick={() => handleMenuClick(item.href)}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-slate-300 dark:bg-gray-900 text-black dark:text-white font-bold"
                    : "text-black dark:text-gray-300 hover:bg-gray-700 hover:text-white font-medium",
                  "block rounded-md px-3 py-2 text-base"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </ThemeProvider>
  );
};

export default MainNavigation;
