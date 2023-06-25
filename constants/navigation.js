'use client';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';

const _navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  {
    name: 'Users',
    href: '/dashboard/users/',
    icon: UsersIcon,
    current: false,
    children: [{ name: 'All User', href: '/dashboard/users/' }],
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

export { navigation };
// export { navigation, settingsTabs, productTabs };
