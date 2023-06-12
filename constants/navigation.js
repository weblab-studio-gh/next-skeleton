"use client";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  ChartBarSquareIcon,
  ShoppingCartIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
  CogIcon,
  EnvelopeIcon,
  BookOpenIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";

const _navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  {
    name: "POS",
    href: "/dashboard/pos/",
    icon: CurrencyEuroIcon,
    current: false,
    children: [
      { name: "Transactions", href: "/dashboard/pos/send" },
      { name: "Orders", href: "/dashboard/pos/inbox" },
      { name: "Appointments", href: "/dashboard/pos/outbox" },
    ],
  },
  {
    name: "Email",
    href: "/dashboard/email/inbox",
    icon: EnvelopeIcon,
    current: false,
    children: [
      { name: "Send", href: "/dashboard/email/send" },
      { name: "Inbox", href: "/dashboard/email/inbox" },
      { name: "Outbox", href: "/dashboard/email/outbox" },
      { name: "Drafts", href: "/dashboard/email/Drafts" },
      { name: "Important", href: "/dashboard/email/important" },
    ],
  },

  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Projects", href: "/dashboard/projects/" },
      { name: "Overview", href: "/dashboard/projects/overview" },
      { name: "Contracts", href: "/dashboard/projects/contracts" },
      { name: "Tasks", href: "/dashboard/projects/tasks" },
      { name: "Kan-Ban", href: "/dashboard/projects/kan_ban" },
      { name: "Invoices", href: "/dashboard/projects/invoices" },
    ],
  },
  {
    name: "Shop",
    href: "/dashboard/shop",
    icon: ShoppingCartIcon,
    current: false,
    children: [
      { name: "Products", href: "/dashboard/shop/products" },
      { name: "Categories", href: "/dashboard/shop/categories" },
      { name: "Orders", href: "/dashboard/shop/orders" },
      { name: "Shipping", href: "/dashboard/shop/shipping" },
    ],
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartBarIcon,
    current: false,
    children: [
      { name: "Overview", href: "/dashboard/analytics/overview" },
      { name: "Sales", href: "/dashboard/analytics/sales" },
      { name: "Reports", href: "/dashboard/analytics/reports" },
      { name: "Performance", href: "/dashboard/analytics/performance" },
    ],
  },
  {
    name: "Marketing",
    href: "/dashboard/marketing",
    icon: PresentationChartLineIcon,
    current: false,
    children: [
      { name: "Campaigns", href: "/dashboard/marketing/campaigns" },
      { name: "Emails", href: "/dashboard/marketing/emails" },
      { name: "Social", href: "/dashboard/marketing/social" },
      { name: "Ads", href: "/dashboard/marketing/ads" },
    ],
  },
  {
    name: "CRM",
    href: "/dashboard/crm",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Overview", href: "/dashboard/crm/overview" },
      { name: "Partners", href: "/dashboard/crm/partners" },
      { name: "Leads", href: "/dashboard/crm/leads" },
      { name: "Quotes", href: "/dashboard/crm/quotes" },
    ],
  },
  {
    name: "Management",
    href: "/dashboard/crm",
    icon: BookOpenIcon,
    current: false,
    children: [
      { name: "Overview", href: "/dashboard/management/overview" },
      { name: "Income", href: "/dashboard/management/partners" },
      { name: "Expense", href: "/dashboard/management/leads" },
      { name: "Accounting", href: "/dashboard/management/accounting" },
      { name: "Team", href: "/dashboard/management/quotes" },
      { name: "Stock", href: "/dashboard/management/stock" },
    ],
  },
  {
    name: "Database",
    href: "/dashboard/",
    icon: CircleStackIcon,
    current: false,
    children: [
      { name: "Posts", href: "/dashboard/posts" },
      { name: "Categories", href: "/dashboard/categories" },
      { name: "Orders", href: "/dashboard/orders" },
      { name: "Products", href: "/dashboard/products" },
    ],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: CogIcon,
    current: false,
  },
];

const _settingsTabs = [
  { name: "General", href: "/dashboard/settings", current: true },
  {
    name: "Integrations",
    href: "/dashboard/settings/integrations",
    current: false,
  },
  { name: "Billing", href: "/dashboard/settings/billing", current: false },
];
const _productTabs = [
  { name: "List", href: "/dashboard/shop/products", current: true },
  {
    name: "Add Product",
    href: "/dashboard/shop/products/add",
    current: false,
  },
  {
    name: "Suppliers",
    href: "/dashboard/shop/products/suppliers",
    current: false,
  },
];

const attachCurrentToObjAndChildren = (array) => {
  let arr = [];
  array.forEach((item) => {
    let obj = item;
    obj.current = function (pathName) {
      if (obj.href === pathName) return true;
    };
    if (obj.children) {
      obj.children.forEach((child) => {
        child.current = function (pathName) {
          if (child.href === pathName) return true;
        };
      });
    }
    arr.push(obj);
  });
  return arr;
};

const navigation = attachCurrentToObjAndChildren(_navigation);
const productTabs = attachCurrentToObjAndChildren(_productTabs);
const settingsTabs = attachCurrentToObjAndChildren(_settingsTabs);

export { navigation, productTabs, settingsTabs };
// export { navigation, settingsTabs, productTabs };
