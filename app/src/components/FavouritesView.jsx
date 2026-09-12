import React from 'react';
import { Heart, Trash2, ArrowUpRight, MapPin, Bed, Bath } from 'lucide-react';
import { processedListings } from '../services/api';

export default function FavouritesView({ savedIds, onToggleSave, onSelectListing, user }) {
  const savedListings = processedListings.filter(l => savedIds.includes(l.listing_id));

  const formatPrice = (price) => {
    if (!price || price <= 0) return 'Price on Request';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lakhs`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="animate-fade-in">
      
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart color="#ef4444" fill="#ef4444" size={24} /> Saved Listings ({savedListings.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Bookmarked listings for user <strong>{user ? user.email : 'Guest Session'}</strong>. Saved persistently in browser storage.
          </p>
        </div>
      </div>

      {savedListings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <Heart size={48} color="var(--text-dim)" style={{ margin: '0 auto 16px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>No Saved Listings Yet</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Click the heart icon on any property card to save it to your personal favorites list.
          </p>
        </div>
      ) : (
        <div className="grid-listings">
          {savedListings.map(item => (
            <div key={item.listing_id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-info">{item.property_type}</span>
                  <button 
                    onClick={() => onToggleSave(item.listing_id)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px' }}>{item.apartment_name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <MapPin size={14} color="var(--accent-primary)" />
                  <span style={{ textTransform: 'capitalize' }}>{item.locality}, Pune</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  <div><Bed size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{item.bedroom} BHK</div>
                  <div><Bath size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{item.bathroom} Bath</div>
                  <div>{item.carpet_area_sqft} sq ft</div>
                </div>
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {formatPrice(item.price)}
                </div>
                <button 
                  onClick={() => onSelectListing(item)}
                  className="glass-button"
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                >
                  Details <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
