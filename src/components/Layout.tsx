import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 ml-0 lg:ml-64 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
