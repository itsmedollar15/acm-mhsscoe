"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import checkNavItemAccess from "@/utils/checkNavItemAccess";
import { Layout, Menu, Grid } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const DashboardLayout = ({ SIDER_ITEMS = [], children }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const { lg } = Grid.useBreakpoint();

  SIDER_ITEMS = SIDER_ITEMS.filter(({ conditions }) =>
    checkNavItemAccess(conditions, { isLoggedIn, role })
  );

  const getSelectedMenuItemKey = () => {
    return `dashboard_layout_side_item_${SIDER_ITEMS.indexOf(
      SIDER_ITEMS.filter(({ href }) => pathname.includes(href))[0]
    )}`;
  };
  return (
    <>
      <Layout className="!bg-transparent !relative">
        <Layout.Sider
          className="!bg-transparent h-[calc(100%-40px)] !absolute mr-0 lg:mr-5"
          width={256}
          collapsedWidth={0}
          collapsed={!lg}
        >
          <Glassmorphism className="h-full">
            <Menu
              className="w-full h-full !bg-transparent text-center lg:text-start"
              selectedKeys={getSelectedMenuItemKey()}
            >
              {SIDER_ITEMS.map(({ label, icon, href }, index) => (
                <Menu.Item
                  key={`dashboard_layout_side_item_${index}`}
                  icon={icon}
                >
                  <Link href={href}>{label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Glassmorphism>
        </Layout.Sider>
        <Layout.Content className="lg:ml-[276px] !min-h-[calc(100vh-64px-40px)]">
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
