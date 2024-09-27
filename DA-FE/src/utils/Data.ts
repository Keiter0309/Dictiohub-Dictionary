import {
  BookOpen,
  BookOpenCheck,
  Heart,
  Layout,
  Settings,
  Users,
  User,
  Menu,
  X,
  Archive,
  Circle,
  Bell,
  Moon,
  Search,
  TrendingUp,
  Clock,
  ChartLine,
} from "lucide-react";
import React from "react";

export const Data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

export const sideBarData = [
  { name: "Dashboard", icon: React.createElement(Layout) },
  { name: "Users", icon: React.createElement(Users) },
  { name: "Settings", icon: React.createElement(Settings) },
  { name: "Words", icon: React.createElement(BookOpen) },
  { name: "Categories", icon: React.createElement(Archive) },
  { name: "Favorites", icon: React.createElement(Heart) },
];

export const statisticsData = [
    {
      name: "Customers",
      value: "2.300",
      bgColor: "bg-indigo-500",
      textColor: "text-indigo-500",
      icon: React.createElement(User),
    },
    {
      name: "Words",
      value: "10.000",
      bgColor: "bg-green-500",
      textColor: "text-green-500",
      icon: React.createElement(BookOpenCheck),
    },
    {
      name: "Categories",
      value: "100",
      bgColor: "bg-red-500",
      textColor: "text-red-500",
      icon: React.createElement(Archive),
    },
    {
      name: "Searches",
      value: "5.000",
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
      icon: React.createElement(Search),
    },
]