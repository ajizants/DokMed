import { useState, createContext, useContext } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const MenuContext = createContext();

const SidebarMenu = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <MenuContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </MenuContext.Provider>
    );
};

const MenuTrigger = ({ children }) => {
    const { open, toggleOpen } = useContext(MenuContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => toggleOpen()}
                ></div>
            )}
        </>
    );
};

const MenuContent = ({
    align = "right",
    width = "56",
    contentClasses = "py-1 bg-white dark:bg-gray-700",
    children,
}) => {
    const { open, setOpen } = useContext(MenuContext);

    let alignmentClasses = "origin-top-left";

    if (align === "left") {
        alignmentClasses = "origin-top-left";
    } else if (align === "right") {
        alignmentClasses = "origin-top-right";
    }

    let widthClasses = "";

    if (width === "56") {
        widthClasses = "w-56";
    }

    return (
        <>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-99999 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    style={{ left: "300%", top: "0" }}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={
                            `rounded-md ring-1 ring-black ring-opacity-5 ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const SubMenu = ({ children }) => {
    const { open } = useContext(MenuContext);

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className="ml-4">{children}</div>
        </Transition>
    );
};

const MenuLink = ({ className = "", children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out " +
                className
            }
        >
            {children}
        </Link>
    );
};

SidebarMenu.Trigger = MenuTrigger;
SidebarMenu.Content = MenuContent;
SidebarMenu.SubMenu = SubMenu;
SidebarMenu.Link = MenuLink;

export default SidebarMenu;
