import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Terminal, ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, Cpu, Globe, Info } from 'lucide-react';
import { SecurityAuditResult } from '../types';

interface ThreatScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreatScannerModal: React.FC<ThreatScannerModalProps> = ({ isOpen, onClose }) => {
  const [targetInput, setTargetInput] = useState('enterprise-node.io');
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<SecurityAuditResult | null>(null);

  if (!isOpen) return null;

  const runScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput) return;
    if (!authorized) {
      setAuthError('You must confirm that you are authorized to run security diagnostics on this target.');
      return;
    }
    setAuthError('');

    setIsScanning(true);
    setScanStep(1);
    setResult(null);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setScanStep(current);
      if (current >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setResult({
            target: targetInput,
            overallScore: 94,
            grade: 'A',
            checks: [
              {
                name: 'Cryptographic Protocol Inspection',
                status: 'passed',
                details: 'TLS 1.3 enforced with post-quantum Kyber key exchange readiness.',
              },
              {
                name: 'External Attack Surface & Port Exposure',
                status: 'passed',
                details: 'Zero open high-risk ports detected (SSH/RDP shielded behind zero-trust).',
              },
              {
                name: 'DNS & Email Impersonation Defenses',
                status: 'warning',
                details: 'DMARC policy configured in quarantine mode. Recommendation: Upgrade to strict reject (p=reject).',
              },
              {
                name: 'Cloud Posture & Public Storage Buckets',
                status: 'passed',
                details: 'All storage buckets enforce AES-256 GCM client-side encryption.',
              },
              {
                name: 'Dark Web Threat Telemetry',
                status: 'passed',
                details: 'No compromised administrative tokens spotted in active paste sites.',
              },
            ],
          });
        }, 600);
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050807]/85 backdrop-blur-lg">
      <div className="relative w-full max-w-2xl bg-[#070A08] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.055] hover:bg-white/[0.09] text-[#9AA39A] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          aria-label="Close Security Scanner"
          id="close-threat-scanner-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#B7FF00] text-[#050807] flex items-center justify-center font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#B7FF00]">
            SPECTRE DEFEND Autonomous Telemetry Diagnostic
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight mb-2">
          Zero-Trust Perimeter Scanner
        </h3>
        <p className="text-xs sm:text-sm text-[#9AA39A] mb-6">
          Simulate a real-time SPECTRE DEFEND autonomous risk probe against your domain or network endpoint.
        </p>

        {/* Input Target Form */}
        <form onSubmit={runScan} className="mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#0A0F0A] border border-white/10 rounded-2xl sm:rounded-full p-1.5 focus-within:border-[#B7FF00]">
            <div className="flex items-center w-full px-3 gap-2">
              <Globe className="w-4 h-4 text-[#9AA39A] shrink-0" />
              <input
                type="text"
                placeholder="domain.com or IP address..."
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={isScanning}
                className="w-full bg-transparent text-sm text-[#FFFFFF] placeholder-[#9AA39A] focus:outline-none py-2 font-mono"
                id="scanner-target-input"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="w-full sm:w-auto bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer disabled:opacity-50"
              id="scanner-start-btn"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Run Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Authorization Checkbox & Simulation Disclaimer */}
          <div className="px-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => {
                  setAuthorized(e.target.checked);
                  if (authError) setAuthError('');
                }}
                className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#050807] text-[#B7FF00] focus:ring-[#B7FF00] focus:ring-offset-0"
                id="scanner-auth-checkbox"
              />
              <span className="text-[11px] text-[#9AA39A] leading-relaxed select-none">
                I certify that I am authorized to test this asset and understand this tool performs a client-side architecture simulation under our{' '}
                <Link to="/terms" onClick={onClose} className="text-[#B7FF00] hover:underline underline-offset-2">
                  Terms of Service
                </Link>.
              </span>
            </label>
            {authError && (
              <p className="text-xs text-rose-400 font-mono mt-1.5 ml-6">{authError}</p>
            )}
          </div>
        </form>

        {/* Scanning State */}
        {isScanning && (
          <div className="bg-[#050807] border border-[#B7FF00]/30 rounded-2xl p-6 my-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#B7FF00] border-t-transparent animate-spin mx-auto"></div>
            <div className="text-sm font-mono text-[#B7FF00] flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>STAGE {scanStep}/4: EXECUTING DEEP DEFENSE TELEMETRY</span>
            </div>
            <div className="w-full bg-white/[0.055] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B7FF00] h-full transition-all duration-500"
                style={{ width: `${(scanStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Result Report */}
        {result && (
          <div className="space-y-6">
            {/* Score Banner */}
            <div className="bg-gradient-to-r from-[#070A08] via-[#172512]/50 to-[#070A08] border border-[#B7FF00]/40 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#9AA39A] uppercase">Target Analyzed</span>
                <h4 className="text-xl font-mono font-bold text-[#FFFFFF] mt-0.5">{result.target}</h4>
                <p className="text-xs text-[#9AA39A] mt-1 font-mono">Perimeter Grade: High Cyber Resilience</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#B7FF00] font-mono text-glow">{result.overallScore}/100</div>
                <div className="text-xs font-mono text-[#9AA39A]">Score Rating: Grade {result.grade}</div>
              </div>
            </div>

            {/* Checklist Results */}
            <div className="space-y-2.5">
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#9AA39A]">
                Detailed Telemetry Findings
              </h5>
              {result.checks.map((check, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.055] border border-white/10 rounded-xl p-3.5 flex items-start gap-3 text-xs"
                >
                  {check.status === 'passed' ? (
                    <CheckCircle className="w-4 h-4 text-[#B7FF00] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-[#FFFFFF] flex items-center justify-between">
                      <span>{check.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        check.status === 'passed' ? 'bg-[#172512] text-[#B7FF00] border border-[#B7FF00]/30' : 'bg-amber-900/40 text-amber-300'
                      }`}>
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#9AA39A] mt-1 leading-relaxed">{check.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#9AA39A] font-mono">
                SPECTRE DEFEND Continuous Agent Ready
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-semibold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Apply Full Zero-Trust Protection
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
