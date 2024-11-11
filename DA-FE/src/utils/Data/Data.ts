import {
  BookOpen,
  BookOpenCheck,
  Heart,
  Layout,
  Settings,
  Users,
  User,
  Archive,
  SquarePen,
  Search,
  Timer
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
  { name: "Words", icon: React.createElement(BookOpen) },
  { name: "Categories", icon: React.createElement(Archive) },
  { name: "Favorites", icon: React.createElement(Heart) },
  { name: "Settings", icon: React.createElement(Settings) },
];

export const statisticsData = [
  {
    name: "Customers",
    value: "2300",
    bgColor: "bg-indigo-500",
    textColor: "text-indigo-500",
    icon: React.createElement(User),
  },
  {
    name: "Words",
    value: "10000",
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
    value: "5000",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    icon: React.createElement(Search),
  },
];

export const userData = [
  {
    id: 1,
    title: "Total Users",
    value: "10",
    icon: React.createElement(User, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 2,
    title: "Active Editors",
    value: "5",
    icon: React.createElement(SquarePen, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 3,
    title: "Total Words",
    value: "1000",
    icon: React.createElement(BookOpenCheck, {className: "text-blue-500 h-8 w-8"}),
  }
]

export const wordData = [
  {
    id: 1,
    title: "Total Words",
    value: "1000",
    icon: React.createElement(BookOpenCheck, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 2,
    title: "Total Categories",
    value: "100",
    icon: React.createElement(Archive, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 3,
    title: "Last Updated",
    value: "1 days ago",
    icon: React.createElement(Timer, {className: "text-blue-500 h-8 w-8"}),
  }
]

export const categoryData = [
  {
    id: 1,
    title: "Total Categories",
    value: "100",
    icon: React.createElement(Archive, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 2,
    title: "Total Words",
    value: "1000",
    icon: React.createElement(BookOpenCheck, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 3,
    title: "Last Updated",
    value: "5 days ago",
    icon: React.createElement(Timer, {className: "text-blue-500 h-8 w-8"}),
  }
]

export const favoriteData = [
  {
    id: 1,
    title: "Total Categories",
    value: "300",
    icon: React.createElement(Archive, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 2,
    title: "Total Favorites",
    value: "500",
    icon: React.createElement(BookOpenCheck, {className: "text-blue-500 h-8 w-8"}),
  },
  {
    id: 3,
    title: "Last Updated",
    value: "1 days ago",
    icon: React.createElement(Timer, {className: "text-blue-500 h-8 w-8"}),
  }
]