import { ModeToggle } from "@/components/mode-toggle";
import MainNavigation from "./MainNavigation";
import { ThemeProvider } from "@/components/theme-provider";

const Settings = () => {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <MainNavigation />
        <div className="mx-auto max-w-7xl px-5 py-2 sm:px-6 lg:px-8">
          <p className="text-2xl">Settings</p>
          <div className="py-2">
            <ModeToggle />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Settings;
