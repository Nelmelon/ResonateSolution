const ContactItem = ({ contact, onClick }) => (
  <div
    className='bg-softwhite border-sand hover:ring-accent flex cursor-pointer flex-col gap-2 rounded-xl border p-4 shadow transition-shadow hover:ring-2 hover:shadow-lg'
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
    <div className='text-deepblue text-lg font-semibold'>{contact.name}</div>
    <div className='text-deepblue text-sm break-all'>
      <span className='font-medium'>Email:</span>{' '}
      <a href={`mailto:${contact.email}`} className='text-accent hover:text-deepblue underline'>
        {contact.email}
      </a>
    </div>
    <div className='text-deepblue text-sm'>
      <span className='font-medium'>Phone:</span> {contact.phone}
    </div>
    <div className='text-deepblue text-sm'>
      <span className='font-medium'>Username:</span> {contact.username}
    </div>
    <div className='text-deepblue text-sm'>
      <span className='font-medium'>Company:</span> {contact.company?.name}
    </div>
    <div className='text-deepblue text-sm'>
      <span className='font-medium'>Website:</span>{' '}
      <a
        href={`http://${contact.website}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-accent hover:text-deepblue underline'
      >
        {contact.website}
      </a>
    </div>
  </div>
);

export default ContactItem;
