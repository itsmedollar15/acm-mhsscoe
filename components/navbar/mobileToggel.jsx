import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const NavbarMobileToggle = ({ openMobileNav, closeMobileNav, open }) => {
  return (
    <Button
      className="w-14 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
      icon={
        open ? (
          <CloseOutlined style={{ verticalAlign: -3 }} />
        ) : (
          <MenuOutlined style={{ verticalAlign: -3 }} />
        )
      }
      onClick={open ? closeMobileNav : openMobileNav}
    />
  );
};

export default NavbarMobileToggle;
