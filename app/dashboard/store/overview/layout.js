import AppNav from '@/components/app_shell/appNav/AppNav';
import { ordersTabs } from '@/constants/navigation';

export default function layout({ children }) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <AppNav tabs={ordersTabs} /> {children}
    </div>
  );
}
