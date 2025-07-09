import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/contexts/navLinks";
import { COLORS } from "@/constants/colors";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   try {
    //     setUser(JSON.parse(storedUser));
    //     console.log(user)
    //   } catch (err) {
    //     console.error("Failed to parse user:", err);
    //   }
    // }
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ correct
    }
  }, []);

  const renderLinks = (isMobile = false) =>
    NAV_LINKS.map(({ name, to, icon: Icon }) => {
      const isActive = location.pathname === to;

      return (
        <Link
          key={to}
          to={to}
          onClick={() => isMobile && setIsOpen(false)}
          className={`flex items-center px-4 py-3 font-medium space-x-2 relative transition-all ${
            isActive ? "border-l-4" : ""
          }`}
          style={{
            backgroundColor: isActive ? COLORS.activeBg : COLORS.white,
            color: isActive ? COLORS.activeText : COLORS.grayText,
            borderLeftColor: isActive ? COLORS.activeText : "transparent",
          }}
        >
          <Icon className="w-5 h-5" />
          <span>{name}</span>
        </Link>
      );
    });

  const userName = user?.name || "Admin";
  const userEmail = user?.email || "admin@food.com";
  const userImage = user?.image || "https://avatar.iran.liara.run/public";

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <nav
        className="fixed h-screen w-64 hidden lg:flex flex-col"
        style={{
          backgroundColor: COLORS.white,
          borderRight: `1px solid ${COLORS.grayText}20`,
        }}
      >
        <div
          className="p-4 border-b"
          style={{ borderColor: `${COLORS.grayText}20` }}
        >
          <div className="text-2xl font-bold text-gray-800">Admin Panel</div>
        </div>
        <div className="flex-1 overflow-y-auto">{renderLinks()}</div>
        <div
          className="p-4 border-t flex items-center"
          style={{ borderColor: `${COLORS.grayText}20` }}
        >
          <img src={userImage} alt="User" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
        </div>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-20 p-2 rounded-md"
        style={{ backgroundColor: "#1F2937", color: "#D1D5DB" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-10 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(38,38,38,0.8)" }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 shadow-lg flex flex-col"
            style={{ backgroundColor: COLORS.white }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-4 border-b"
              style={{ borderColor: `${COLORS.grayText}20` }}
            >
              <div className="text-2xl font-bold text-gray-800">FoodAdmin</div>
            </div>
            <div className="flex-1 overflow-y-auto">{renderLinks(true)}</div>
            <div
              className="p-4 border-t flex items-center"
              style={{ borderColor: `${COLORS.grayText}20` }}
            >
              <img
                src={userImage}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
