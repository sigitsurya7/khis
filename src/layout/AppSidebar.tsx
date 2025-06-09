"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { NavItem, SubNavItem } from "../types/navigation";
import { navItems } from "../data/navItems";

import { HiChevronDown, HiEllipsisHorizontal, HiOutlineHome, HiOutlineFolder } from "react-icons/hi2";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [previousOpenSubmenus, setPreviousOpenSubmenus] = useState<Record<string, boolean>>({});

  const isActive = useCallback(
    (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path)),
    [pathname]
  );

  useEffect(() => {
    if (!isExpanded && !isHovered) {
      setPreviousOpenSubmenus(openSubmenus);
      setOpenSubmenus({});
    } else if ((isExpanded || isHovered) && Object.keys(previousOpenSubmenus).length > 0) {
      setOpenSubmenus(previousOpenSubmenus);
      setPreviousOpenSubmenus({});
    }
  }, [isExpanded, isHovered]);

  useEffect(() => {
    const newOpenSubmenus: Record<string, boolean> = {};
    
    const checkItems = (items: SubNavItem[], parentKey: string = '') => {
      items.forEach((item, index) => {
        const key = `${parentKey}-${index}`;
        
        if (isActive(item.path)) {
          let currentKey = key;
          while (currentKey.includes('-')) {
            newOpenSubmenus[currentKey] = true;
            currentKey = currentKey.substring(0, currentKey.lastIndexOf('-'));
          }
        }
        
        if (item.subItems) {
          checkItems(item.subItems, key);
        }
      });
    };
    
    navItems.forEach((nav, navIndex) => {
      if (nav.subItems) {
        checkItems(nav.subItems, `main-${navIndex}`);
      }
    });
    
    setOpenSubmenus(newOpenSubmenus);
  }, [pathname, isActive]);

  const toggleSubmenu = (key: string) => {

    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  let cnj = 0

  const renderSubItems = (
    items: SubNavItem[] = [],
    depth: number = 1,
    parentKey: string = ''
  ): React.ReactNode[] => {
    return items.map((subItem, idx) => {
      const key = `${parentKey}-${idx}`;
      const isOpen = !!openSubmenus[key];
      const hasNested = subItem.subItems && subItem.subItems.length > 0;
      const active = isActive(subItem.path);

      return (
        <div 
          key={key}
          ref={el => {
            if (el) {
              subMenuRefs.current[key] = el;
            } else {
              delete subMenuRefs.current[key];
            }
          }}
        >
          {hasNested ? (
            <button
              onClick={() => toggleSubmenu(key)}
              className={`menu-dropdown-item w-full ${
                active ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
              }`}
            >
              {subItem.name}
              <HiChevronDown
                className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-blue-500" : ""
                }`}
              />
            </button>
          ) : (
            <Link
              href={subItem.path}
              className={`menu-dropdown-item ${
                active
                  ? "menu-dropdown-item-active"
                  : "menu-dropdown-item-inactive"
              }`}
            >
              {subItem.name}
              <span className="flex items-center gap-1 ml-auto">
                {subItem.new && (
                  <span
                    className={`menu-dropdown-badge ${
                      active
                        ? "menu-dropdown-badge-active"
                        : "menu-dropdown-badge-inactive"
                    }`}
                  >
                    new
                  </span>
                )}
                {subItem.pro && (
                  <span
                    className={`menu-dropdown-badge ${
                      active
                        ? "menu-dropdown-badge-active"
                        : "menu-dropdown-badge-inactive"
                    }`}
                  >
                    pro
                  </span>
                )}
              </span>
            </Link>
          )}

          {hasNested && isOpen && (
            <div className="overflow-hidden transition-all duration-300">
              <ul className="mt-1" style={{ paddingLeft: `${depth * 16}px` }}>
                {renderSubItems(subItem.subItems!, depth + 1, key)}
              </ul>
            </div>
          )}
        </div>
      );
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others' = 'main') => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const key = `${menuType}-${index}`;
        const isOpen = !!openSubmenus[key];
        const hasActiveChild = nav.subItems?.some(item => isActive(item.path));

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => toggleSubmenu(key)}
                className={`menu-item group ${
                  isOpen || hasActiveChild ? "menu-item-active" : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isOpen || hasActiveChild ? "menu-item-icon-active" : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="menu-item-text">{nav.name}</span>
                    <HiChevronDown
                      className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-500" : ""
                      }`}
                    />
                  </>
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}

            {nav.subItems && isOpen && (
              <div className="overflow-hidden transition-all duration-300">
                <ul className="mt-2 space-y-1 ml-9">
                  {renderSubItems(nav.subItems, 1, key)}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-[#000000] dark:border-[#2e2e31] text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
                priority
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
                priority
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HiEllipsisHorizontal />
                )}
              </h2>
              {renderMenuItems(navItems, 'main')}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;