import React from "react"
import * as Icon from "react-feather"

const horizontalMenuConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "dropdown",
    icon: <Icon.Home size={16} />,
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/",
        permissions: ["admin", "editor"]
      }
    ]
  },
  {
    id: "usersApp",
    title: "User",
    type: "dropdown",
    icon: <Icon.Layers size={16} />,
    children: [
      {
        id: "userList",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/app/user/list",
        permissions: ["admin", "editor"]
      }
    ]
  },


  {
    id: "campaigns",
    title: "Campaign",
    type: "dropdown",
    icon: <Icon.User size={16} />,
    children: [
      {
        id: "userList",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/app/campaign/list",
        permissions: ["admin", "editor"]
      }
    ]
  },

  {
    id: "transactions",
    title: "Transaction",
    type: "dropdown",
    icon: <Icon.List size={16} />,
    children: [
      {
        id: "userList",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/app/transaction/list",
        permissions: ["admin", "editor"]
      }
    ]
  }  
]

export default horizontalMenuConfig
