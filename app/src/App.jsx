import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ListingsView from './components/ListingsView';
import RentalsView from './components/RentalsView';
import ProjectsView from './components/ProjectsView';
import FavouritesView from './components/FavouritesView';
import InsightsView from './components/InsightsView';
import ListingDetailModal from './components/ListingDetailModal';
import LoginModal from './components/LoginModal';
import { getStoredSession, clearSession, getSavedFavourites, toggleFavourite } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('listings');
  const [session, setSession] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Restore session & favourites on mount
  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      setSession(stored);
      setSavedIds(getSavedFavourites(stored.user.email));
    } else {
      setSavedIds(getSavedFavourites('guest'));
    }
  }, []);

  const handleLoginSuccess = (user) => {
    const stored = getStoredSession();
    setSession(stored || { user });
    setSavedIds(getSavedFavourites(user.email));
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setSavedIds(getSavedFavourites('guest'));
  };

  const handleToggleSave = (listingId) => {
    const userEmail = session ? session.user.email : 'guest';
    const updated = toggleFavourite(userEmail, listingId);
    setSavedIds(updated);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        session={session}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'listings' && (
          <ListingsView 
            onSelectListing={(l) => setSelectedListing(l)}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'rentals' && (
          <RentalsView />
        )}

        {activeTab === 'projects' && (
          <ProjectsView />
        )}

        {activeTab === 'saved' && (
          <FavouritesView 
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectListing={(l) => setSelectedListing(l)}
            user={session?.user}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsView />
        )}
      </main>

      {/* Listing Detail Modal */}
      <ListingDetailModal 
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        isSaved={selectedListing ? savedIds.includes(selectedListing.listing_id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Login Auth Modal */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
