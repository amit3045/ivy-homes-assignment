import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Bed, Bath, ArrowUpRight, Heart, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { processedListings } from '../services/api';

export default function ListingsView({ onSelectListing, savedIds, onToggleSave }) {
  const [search, setSearch] = useState('');
  const [locality, setLocality] = useState('all');
  const [bhk, setBhk] = useState('all');
  const [furnishing, setFurnishing] = useState('all');
  const [useCleaned, setUseCleaned] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filter logic
  const filteredListings = useMemo(() => {
    return processedListings.filter(item => {
      // Search term
      const matchesSearch = !search || 
        item.apartment_name.toLowerCase().includes(search.toLowerCase()) ||
        item.locality.toLowerCase().includes(search.toLowerCase()) ||
        item.listing_id.toLowerCase().includes(search.toLowerCase());

      // Locality
      const matchesLocality = locality === 'all' || item.locality.toLowerCase() === locality.toLowerCase();

      // BHK
      const matchesBhk = bhk === 'all' || item.bedroom === Number(bhk);

      // Furnishing
      const matchesFurn = furnishing === 'all' || item.furnishing.toLowerCase() === furnishing.toLowerCase();

      return matchesSearch && matchesLocality && matchesBhk && matchesFurn;
    });
  }, [search, locality, bhk, furnishing]);

  const totalPages = Math.ceil(filteredListings.length / pageSize) || 1;
  const paginatedListings = filteredListings.slice((page - 1) * pageSize, page * pageSize);

  const formatPrice = (price) => {
    if (!price || price <= 0) return 'Price on Request';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} L`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="animate-fade-in">
      
      {/* Search & Filter Header */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Top Bar: Search + Clean Data Toggle */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                className="input-field"
                style={{ paddingLeft: '42px' }}
                placeholder="Search apartment, locality, or listing ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>

            {/* Clean Data Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border-card)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Data Audit Mode:</span>
              <button 
                onClick={() => setUseCleaned(!useCleaned)}
                className={`glass-button ${useCleaned ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {useCleaned ? '⚡ Cleaned (Units Fixed)' : '⚠️ Raw API (Uncorrected)'}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Locality */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Locality:</span>
              <select 
                className="input-field"
                style={{ width: 'auto', padding: '6px 10px' }}
                value={locality}
                onChange={(e) => { setLocality(e.target.value); setPage(1); }}
              >
                <option value="all">All Localities</option>
                <option value="hadapsar">Hadapsar (Assigned)</option>
                <option value="kharadi">Kharadi</option>
                <option value="hinjewadi">Hinjewadi</option>
                <option value="aundh">Aundh</option>
                <option value="baner">Baner</option>
                <option value="wakad">Wakad</option>
                <option value="viman nagar">Viman Nagar</option>
                <option value="kothrud">Kothrud</option>
                <option value="magarpatta">Magarpatta</option>
                <option value="balewadi">Balewadi</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BHK:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['all', '1', '2', '3', '4'].map(b => (
                  <button 
                    key={b}
                    onClick={() => { setBhk(b); setPage(1); }}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-card)',
                      background: bhk === b ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
                      color: bhk === b ? '#000' : 'var(--text-main)',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {b === 'all' ? 'All' : `${b} BHK`}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Furnishing:</span>
              <select 
                className="input-field"
                style={{ width: 'auto', padding: '6px 10px' }}
                value={furnishing}
                onChange={(e) => { setFurnishing(e.target.value); setPage(1); }}
              >
                <option value="all">All</option>
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="fully-furnished">Fully-Furnished</option>
              </select>
            </div>

            <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredListings.length}</strong> listings
            </div>

          </div>

        </div>
      </div>

      {/* Grid of Listings */}
      <div className="grid-listings" style={{ marginBottom: '30px' }}>
        {paginatedListings.map(item => {
          const isSaved = savedIds.includes(item.listing_id);
          const carpetArea = useCleaned ? item.carpet_area_sqft : item.carpet_area;
          const ppsqft = useCleaned ? item.price_per_sqft : Math.round(item.price / (item.carpet_area||1));

          return (
            <div 
              key={item.listing_id}
              className="glass-panel"
              style={{ 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => onSelectListing(item)}
            >
              {/* Top Row: Property Type & Save Button */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-info">{item.property_type}</span>
                    {item.unit_note && useCleaned && (
                      <span className="badge badge-warning" title={item.unit_note}>sq m → sq ft</span>
                    )}
                    {item.is_fake && (
                      <span className="badge badge-danger">Fake/Bait</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(item.listing_id);
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <Heart size={20} color={isSaved ? '#ef4444' : 'var(--text-muted)'} fill={isSaved ? '#ef4444' : 'transparent'} />
                  </button>
                </div>

                {/* Title & Locality */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-main)' }}>
                  {item.apartment_name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  <MapPin size={14} color="var(--accent-primary)" />
                  <span style={{ textTransform: 'capitalize' }}>{item.locality}, Pune</span>
                </div>

                {/* Specs */}
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bed size={15} /> {item.bedroom} BHK</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bath size={15} /> {item.bathroom} Bath</div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{carpetArea} sq ft</div>
                </div>
              </div>

              {/* Bottom Row: Price & Details Button */}
              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    {formatPrice(item.price)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ₹ {ppsqft.toLocaleString('en-IN')}/sq ft
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  View Details <ArrowUpRight size={16} />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <button 
            className="glass-button"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            Previous
          </button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button 
            className="glass-button"
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
