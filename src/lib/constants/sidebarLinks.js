// lib/constants/sidebarLinks.js
import {
  Home,
  ShoppingCart,
  List,
  Tag,
  ClipboardList,
  Users,
  Star,
  FileText,
  Image as ImageIcon,
  Mail,
  BarChart,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Home size={18} /> },
  { label: "Categories", href: "/admin/categories", icon: <List size={18} /> },
  { label: "Products", href: "/admin/products", icon: <ShoppingCart size={18} /> },
  { label: "Brands", href: "/admin/brands", icon: <Tag size={18} /> },
  { label: "Orders", href: "/admin/orders", icon: <ClipboardList size={18} /> },
  { label: "Customers", href: "/admin/customers", icon: <Users size={18} /> },
  { label: "Reviews", href: "/admin/reviews", icon: <Star size={18} /> },
  { label: "CMS Pages", href: "/admin/cms-pages", icon: <FileText size={18} /> },
  { label: "Banners", href: "/admin/banners", icon: <ImageIcon size={18} /> },
  { label: "Newsletter", href: "/admin/newsletter", icon: <Mail size={18} /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart size={18} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
];
