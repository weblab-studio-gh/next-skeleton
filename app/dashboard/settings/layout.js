import AppNav from "@/components/app_shell/appNav/AppNav";
import { settingsTabs } from "../../../constants/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsLayout({ children }) {
  return (
    <div className=" bg-primary-light dark:bg-primary-dark">
      <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <AppNav tabs={settingsTabs} />
        {children}
      </div>
    </div>
  );
}
