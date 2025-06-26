import React from "react";
import SideNav from "../../components/SideNav";
import Header from "../../components/Header";
import AuthProvider from "../../providers/AuthProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="bg-re-400 h-screen flex overflow-y-hidden">
        <SideNav />

        <div className="flex-2/3 h-screen relative">
          <Header />
          <main className="h-screen pt-48 pb-4">
            <div className="myContainer h-full pb-20 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
