'use client';
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
  BuildingStorefrontIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

const _navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  {
    name: 'POS',
    href: '/dashboard/pos/',
    icon: CurrencyEuroIcon,
    current: false,
    children: [
      { name: 'Sale', href: '/dashboard/pos/sale' },
      { name: 'Dialy Report', href: '/dashboard/pos/report' },
    ],
  },
  {
    name: 'Store',
    href: '/dashboard/shop',
    icon: BuildingStorefrontIcon,
    current: false,
    children: [
      { name: 'Overview', href: '/dashboard/store/overview' },
      { name: 'Rota', href: '/dashboard/store/rota' },
      { name: 'Settings', href: '/dashboard/store/settings' },
      { name: 'Stock Management', href: '/dashboard/store/stock' },
    ],
  },
  {
    name: 'Webshop',
    href: '/dashboard/shop',
    icon: ShoppingCartIcon,
    current: false,
    children: [
      { name: 'Overview', href: '/dashboard/webshop/overview' },
      { name: 'Orders', href: '/dashboard/webshop/orders' },
      { name: 'Invoices', href: '/dashboard/webshop/invocies' },
    ],
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: ChartBarIcon,
    current: false,
    children: [
      { name: 'Overview', href: '/dashboard/analytics/overview' },
      { name: 'Store', href: '/dashboard/analytics/store' },
      { name: 'Webshop', href: '/dashboard/analytics/webshop' },
      { name: 'Reports', href: '/dashboard/analytics/reports' },
    ],
  },
  {
    name: 'Management',
    href: '/dashboard/crm',
    icon: BookOpenIcon,
    current: false,
    children: [
      { name: 'Products', href: '/dashboard/management/products' },
      { name: 'Suppliers', href: '/dashboard/management/suppliers' },
      { name: 'Staffs', href: '/dashboard/management/staffs' },
      { name: 'Payments', href: '/dashboard/management/payments' },
      { name: 'Shipping', href: '/dashboard/management/shipping' },
    ],
  },
  {
    name: 'Marketing',
    href: '/dashboard/marketing',
    icon: PresentationChartLineIcon,
    current: false,
    children: [
      { name: 'Store', href: '/dashboard/marketing/campaigns' },
      { name: 'Webshop', href: '/dashboard/marketing/emails' },
      { name: 'Social', href: '/dashboard/marketing/social' },
      { name: 'Ads', href: '/dashboard/marketing/ads' },
    ],
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: CogIcon,
    current: false,
  },
  {
    name: 'Scanner',
    href: '/dashboard/scanner',
    icon: QrCodeIcon,
    current: false,
  },
  // {
  //   name: 'Email',
  //   href: '/dashboard/email/inbox',
  //   icon: EnvelopeIcon,
  //   current: false,
  //   children: [
  //     { name: 'Send', href: '/dashboard/email/send' },
  //     { name: 'Inbox', href: '/dashboard/email/inbox' },
  //     { name: 'Outbox', href: '/dashboard/email/outbox' },
  //     { name: 'Drafts', href: '/dashboard/email/Drafts' },
  //     { name: 'Important', href: '/dashboard/email/important' },
  //   ],
  // },

  // {
  //   name: 'Projects',
  //   href: '/dashboard/projects',
  //   icon: FolderIcon,
  //   current: false,
  //   children: [
  //     { name: 'Projects', href: '/dashboard/projects/' },
  //     { name: 'Overview', href: '/dashboard/projects/overview' },
  //     { name: 'Contracts', href: '/dashboard/projects/contracts' },
  //     { name: 'Tasks', href: '/dashboard/projects/tasks' },
  //     { name: 'Kan-Ban', href: '/dashboard/projects/kan_ban' },
  //     { name: 'Invoices', href: '/dashboard/projects/invoices' },
  //   ],
  // },
  // {
  //   name: 'CRM',
  //   href: '/dashboard/crm',
  //   icon: UsersIcon,
  //   current: false,
  //   children: [
  //     { name: 'Overview', href: '/dashboard/crm/overview' },
  //     { name: 'Partners', href: '/dashboard/crm/partners' },
  //     { name: 'Leads', href: '/dashboard/crm/leads' },
  //     { name: 'Quotes', href: '/dashboard/crm/quotes' },
  //   ],
  // },

  // {
  //   name: 'Database',
  //   href: '/dashboard/',
  //   icon: CircleStackIcon,
  //   current: false,
  //   children: [
  //     { name: 'Posts', href: '/dashboard/posts' },
  //     { name: 'Categories', href: '/dashboard/categories' },
  //     { name: 'Orders', href: '/dashboard/orders' },
  //     { name: 'Products', href: '/dashboard/products' },
  //   ],
  // },
];

const _settingsTabs = [
  { name: 'General', href: '/dashboard/settings', current: true },
  {
    name: 'Integrations',
    href: '/dashboard/settings/integrations',
    current: false,
  },
  { name: 'Billing', href: '/dashboard/settings/billing', current: false },
];

const _productTabs = [
  { name: 'Products', href: '/dashboard/management/products', current: true },

  {
    name: 'Categories',
    href: '/dashboard/management/products/categories',
    current: false,
  },
  {
    name: 'Brands',
    href: '/dashboard/management/products/brands',
    current: false,
  },
];

const _ordersTabs = [
  { name: 'Orders', href: '/dashboard/shop/orders', current: true },
  { name: 'Add Order', href: '/dashboard/shop/orders/add', current: false },
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
const ordersTabs = attachCurrentToObjAndChildren(_ordersTabs);

export { navigation, productTabs, settingsTabs, ordersTabs };
// export { navigation, settingsTabs, productTabs };
