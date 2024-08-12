import { Leaf, BarChart2, ClipboardList, Users, Award } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "EcoTracker",
    to: "/",
    icon: <Leaf className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Log Activity",
    to: "/log",
    icon: <ClipboardList className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Social",
    to: "/social",
    icon: <Users className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Challenges",
    to: "/challenges",
    icon: <Award className="h-4 w-4" />,
    page: <Index />,
  },
];
