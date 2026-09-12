import React, { useState, useEffect } from 'react';
import { Building2, Key, LogIn, LogOut, Heart, BarChart3, Home, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, session, onOpenLogin, onLogout }) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins session

  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, [session]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: '15px', zIndex: 100, marginBottom: '25px', padding: '14px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('listings')}>
          <div style={{ background: 'var(--accent-primary)', color: '#000', padding: '10px', borderRadius: '12px', display: 'flex', boxShadow: '0 0 15px var(--accent-glow)' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              IVY HOMES
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span className="badge badge-success" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>PUNE API</span>
              <span>Hadapsar Region</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className={`glass-button ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <Home size={16} /> Listings
          </button>
          <button 
            className={`glass-button ${activeTab === 'rentals' ? 'active' : ''}`}
            onClick={() => setActiveTab('rentals')}
          >
            <Building2 size={16} /> Rentals
          </button>
          <button 
            className={`glass-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Key size={16} /> Projects
          </button>
          <button 
            className={`glass-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart size={16} color={activeTab === 'saved' ? '#000' : '#ef4444'} fill={activeTab === 'saved' ? '#000' : 'transparent'} /> Saved
          </button>
          <button 
            className={`glass-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
            style={{ borderColor: 'rgba(99, 102, 241, 0.4)', background: activeTab === 'insights' ? 'var(--accent-secondary)' : 'rgba(99, 102, 241, 0.1)' }}
          >
            <BarChart3 size={16} /> Insights & Audit
          </button>
        </nav>

        {/* User Session Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border-card)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{session.user.email}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <Clock size={10} /> Token expires in {formatTime(timeLeft)}
                </div>
              </div>
              <button 
                onClick={onLogout}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="glass-button primary" onClick={onOpenLogin}>
              <LogIn size={16} /> Login Demo User
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
