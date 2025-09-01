import { SwatchBookIcon } from "lucide-react";
import useThemeStore from "../store/usetheme";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { NavLink, useLocation } from "react-router";

const Themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
];

const Navbar = () => {
  const { theme: storetheme, setTheme } = useThemeStore();
  const { isSignedIn } = useAuth();
  const location = useLocation();

  return (
    <div className="navbar bg-base-300 flex justify-between px-12">
      <NavLink className=" text-xl font-bitcount" to={"/"}>
        FTRACK
      </NavLink>
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-square btn-ghost m-1"
            aria-label="Choose theme"
          >
            <SwatchBookIcon className="h-5 w-5" />
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300  z-[50] p-1 shadow-2xl mt-3 card max-h-80 overflow-y-auto scrollbar-thin "
          >
            {Themes.map((theme) => (
              <li key={theme} className="mr-2">
                <button
                  className={`flex items-center justify-between gap-3 px-4 py-2 m-1 card hover:bg-base-200 cursor-pointer text-sm w-full ${
                    theme === storetheme ? "bg-secondary" : ""
                  }`}
                  aria-current={theme === storetheme ? "true" : "false"}
                  aria-label={`Switch to ${theme} theme`}
                  onClick={() => setTheme(theme)}
                >
                  <span className="truncate capitalize">{theme}</span>
                  <div className="flex items-center " data-theme={theme}>
                    <span className="w-4 h-4 bg-primary" />
                    <span className="w-4 h-4 bg-secondary" />
                    <span className="w-4 h-4 bg-accent" />
                    <span className="w-4 h-4 bg-neutral" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isSignedIn ? (
          <UserButton />
        ) : location.pathname === "/login" ? (
          <NavLink to="/signup" className="btn btn-primary">
            Sign Up
          </NavLink>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
