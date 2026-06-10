"use client";

import { useEffect, useRef, useState } from "react";

interface InteractiveSvgProps {
  src: string;
  className?: string;
  onDistrictClick?: (districtId: string) => void;
  activeDistrict?: string | null;
}

export default function InteractiveSvg({ src, className = "", onDistrictClick, activeDistrict }: InteractiveSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the SVG content
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
      })
      .catch((err) => console.error("Failed to load SVG", err));
  }, [src]);

  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    // After SVG is injected, attach listeners to paths
    const paths = containerRef.current.querySelectorAll("path");
    
    paths.forEach((path) => {
      // SVG paths have district names as IDs (e.g., "Patna")
      const id = path.getAttribute("id");
      if (!id) return;

      // Reset styles
      path.style.transition = "all 0.3s ease";
      path.style.cursor = "pointer";
      
      // Handle hover
      path.addEventListener("mouseenter", () => {
        path.style.fill = "rgba(16, 185, 129, 0.8)"; // brand-primary
        path.style.stroke = "#fff";
        path.style.strokeWidth = "2";
      });
      
      path.addEventListener("mouseleave", () => {
        if (id !== activeDistrict) {
          path.style.fill = ""; // reset to original
          path.style.strokeWidth = "";
        }
      });

      // Handle click
      path.addEventListener("click", () => {
        if (onDistrictClick) onDistrictClick(id);
      });
      
      // Handle active state
      if (id === activeDistrict) {
        path.style.fill = "rgba(16, 185, 129, 1)";
        path.style.stroke = "#fff";
        path.style.strokeWidth = "2";
      } else {
        path.style.fill = "";
        path.style.strokeWidth = "";
      }
    });
  }, [svgContent, activeDistrict, onDistrictClick]);

  if (!svgContent) {
    return (
      <div className={`flex items-center justify-center animate-pulse bg-surface/50 rounded-lg ${className}`}>
        <span className="text-xs font-mono text-muted">Loading map...</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`interactive-map-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
