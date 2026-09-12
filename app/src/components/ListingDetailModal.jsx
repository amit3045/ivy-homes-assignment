import React from 'react';
import { X, MapPin, Bed, Bath, Compass, ShieldCheck, Phone, ExternalLink, AlertTriangle, Heart, Layers, ArrowUpRight } from 'lucide-react';

export default function ListingDetailModal({ listing, onClose, isSaved, onToggleSave }) {
  if (!listing) return null;

  const formatPrice = (price) => {
    if (!price || price <= 0) return 'Price on Request';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lakhs`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '720px', padding: '32px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Close & Save Buttons */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => onToggleSave(listing.listing_id)}
            className="glass-button"
            style={{ padding: '8px 12px' }}
          >
            <Heart size={18} color={isSaved ? '#ef4444' : 'var(--text-muted)'} fill={isSaved ? '#ef4444' : 'transparent'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-info">{listing.property_type}</span>
            {listing.is_verified && <span className="badge badge-success"><ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Verified</span>}
            <span className={`badge ${listing.is_live ? 'badge-success' : 'badge-warning'}`}>
              {listing.is_live ? 'Active Listing' : 'Inactive / Expired'}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '6px' }}>{listing.apartment_name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <MapPin size={16} color="var(--accent-primary)" />
            <span style={{ textTransform: 'capitalize' }}>{listing.locality}, Pune</span>
            <span style={{ color: 'var(--text-dim)' }}>• ID: {listing.listing_id}</span>
          </div>
        </div>

        {/* Price & Area Banner */}
        <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Price</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{formatPrice(listing.price)}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>₹ {listing.price_per_sqft.toLocaleString('en-IN')} / sq ft</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-card)', paddingLeft: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Carpet Area</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{listing.carpet_area_sqft} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>sq ft</span></div>
            {listing.super_built_up_area_sqft && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Super Built-up: {listing.super_built_up_area_sqft} sq ft</div>
            )}
          </div>
        </div>

        {/* Unit Conversion Callout */}
        {listing.unit_note && (
          <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', color: '#fbbf24', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} />
            <div>
              <strong>Data Quality Correction:</strong> Raw API reported carpet area as {listing.carpet_area} (in sq meters). Converted to {listing.carpet_area_sqft} sq ft for accuracy.
            </div>
          </div>
        )}

        {/* Key Features Grid */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '14px' }}>Property Specifications</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bedrooms</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={16} color="var(--accent-primary)" /> {listing.bedroom} BHK</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bathrooms</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><Bath size={16} color="var(--accent-primary)" /> {listing.bathroom}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Floor</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={16} color="var(--accent-primary)" /> {listing.floor} of {listing.total_floors}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Facing</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'capitalize' }}><Compass size={16} color="var(--accent-primary)" /> {listing.facing_direction || 'N/A'}</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>Description</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{listing.description}</p>
        </div>

        {/* Contact & External Link Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
              {listing.posted_by_name ? listing.posted_by_name[0] : 'S'}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{listing.posted_by_name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>Listed by {listing.posted_by}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={`tel:${listing.posted_by_contact}`} className="glass-button primary" style={{ textDecoration: 'none' }}>
              <Phone size={16} /> Contact {listing.posted_by_contact}
            </a>
            {listing.listing_url && (
              <a href={listing.listing_url} target="_blank" rel="noreferrer" className="glass-button" style={{ textDecoration: 'none' }}>
                <ExternalLink size={16} /> Source URL
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
