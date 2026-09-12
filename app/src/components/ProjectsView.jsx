import React, { useState } from 'react';
import { Search, Building2, Calendar, Award, CheckCircle, AlertTriangle, Layers } from 'lucide-react';
import { processedProjects } from '../services/api';

export default function ProjectsView() {
  const [search, setSearch] = useState('');
  const [useConverted, setUseConverted] = useState(true);

  const filtered = processedProjects.filter(p => {
    return !search || p.apartment_name.toLowerCase().includes(search.toLowerCase()) || p.developer_name.toLowerCase().includes(search.toLowerCase());
  });

  const formatPriceINR = (price) => {
    if (!price) return 'N/A';
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lakhs`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="animate-fade-in">
      
      {/* Header & Data Audit Banner */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              className="input-field"
              style={{ paddingLeft: '42px' }}
              placeholder="Search project name or developer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border-card)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price Unit Audit:</span>
            <button 
              onClick={() => setUseConverted(!useConverted)}
              className={`glass-button ${useConverted ? 'active' : ''}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              {useConverted ? '⚡ Converted to INR (Question 7 Fix)' : '⚠️ Raw API (Lakhs/Crores Mix)'}
            </button>
          </div>

        </div>

        <div style={{ marginTop: '16px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={20} color="#818cf8" />
          <div>
            <strong>Costliest Project (Question 7):</strong> Project <strong>P30030 (My Home Grand)</strong> in Hinjewadi with price max of <strong>3.34 Crores (₹ 33,400,000 INR)</strong>.
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid-listings">
        {filtered.slice(0, 24).map(p => {
          const isCostliest = p.project_id === 'P30030';
          const priceMinStr = useConverted ? formatPriceINR(p.price_min_inr) : `₹ ${p.price_min}`;
          const priceMaxStr = useConverted ? formatPriceINR(p.price_max_inr) : `₹ ${p.price_max}`;

          return (
            <div 
              key={p.project_id} 
              className="glass-panel" 
              style={{ 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between',
                border: isCostliest ? '1px solid var(--accent-primary)' : '1px solid var(--border-card)',
                boxShadow: isCostliest ? '0 0 20px var(--accent-glow)' : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-info">{p.project_status || 'Under Construction'}</span>
                  {isCostliest && <span className="badge badge-success">#1 Costliest</span>}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '2px' }}>{p.apartment_name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  by <strong>{p.developer_name}</strong> • <span style={{ textTransform: 'capitalize' }}>{p.locality}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <div>Total Units: <strong>{p.total_units || 'N/A'}</strong></div>
                  <div>Towers: <strong>{p.total_towers || 'N/A'}</strong></div>
                  <div>Area: <strong>{p.min_area_sqft} - {p.max_area_sqft} sq ft</strong></div>
                  <div>Reported Listings: <strong>{p.total_listings}</strong></div>
                </div>
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-card)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price Range</div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {priceMinStr} - {priceMaxStr}
                </div>
                {p.rera_number && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>RERA: {p.rera_number}</div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
