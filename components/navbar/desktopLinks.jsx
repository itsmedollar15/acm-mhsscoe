import { NAVBAR_LINKS } from "@/constants/navbarItems";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import React from "react";
import { Home, Calendar, Users, BookOpen } from "lucide-react";

const getIcon = (href) => {
  switch (href) {
    case "/":
      return <Home size={16} className="mr-1.5" />;
    case "/events":
      return <Calendar size={16} className="mr-1.5" />;
    case "/teams":
      return <Users size={16} className="mr-1.5" />;
    case "/magazines":
      return <BookOpen size={16} className="mr-1.5" />;
    default:
      return null;
  }
};

function NavbarDesktopLinks() {
  let pathname = usePathname();
  if (pathname.includes("/teams/")) pathname = "/teams";

  const menuItems = NAVBAR_LINKS.map(item => ({
    ...item,
    icon: getIcon(item.href),
    className: "!text-[15px] font-medium nav-link",
    style: {
      padding: "0.5rem 1rem",
      margin: "0 0.25rem",
      borderRadius: "0.75rem",
      color: pathname === item.href ? "#007bff" : "#4B5563",
      fontWeight: pathname === item.href ? "600" : "500",
      backgroundColor: pathname === item.href ? "rgba(0, 123, 255, 0.1)" : "transparent",
      position: "relative",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease-in-out",
      display: "flex",
      alignItems: "center",
    }
  }));

  return (
    <div className="flex flex-1 justify-center text-center">
      <Menu
        className="flex justify-center !bg-transparent !border-none !shadow-none min-h-[48px]"
        mode="horizontal"
        disabledOverflow={true}
        selectedKeys={[pathname]}
        items={menuItems}
        style={{
          backgroundColor: "transparent",
          borderBottom: "none",
          minWidth: "auto",
          lineHeight: "32px",
        }}
        rootClassName="custom-menu"
      />
      <style jsx global>{`
        .custom-menu .ant-menu-item {
          color: #4B5563 !important;
          margin: 0 0.25rem !important;
        }
        .custom-menu .ant-menu-item:hover {
          color: #007bff !important;
          background-color: rgba(0, 123, 255, 0.08) !important;
          transform: translateY(-1px);
        }
        .custom-menu .ant-menu-item-selected {
          color: #007bff !important;
          background-color: rgba(0, 123, 255, 0.1) !important;
          font-weight: 600 !important;
          box-shadow: 0 1px 3px rgba(0, 123, 255, 0.1);
        }
        .custom-menu .ant-menu-item::after {
          display: none !important;
        }
        .custom-menu .ant-menu-item {
          transition: all 0.2s ease-in-out !important;
          border-radius: 0.75rem !important;
          padding: 0.5rem 1rem !important;
        }
        .custom-menu .ant-menu-item svg {
          transition: all 0.2s ease-in-out !important;
        }
        .custom-menu .ant-menu-item:hover svg {
          transform: scale(1.1);
          color: #007bff !important;
        }
        .custom-menu .ant-menu-item-selected svg {
          color: #007bff !important;
        }
      `}</style>
    </div>
  );
}

export default NavbarDesktopLinks;
