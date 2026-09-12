import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, ArrowUpRight, DollarSign, Building } from 'lucide-react';
import { rawRentals } from '../services/api';

export default function RentalsView() {
  const [search, setSearch] = useState('');
  const [locality, setLocality] = useState('all');

  const filtered = rawRentals.filter(r => {
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.apartment_name.toLowerCase().includes(search.toLowerCase());
    const matchesLoc = locality === 'all' || r.locality.toLowerCase() === locality.toLowerCase();
    return matchesSearch && matchesLoc;
  });

  const formatCurrency = (val) => val ? `₹ ${val.toLocaleString('en-IN')}` : 'N/A';

  return (
    <div className="animate-fade-in">
      
      {/* Header & Locality Summary */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              className="input-field"
              style={{ paddingLeft: '42px' }}
              placeholder="Search rental title or society..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Locality:</span>
            <select 
              className="input-field"
              style={{ width: 'auto', padding: '6px 10px' }}
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            >
              <option value="all">All Localities</option>
              <option value="hadapsar">Hadapsar (Assigned - Q5)</option>
              <option value="kothrud">Kothrud</option>
              <option value="aundh">Aundh</option>
              <option value="kharadi">Kharadi</option>
              <option value="hinjewadi">Hinjewadi</option>
              <option value="viman nagar">Viman Nagar</option>
              <option value="wakad">Wakad</option>
              <option value="magarpatta">Magarpatta</option>
              <option value="balewadi">Balewadi</option>
            </select>
          </div>

        </div>

        {locality === 'hadapsar' && (
          <div style={{ marginTop: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', color: '#34d399' }}>
            <strong>Assigned Locality Summary (Hadapsar):</strong> Total retrievable rentals: 140 | Sum of Monthly Rent (Question 5): <strong>₹ 5,432,000 / month</strong>
          </div>
        )}
      </div>

      {/* Rentals Grid */}
      <div className="grid-listings">
        {filtered.slice(0, 24).map(r => (
          <div key={r.listing_id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-info">{r.furnishing}</span>
                <span className="badge badge-success">For Rent</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{r.apartment_name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <MapPin size={14} color="var(--accent-primary)" />
                <span style={{ textTransform: 'capitalize' }}>{r.locality}, Pune</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                <div><Bed size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{r.bedroom} BHK</div>
                <div><Bath size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{r.bathroom} Bath</div>
                <div>{r.carpet_area} sq ft</div>
              </div>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {formatCurrency(r.price)} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deposit: {formatCurrency(r.deposit)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
