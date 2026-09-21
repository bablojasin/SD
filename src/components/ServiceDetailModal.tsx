import React from 'react';
import { X, Check, ShieldCheck, ArrowRight, Zap, Lock } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onDeploy: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onDeploy }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050807]/85 backdrop-blur-lg">
      <div className="relative w-full max-w-2xl bg-[#070A08] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.055] hover:bg-white/[0.09] text-[#9AA39A] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          aria-label="Close service modal"
          id="close-service-modal-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172512] border border-[#B7FF00]/30 text-[#B7FF00] text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SECURIFY CORE CAPABILITY</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight mb-2">
          {service.title}
        </h3>

        <p className="text-sm sm:text-base text-[#9AA39A] leading-relaxed mb-6">
          {service.longDescription}
        </p>

        {/* Key Metrics and SLA */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0A0F0A] border border-white/10 p-4 rounded-2xl">
            <span className="text-xs font-mono text-[#9AA39A] block">Performance Benchmark</span>
            <span className="text-xl font-mono font-bold text-[#B7FF00] mt-1 block">
              {service.metrics}
            </span>
          </div>
          <div className="bg-[#0A0F0A] border border-white/10 p-4 rounded-2xl">
            <span className="text-xs font-mono text-[#9AA39A] block">Deployment Speed</span>
            <span className="text-xl font-mono font-bold text-[#FFFFFF] mt-1 block">
              Instant API / Agent
            </span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#9AA39A]">
            Enterprise Architecture Modules
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.055] border border-white/5 rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#E9ECE8]"
              >
                <Check className="w-4 h-4 text-[#B7FF00] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9AA39A]">
            <Lock className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span>Zero-Trust Architecture Standard</span>
          </div>
          <button
            onClick={() => {
              onDeploy(service.title);
              onClose();
            }}
            className="w-full sm:w-auto bg-[#B7FF00] hover:bg-[#C6FF00] text-[#050807] font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#B7FF00]/20 active:scale-95 transition-all cursor-pointer"
            id="deploy-service-btn"
          >
            <Zap className="w-4 h-4" />
            <span>Deploy {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
