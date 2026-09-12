import React, { useState } from 'react';
import { BarChart3, AlertOctagon, CheckCircle2, Search, Filter, ShieldAlert, FileText, ExternalLink, ListFilter, HelpCircle } from 'lucide-react';
import submissionData from '../../../submission.json';

export default function InsightsView() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('audit'); // 'audit' | 'answers' | 'market'

  const findings = submissionData.findings || [];
  const answers = submissionData.answers || {};

  const filteredFindings = findings.filter(f => {
    const matchesCat = categoryFilter === 'all' || f.category === categoryFilter;
    const matchesSearch = !search || f.endpoint.toLowerCase().includes(search.toLowerCase()) ||
                          f.documented.toLowerCase().includes(search.toLowerCase()) ||
                          f.actual.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    'all', 'auth', 'pagination', 'units', 'filters', 'sorting', 
    'timestamps', 'duplicates', 'completeness', 'data_quality', 
    'fraud', 'consistency', 'missing_endpoint', 'undocumented_endpoint'
  ];

  return (
    <div className="animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-warning">CITY: PUNE</span>
              <span className="badge badge-info">18 LIES DISCOVERED</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>API Audit & Data Insights Screen</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Where API documentation discrepancies become transparent to humans alongside computed market metrics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`glass-button ${activeSubTab === 'audit' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('audit')}
            >
              <AlertOctagon size={16} /> Discrepancies ({findings.length})
            </button>
            <button 
              className={`glass-button ${activeSubTab === 'answers' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('answers')}
            >
              <CheckCircle2 size={16} /> 10 Answers
            </button>
            <button 
              className={`glass-button ${activeSubTab === 'market' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('market')}
            >
              <BarChart3 size={16} /> Market Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: DISCREPANCIES AUDIT TABLE */}
      {activeSubTab === 'audit' && (
        <div>
          {/* Controls */}
          <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: '36px', padding: '8px 12px 8px 36px', fontSize: '0.85rem' }}
                  placeholder="Filter by endpoint or text..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Category:</span>
                {categories.slice(0, 7).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-card)',
                      background: categoryFilter === cat ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.03)',
                      color: categoryFilter === cat ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Audit List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredFindings.map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '1rem', background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-card)', color: '#38bdf8' }}>
                      {item.endpoint}
                    </span>
                    <span className="badge badge-warning">{item.category}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Impact: <strong style={{ color: 'var(--text-muted)' }}>{item.impact}</strong>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px', background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', marginBottom: '4px' }}>
                      ⚠️ What Documentation Claimed:
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {item.documented}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>
                      ⚡ Actual Server Behavior:
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {item.actual}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div><strong>How Found:</strong> {item.how_found}</div>
                  {item.evidence && item.evidence.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Evidence IDs ({item.evidence.length}):</span>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {item.evidence.slice(0, 5).map(ev => (
                          <span key={ev} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TEN SUBMISSION ANSWERS */}
      {activeSubTab === 'answers' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Part 2 Submission Answers (Pune City)</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1. total_listing_records</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{answers.total_listing_records}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Retrievable listings paged to end</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2. unique_properties</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{answers.unique_properties}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Distinct physical property signatures</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3. active_listings</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{answers.active_listings}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Records with is_live == true</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4. corrupt_listing_ids ({answers.corrupt_listing_ids?.length})</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'monospace', color: '#f87171', marginTop: '6px' }}>
                {answers.corrupt_listing_ids?.join(', ')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Area unit metric & BHK physical anomalies</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5. total_monthly_rent</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>₹ {answers.total_monthly_rent?.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Sum of monthly rent in Hadapsar</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>6. avg_price_per_sqft_2bhk</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>₹ {answers.avg_price_per_sqft_2bhk}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Mean price/sqft for active 2 BHK</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>7. costliest_project</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#818cf8', marginTop: '4px' }}>
                {answers.costliest_project?.project_id} (₹ {(answers.costliest_project?.price_max_inr / 10000000).toFixed(2)} Cr)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>My Home Grand (3.34 Crores)</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>8. listings_last_7_days</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{answers.listings_last_7_days}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Posted in [2026-09-03, 2026-09-10)</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>9. fake_listing_ids ({answers.fake_listing_ids?.length})</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'monospace', color: '#fbbf24', marginTop: '6px' }}>
                {answers.fake_listing_ids?.join(', ')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Lead-gen token amount deposit scam</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10. projects_with_wrong_listing_count</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{answers.projects_with_wrong_listing_count}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Discrepancies across retrievable project records</div>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: MARKET DASHBOARD */}
      {activeSubTab === 'market' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Pune Real Estate Market Dashboard</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Retrievable Listings</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-primary)' }}>3,700</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>50 Unique Property Types</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Median Listing Price</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#818cf8' }}>₹ 1.11 Cr</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Across Pune City</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Price / Sq Ft (2 BHK)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399' }}>₹ 10,790</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Corrected Area Metrics</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
