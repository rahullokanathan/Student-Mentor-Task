import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "New Mentor",
    path: "/new-mentor",
    icon: <IoIcons.IoMdPersonAdd />,
    cName: "nav-text",
  },
  {
    title: "New Student",
    path: "/new-student",
    icon: <IoIcons.IoIosAddCircle />,
    cName: "nav-text",
  },
  {
    title: "All Mentors",
    path: "/mentors",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "All Students",
    path: "/students",
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },
];
