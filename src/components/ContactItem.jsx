import { HiOutlineUserCircle } from 'react-icons/hi';

const ContactItem = ({ contact, onClick }) => (
  <div
    className='bg-softwhite border-sand group hover:ring-accent focus-within:ring-accent flex cursor-pointer items-center gap-4 rounded-xl border p-4 shadow-md transition-shadow focus-within:ring-2 hover:ring-2 hover:shadow-xl'
    onClick={() => onClick && onClick(contact)}
    tabIndex={0}
    role='button'
    aria-label={`Show details for ${contact.name}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick && onClick(contact);
      }
    }}
  >
    {/* Avatar/Icon */}
    <div className='flex-shrink-0'>
      <div className='bg-sand text-accent group-hover:bg-accent group-hover:text-softwhite flex h-12 w-12 items-center justify-center rounded-full text-3xl shadow-sm transition-colors'>
        <HiOutlineUserCircle />
      </div>
    </div>
    {/* Info */}
    <div className='min-w-0 flex-1'>
      <div className='text-deepblue truncate text-lg font-semibold'>{contact.name}</div>
      <div className='mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm'>
        <span className='text-accent truncate font-medium'>{contact.username}</span>
        <span className='text-deepblue/60 truncate'>{contact.company?.name}</span>
      </div>
      <div className='mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs'>
        <a
          href={`mailto:${contact.email}`}
          className='text-accent hover:text-deepblue truncate underline transition-colors'
        >
          {contact.email}
        </a>
        <span className='text-deepblue/50'>{contact.phone}</span>
        <a
          href={`http://${contact.website}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-accent hover:text-deepblue truncate underline transition-colors'
        >
          {contact.website}
        </a>
      </div>
    </div>
  </div>
);

export default ContactItem;
