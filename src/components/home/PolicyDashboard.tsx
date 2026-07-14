"use client";

export default function PolicyDashboard() {

  return (
    <div className="tech-card p-4 sm:p-6 md:p-8 flex flex-col h-full gap-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h2 className="font-mono font-bold text-lg sm:text-xl text-brand-primary mb-1">Policy Intelligence Dashboard</h2>
          <p className="text-xs font-mono text-muted">Real-time data and policy signals across districts</p>
        </div>
        <div className="text-xs font-mono text-white border border-brand-primary bg-brand-primary px-2 py-1 rounded flex items-center gap-2 self-start shrink-0" aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          Live · Updated
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <h3 className="font-mono text-xl font-bold text-muted mb-2" aria-hidden="true">Coming Soon</h3>
        <p className="text-muted text-sm">Real-time statistics will be populated soon.</p>
      </div>

      {/* Animated Bar Chart */}
      <div className="flex flex-col items-center justify-center py-6 text-center flex-1">
        <h3 className="font-mono text-xl font-bold text-muted mb-2" aria-hidden="true">Coming Soon</h3>
        <p className="text-muted text-sm">Research distribution data is being gathered.</p>
      </div>
    </div>
  );
}
