'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useOSStore, type WindowId } from '@/hooks/useOSStore';

interface OSWindowProps {
  id: WindowId;
  title: string;
  icon?: string;
  initialPos?: { x: number; y: number };
  initialSize?: { w?: string | number; maxW?: string };
  children: React.ReactNode;
  className?: string;
  allowDragOnDesktop?: boolean;
}

export default function OSWindow({
  id,
  title,
  icon = '📁',
  initialPos,
  children,
  className = '',
  allowDragOnDesktop = true,
}: OSWindowProps) {
  const {
    activeWindow,
    openWindows,
    minimizedWindows,
    windowOrder,
    bringToFront,
    toggleMinimize,
    closeWindow,
  } = useOSStore();

  const isOpen = openWindows[id];
  const isMinimized = minimizedWindows[id];
  const isActive = activeWindow === id;
  const zIndex = 20 + windowOrder.indexOf(id);

  // Position state for desktop dragging
  const [pos, setPos] = useState<{ x: number; y: number } | null>(initialPos || null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Check if screen is mobile (<768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    bringToFront(id);
    if (!allowDragOnDesktop || isMobile) return;

    // Only drag from titlebar, not from titlebar buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    e.preventDefault();
    const currentX = pos ? pos.x : (windowRef.current?.offsetLeft || 0);
    const currentY = pos ? pos.y : (windowRef.current?.offsetTop || 0);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: currentX,
      initY: currentY,
    };
    setIsDragging(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      setPos({
        x: Math.max(10, Math.min(window.innerWidth - 300, dragRef.current.initX + dx)),
        y: Math.max(50, Math.min(window.innerHeight - 150, dragRef.current.initY + dy)),
      });
    };

    const onPointerUp = () => {
      setIsDragging(false);
      dragRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  if (!isOpen) return null;

  // On desktop with custom position
  const desktopStyle: React.CSSProperties =
    !isMobile && pos
      ? {
          position: 'relative',
          zIndex,
        }
      : {
          zIndex,
        };

  return (
    <div
      ref={windowRef}
      id={`window-${id}`}
      style={desktopStyle}
      onClick={() => bringToFront(id)}
      className={`bevel-raised flex flex-col mb-8 transition-shadow duration-100 ${
        isActive ? 'shadow-window' : 'shadow-none'
      } ${className}`}
    >
      {/* 90s OS Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        className={`window-titlebar cursor-default ${!isActive ? 'inactive' : ''}`}
      >
        <div className="flex items-center gap-1.5 truncate pr-2 select-none">
          <span className="text-xs" aria-hidden="true">{icon}</span>
          <span className="truncate tracking-wide">{title}</span>
        </div>

        {/* Window action controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimize(id);
            }}
            aria-label={`Minimize ${title}`}
            className="win-btn hover:brightness-110 active:brightness-90"
            title="Minimize"
          >
            _
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              bringToFront(id);
            }}
            aria-label={`Maximize ${title}`}
            className="win-btn hover:brightness-110 active:brightness-90 hidden sm:inline-flex"
            title="Maximize"
          >
            □
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            aria-label={`Close ${title}`}
            className="win-btn hover:bg-[#F2541B] hover:text-[#1A1814] active:brightness-90"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body (collapses if minimized) */}
      {!isMinimized && (
        <div className="p-3 sm:p-5 flex-1 overflow-x-clip text-ink text-xs sm:text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
