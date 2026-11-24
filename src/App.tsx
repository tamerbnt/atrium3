/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense, lazy } from 'react';
import { detectDeviceCapabilities } from './utils/deviceDetection';
import { capDevicePixelRatio } from './utils/scrollLogic';
import { SceneMode } from './types';
import { Language } from './content/copy';
import StaticFallback from './components/StaticFallback';
import PageShell from './components/PageShell';
import DemoModal from './components/DemoModal';
import SmoothScroll from './components/SmoothScroll';

// Dev-only Performance Monitor: fully tree-shaken from production bundle
const DevPerformanceMonitor = import.meta.env.DEV
  ? lazy(() => import('./components/PerformanceMonitor'))
  : null;

// Lazy-load 3D Scene so mobile (< 1024px) never downloads or parses Three.js
const Scene3D = lazy(() => import('./components/Scene3D'));

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [deviceProfile, setDeviceProfile] = useState(() => detectDeviceCapabilities());
  const [activeMode, setActiveMode] = useState<SceneMode>('3d');
  const [isHydrated, setIsHydrated] = useState(false);
  const [debugIsInView, setDebugIsInView] = useState(true);
  const [showDebugHud, setShowDebugHud] = useState(false);
  const [stats, setStats] = useState<{ fps: number; drawCalls: number; triangles: number }>({
    fps: 60,
    drawCalls: 14,
    triangles: 2780,
  });

  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Sync RTL direction attribute on language change
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Mark hydrated on client mount and update capabilities on resize only when profile flags change
  useEffect(() => {
    setIsHydrated(true);
    const updateProfile = () => {
      const nextProfile = detectDeviceCapabilities();
      setDeviceProfile((prev) => {
        if (
          prev.isMobile === nextProfile.isMobile &&
          prev.isSoftwareGl === nextProfile.isSoftwareGl &&
          prev.reason === nextProfile.reason
        ) {
          return prev;
        }
        return nextProfile;
      });
    };
    updateProfile();

    window.addEventListener('resize', updateProfile, { passive: true });
    return () => window.removeEventListener('resize', updateProfile);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === 'true' || params.get('telemetry') === 'true') {
        setShowDebugHud(true);
      }
    }
  }, []);

  const dpr = typeof window !== 'undefined'
    ? capDevicePixelRatio(window.devicePixelRatio || 1, deviceProfile.isSoftwareGl)
    : 1;

  const [activeWaypointIndex, setActiveWaypointIndex] = useState(0);

  const handleLanguageChange = useCallback((newLang: Language) => setLang(newLang), []);
  const handleOpenDemo = useCallback(() => setIsDemoOpen(true), []);
  const handleCloseDemo = useCallback(() => setIsDemoOpen(false), []);
  const handleWaypointChange = useCallback((idx: number) => setActiveWaypointIndex(idx), []);
  const handleStatsUpdate = useCallback(
    (newStats: { fps: number; drawCalls: number; triangles: number }) => setStats(newStats),
    []
  );
  const handleDebugInViewChange = useCallback((inView: boolean) => setDebugIsInView(inView), []);

  const hero3DNode = useMemo(
    () =>
      !deviceProfile.isMobile ? (
        <div ref={heroContainerRef} className="w-full h-full relative">
          {activeMode === '3d' ? (
            <Suspense fallback={null}>
              <Scene3D
                key="atrium-3d-scene"
                isMobile={false}
                isSoftwareGl={deviceProfile.isSoftwareGl}
                onInViewChange={showDebugHud ? handleDebugInViewChange : undefined}
                scrollProgress={0}
                activeWaypointIndex={activeWaypointIndex}
                onStatsUpdate={showDebugHud ? handleStatsUpdate : undefined}
              />
            </Suspense>
          ) : (
            <StaticFallback
              reason={deviceProfile.reason}
              onSwitchTo3D={() => setActiveMode('3d')}
            />
          )}
        </div>
      ) : (
        <div ref={heroContainerRef} className="w-full h-full relative" />
      ),
    [
      deviceProfile.isMobile,
      deviceProfile.isSoftwareGl,
      deviceProfile.reason,
      activeMode,
      activeWaypointIndex,
      showDebugHud,
      handleStatsUpdate,
      handleDebugInViewChange,
    ]
  );

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-black text-white">
        {/* Main Landing Page Funnel Structure with integrated 3D Hero */}
        <PageShell
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onOpenDemo={handleOpenDemo}
          isHydrated={isHydrated}
          activeMode={activeMode}
          hero3DNode={hero3DNode}
          activeWaypointIndex={activeWaypointIndex}
          onWaypointChange={handleWaypointChange}
        />

        {/* Dev-only Performance Telemetry: fully excluded from production build */}
        {DevPerformanceMonitor && showDebugHud && (
          <Suspense fallback={null}>
            <DevPerformanceMonitor
              fps={stats.fps}
              drawCalls={stats.drawCalls}
              triangles={stats.triangles}
              dpr={dpr}
              isInView={debugIsInView}
              activeMode={activeMode}
              onToggleMode={(mode) => setActiveMode(mode)}
              isMobile={deviceProfile.isMobile}
            />
          </Suspense>
        )}

        {/* Interactive 15-Minute Demo Booking Dialog */}
        <DemoModal
          isOpen={isDemoOpen}
          onClose={handleCloseDemo}
          lang={lang}
        />
      </div>
    </SmoothScroll>
  );
}


