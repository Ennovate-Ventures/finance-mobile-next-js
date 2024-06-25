import { ReactNode } from "react";
import Header from "./Header";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="px-5 md:px-20 py-5 md:py-10 bg-customYellow h-screen">{children}</main>
    </div>
  );
}

export default MainLayout;
