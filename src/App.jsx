import { useEffect, useMemo, useState } from 'react';

import ContactItem from './components/ContactItem';
import ContactModal from './components/ContactModal';

const PAGE_SIZE = 5;
const SORT_OPTIONS = [
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Username', value: 'username' },
  { label: 'Company', value: 'company' },
];

function useInfiniteScroll(loadMore, hasMore) {
  let loader = null;
  useEffect(() => {
    if (!hasMore || !loader) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader);
    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, loader]);
  return (node) => {
    loader = node;
  };
}

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('firstName');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch contacts');
        setLoading(false);
      });
  }, []);

  // Sorting logic
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      if (sortBy === 'firstName') {
        return a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]);
      } else if (sortBy === 'lastName') {
        const aLast = a.name.split(' ').slice(-1)[0];
        const bLast = b.name.split(' ').slice(-1)[0];
        return aLast.localeCompare(bLast);
      } else if (sortBy === 'username') {
        return a.username.localeCompare(b.username);
      } else if (sortBy === 'company') {
        return a.company?.name.localeCompare(b.company?.name);
      }
      return 0;
    });
  }, [contacts, sortBy]);

  const contactsToShow = sortedContacts.slice(0, page * PAGE_SIZE);
  const hasMore = contactsToShow.length < sortedContacts.length;

  function loadMore() {
    setPage((p) => p + 1);
  }

  const loaderRef = useInfiniteScroll(loadMore, hasMore);

  // Modal close handler
  function closeModal() {
    setSelectedContact(null);
  }

  return (
    <div className='bg-deepblue relative flex min-h-screen flex-col items-center px-2 py-6 sm:px-0'>
      <div
        className={`bg-softwhite border-sand w-full max-w-4xl rounded-2xl border p-4 shadow-lg transition-all duration-300 sm:p-8 ${selectedContact ? 'backdrop-blur-md backdrop-brightness-75' : ''}`}
        style={{
          filter: selectedContact ? 'blur(6px) brightness(0.85)' : 'none',
          transition: 'filter 0.3s',
        }}
      >
        <h1 className='text-deepblue mb-4 text-center text-2xl font-bold tracking-tight'>
          Contacts
        </h1>
        {/* Sort Button Group */}
        <div className='mb-6 flex flex-wrap justify-center gap-2'>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`rounded-lg border px-4 py-2 font-medium transition-colors duration-200 focus:outline-none ${sortBy === option.value ? 'bg-accent text-deepblue border-accent shadow' : 'bg-sand text-deepblue border-sand hover:bg-accent hover:text-deepblue'}`}
              onClick={() => {
                setSortBy(option.value);
                setPage(Math.ceil(contactsToShow.length / PAGE_SIZE));
              }}
            >
              Sort by {option.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className='text-accent text-center'>Loading contacts...</div>
        ) : error ? (
          <div className='text-center text-red-500'>{error}</div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {contactsToShow.map((contact) => (
              <ContactItem key={contact.id} contact={contact} onClick={setSelectedContact} />
            ))}
          </div>
        )}
        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className='mt-4 flex h-8 items-center justify-center'>
          {hasMore && !loading && !error && (
            <span className='text-accent animate-pulse'>Loading more...</span>
          )}
        </div>
      </div>
      {/* Modal Popup */}
      <ContactModal contact={selectedContact} onClose={closeModal} />
    </div>
  );
}

export default ContactsList;
