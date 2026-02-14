"use client";

// Hidden SVG filter for liquid glass distortion effect
export function LiquidTurbulenceFilter() {
    return (
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            <defs>
                <filter id="liquid-turbulence">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.015"
                        numOctaves="3"
                        seed="2"
                        result="turbulence"
                    >
                        <animate
                            attributeName="baseFrequency"
                            values="0.015;0.025;0.015"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="3"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
}
