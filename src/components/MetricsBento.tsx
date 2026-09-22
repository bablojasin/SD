import React, { useState } from 'react';
import { Shield, Fingerprint, Network, Users, AlertTriangle, Check, Radio } from 'lucide-react';
import { SOC_ROOM_IMAGE } from '../data/mockData';

export const MetricsBento: React.FC = () => {
  const [fingerprintScanning, setFingerprintScanning] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleFingerprintScan = () => {
    setFingerprintScanning(true);
    setAuthSuccess(false);
    setTimeout(() => {
      setFingerprintScanning(false);
      setAuthSuccess(true);
      setTimeout(() => setAuthSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section id="metrics" className="py-20 md:py-28 relative overflow-hidden bg-[#070A08]">
      {/* Diffuse atmospheric glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#B7FF00]/8 rounded-full blur-[170px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0A]/90 border border-white/10 backdrop-blur-md mb-4">
            <span className="h-2 w-2 rounded-full bg-[#B7FF00] ring-4 ring-[#B7FF00]/20"></span>
            <span className="text-xs sm:text-sm font-mono font-medium text-[#E9ECE8]">
              Defensive Telemetry
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFFFF] tracking-tight">
            The Strength Behind Our Shield
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Card 1: SOC Command Center (Large 6 cols / span 2 rows) */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.055] p-3 flex flex-col justify-between shadow-2xl relative group backdrop-blur-xl">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#050807]">
              <picture className="w-full h-full">
                <source
                  type="image/webp"
                  srcSet="/images/soc_war_room_1789575925158-480.webp 480w, /images/soc_war_room_1789575925158-800.webp 800w, /images/soc_war_room_1789575925158.webp 1376w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                <img
                  src="/images/soc_war_room_1789575925158.webp"
                  alt="SPECTRE DEFEND Global SOC Cyber Command Room"
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/30 to-transparent"></div>

              {/* Live Status indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#050807]/80 backdrop-blur-md border border-[#B7FF00]/40 px-3 py-1.5 rounded-full text-xs font-mono text-[#B7FF00]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>24/7 AUTONOMOUS DEFENSE RADAR</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-[#E9ECE8] bg-[#050807]/80 px-3 py-1 rounded-md border border-white/10">
                  Global SOC Nodes: <strong className="text-[#FFFFFF]">Active</strong>
                </span>
                <span className="text-[#B7FF00] bg-[#050807]/80 px-3 py-1 rounded-md border border-white/10">
                  Avg Response: <strong>320ms</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: 01. Businesses Protected 500+ */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.055] p-6 flex flex-col justify-between shadow-xl relative backdrop-blur-xl hover:border-[#B7FF00]/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-[#B7FF00] text-[#050807] flex items-center justify-center shadow-lg shadow-[#B7FF00]/20 font-bold">
                <Network className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#9AA39A] font-bold">01.</span>
            </div>

            <div className="mt-8">
              <div className="text-xs text-[#9AA39A] font-medium tracking-wide uppercase font-mono">
                Enterprises Protected
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] tracking-tight mt-1 font-mono">
                500+
              </div>
              <p className="text-xs text-[#9AA39A] mt-2 leading-relaxed">
                Across financial rails, sovereign clouds, defense aerospace, and critical digital infrastructure.
              </p>
            </div>
          </div>

          {/* Card 3: Biometric Fingerprint Scanner */}
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.055] p-6 flex flex-col justify-between shadow-xl relative backdrop-blur-xl hover:border-[#B7FF00]/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#9AA39A] uppercase tracking-wider">
                Cryptographic Auth
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping"></span>
            </div>

            {/* Interactive Fingerprint scanner */}
            <div className="flex flex-col items-center justify-center my-6">
              <button
                onClick={handleFingerprintScan}
                className={`relative w-20 h-20 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${
                  authSuccess
                    ? 'border-[#B7FF00] bg-[#B7FF00]/20 shadow-lg shadow-[#B7FF00]/30'
                    : fingerprintScanning
                    ? 'border-[#B7FF00] bg-[#172512] animate-pulse'
                    : 'border-white/15 bg-[#050807]/80 hover:border-[#B7FF00]/50'
                }`}
                title="Click to simulate biometric identity verification"
                id="biometric-scan-btn"
              >
                {authSuccess ? (
                  <Check className="w-10 h-10 text-[#B7FF00]" />
                ) : (
                  <Fingerprint className={`w-10 h-10 ${fingerprintScanning ? 'text-[#B7FF00]' : 'text-[#9AA39A]'}`} />
                )}

                {/* Laser scanline */}
                {fingerprintScanning && (
                  <div className="absolute inset-x-0 h-0.5 bg-[#B7FF00] shadow-[0_0_10px_#B7FF00] animate-[bounce_1s_infinite]"></div>
                )}
              </button>

              <div className="text-center mt-3">
                <span className="text-[11px] font-mono text-[#9AA39A]">
                  {authSuccess
                    ? 'IDENTITY VERIFIED (ZERO-TRUST)'
                    : fingerprintScanning
                    ? 'SCANNING PASSKEY TELEMETRY...'
                    : 'TAP TO SIMULATE BIO-AUTH'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#9AA39A] text-center font-mono">
              FIDO2 / Hardware Security Module
            </div>
          </div>

          {/* Card 4: 02. Threat Detection Rate 97.00% */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.055] p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:border-[#B7FF00]/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-[#B7FF00] text-[#050807] flex items-center justify-center shadow-lg shadow-[#B7FF00]/20 font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#9AA39A] font-bold">02.</span>
            </div>

            <div className="mt-8">
              <div className="text-xs text-[#9AA39A] font-medium tracking-wide uppercase font-mono">
                Threat Detection Rate
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] tracking-tight mt-1 font-mono">
                97.00%
              </div>
              <p className="text-xs text-[#9AA39A] mt-2 leading-relaxed">
                Validated MITRE ATT&CK benchmark across polymorphic adversarial malware and evasive payloads.
              </p>
            </div>
          </div>

          {/* Card 5: 48+ Companies Of Secured Safe with Avatars */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.055] via-[#172512]/30 to-[#0A0F0A] p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl">
            <div>
              {/* Stacked enterprise sector badges */}
              <div className="flex items-center -space-x-2.5 mb-6" aria-label="Protected Infrastructure Sectors">
                <div className="w-10 h-10 rounded-full border-2 border-[#050807] bg-[#172512] text-[#B7FF00] flex items-center justify-center text-xs font-mono font-bold shadow-md">
                  FIN
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050807] bg-[#0A1E24] text-[#38BDF8] flex items-center justify-center text-xs font-mono font-bold shadow-md">
                  CLD
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#050807] bg-[#1E122A] text-[#C084FC] flex items-center justify-center text-xs font-mono font-bold shadow-md">
                  AERO
                </div>
                <div className="w-10 h-10 rounded-full bg-[#B7FF00] text-[#050807] border-2 border-[#050807] flex items-center justify-center text-xs font-bold font-mono">
                  +45
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight font-mono">
                48+ Networks
              </div>
              <div className="text-xs text-[#9AA39A] uppercase tracking-wide font-medium mt-1 font-mono">
                Sovereign Infrastructure Defended
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#B7FF00] font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>Zero-Trust Architecture & Continuous Monitoring</span>
            </div>
          </div>

          {/* Card 6: 03. Attacks Blocked 20M+ */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.055] p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:border-[#B7FF00]/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-[#B7FF00] text-[#050807] flex items-center justify-center shadow-lg shadow-[#B7FF00]/20 font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#9AA39A] font-bold">03.</span>
            </div>

            <div className="mt-8">
              <div className="text-xs text-[#9AA39A] font-medium tracking-wide uppercase font-mono">
                Attacks Neutralized
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#FFFFFF] tracking-tight mt-1 font-mono">
                20M+
              </div>
              <p className="text-xs text-[#9AA39A] mt-2 leading-relaxed">
                Autonomous threat telemetry neutralizing ransomware, volumetric DDoS botnets, and zero-day breaches.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
