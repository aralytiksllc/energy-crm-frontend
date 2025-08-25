// External
import * as React from 'react';

// Internal
import type { LogoSvgProps } from './logo-svg.types';

export const LogoSvg: React.FC<LogoSvgProps> = (props) => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="32" rx="6" fill="#1890ff"/>
  <text x="60" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MDA Energy</text>
</svg>
);
