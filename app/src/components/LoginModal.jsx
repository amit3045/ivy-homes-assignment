import React, { useState } from 'react';
import { X, Lock, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginUser } from '../services/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('demo1@ivy.homes');
  const [password, setPassword] = useState('51a4ef2156');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginUser(email, password);
    setLoading(false);

    if (res.success) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  const setDemoAccount = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('51a4ef2156');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '28px', position: 'relative' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-primary)', padding: '10px', borderRadius: '12px' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Demo User Login</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Authenticate against real Ivy Homes Auth Flow</p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="email"
                className="input-field"
                style={{ paddingLeft: '38px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                className="input-field"
                style={{ paddingLeft: '38px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>Quick Demo Account Select:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['demo1@ivy.homes', 'demo2@ivy.homes', 'demo3@ivy.homes'].map(acc => (
                <button 
                  key={acc}
                  type="button"
                  onClick={() => setDemoAccount(acc)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    fontSize: '0.7rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-card)',
                    background: email === acc ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: email === acc ? '#34d399' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {acc.split('@')[0]}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="glass-button primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '6px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Log In Session'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <CheckCircle2 size={14} color="#34d399" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Session token is preserved across page reloads in localStorage.
        </div>

      </div>
    </div>
  );
}
