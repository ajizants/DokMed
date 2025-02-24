import React from "react";
import FooterApp from "@/Components/Footer";
import MobileNav from "@/Components/MobileNav";
import TopBar from "@/Components/TopBar";
import SideBar from "@/Components/SideBar";

export default function Authenticated({ user, header, children }) {
    // console.log("🚀 ~ Authenticated ~ user:", user);
    const userRole = user.roles[0];
    return (
        <>
            <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
                <TopBar user={user} />

                <div className="flex">
                    <SideBar userRole={userRole} />
                    <main className="flex-1 w-full lg:ml-20 px-4 lg:px-0 py-2">
                        {children}
                    </main>
                </div>
            </div>

            <MobileNav user={user} />
            <div className="lg:ml-20 mb-16 lg:mb-0">
                <FooterApp />
            </div>
        </>
    );
}
