import AppNav from "@/components/app_shell/appNav/AppNav";
import NarrowPageContainer from "@/components/ui/containers/NarrowPageContainer";
import { productTabs } from "@/constants/navigation";

export default function layout({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AppNav tabs={productTabs} /> {children}
    </div>
  );
}
