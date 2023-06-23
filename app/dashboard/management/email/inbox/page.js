import EmailSidebar from '@/components/partials/email/EmailSidebar';
import { getInbox, deleteEmail } from '@/utils/email';
import {
  Bars3Icon,
  CalendarIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  {
    name: 'Directory',
    href: '#',
    icon: MagnifyingGlassCircleIcon,
    current: false,
  },
  { name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
{
  /* <EmailSidebar /> */
}

const EmailDisplay = ({ email }) => {
  const renderAttachments = () => {
    return email.attachments.map((attachment, index) => (
      <div key={index}>
        <h4>Attachment {index + 1}</h4>
        <p>Filename: {attachment.filename}</p>
        <p>Content Type: {attachment.contentType}</p>
        {/* Render other attachment details as needed */}
      </div>
    ));
  };

  return (
    <div>
      <h1>{email.subject}</h1>
      <p>From: {email.from.value[0].address}</p>
      <p>To: {email.to.value[0].address}</p>
      <p>Date: {email.date.toLocaleDateString()}</p>
      <hr />
      {/* <div dangerouslySetInnerHTML={{ __html: email.html }} /> */}
      {/* {renderAttachments()} */}
    </div>
  );
};

export default async function Page() {
  const email = await getInbox();

  return (
    <main className="p-4 flex-1 h-[100vh] overflow-x-hidden overflow-y-auto bg-primary-light dark:bg-primary-dark">
      <>
        <div className="flex h-full">
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="relative z-0 flex flex-1 overflow-hidden">
              <main className=" relative  w-[100%] flex-shrink-0 overflow-y-auto xl:flex xl:flex-col ">
                <EmailSidebar deleteEmail={deleteEmail} email={email} />
              </main>
            </div>
          </div>
        </div>
      </>
    </main>
  );
}
