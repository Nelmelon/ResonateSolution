const ContactModal = ({ contact, onClose }) => {
  if (!contact) return null;
  return (
    <div
      className='pointer-events-auto fixed inset-0 z-50 flex items-center justify-center'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
    >
      <div
        className='bg-softwhite border-accent animate-fadein pointer-events-auto relative w-full max-w-md rounded-xl border-2 p-6 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='text-accent hover:text-deepblue absolute top-2 right-2 text-2xl font-bold focus:outline-none'
          onClick={onClose}
          aria-label='Close'
        >
          &times;
        </button>
        <h2 className='text-deepblue mb-2 text-xl font-bold'>{contact.name}</h2>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Username:</span> {contact.username}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Email:</span>{' '}
          <a href={`mailto:${contact.email}`} className='hover:text-accent underline'>
            {contact.email}
          </a>
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Phone:</span> {contact.phone}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Website:</span>{' '}
          <a
            href={`http://${contact.website}`}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-accent underline'
          >
            {contact.website}
          </a>
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Company:</span> {contact.company?.name}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Address:</span> {contact.address?.suite},{' '}
          {contact.address?.street}, {contact.address?.city}, {contact.address?.zipcode}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Geo:</span> {contact.address?.geo?.lat},{' '}
          {contact.address?.geo?.lng}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Company catchphrase:</span> {contact.company?.catchPhrase}
        </div>
        <div className='text-deepblue mb-1 text-sm'>
          <span className='font-medium'>Company bs:</span> {contact.company?.bs}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
