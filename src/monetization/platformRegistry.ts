/**
 * Platform adapter registry
 * Maps platform types to their corresponding adapters
 */

import type { PlatformType, PlatformAdapter, PlatformRegistryEntry } from './contracts';
import { SquareAdapter } from './adapters/square';
import { VagaroAdapter } from './adapters/vagaro';
import { BoulevardAdapter } from './adapters/boulevard';
import { GenericLinkOutAdapter } from './adapters/genericLinkOut';

/**
 * Registry of all available platform adapters
 */
const ADAPTERS: Record<PlatformType, PlatformAdapter> = {
  square: new SquareAdapter(),
  vagaro: new VagaroAdapter(),
  boulevard: new BoulevardAdapter(),
  other: new GenericLinkOutAdapter(),
};

/**
 * Detailed platform information
 */
const PLATFORM_INFO: Record<PlatformType, Omit<PlatformRegistryEntry, 'adapter'>> = {
  square: {
    displayName: 'Square',
    description: 'Square Online and Square POS system',
  },
  vagaro: {
    displayName: 'Vagaro',
    description: 'Vagaro salon and spa management software',
  },
  boulevard: {
    displayName: 'Boulevard',
    description: 'Boulevard client experience platform',
  },
  other: {
    displayName: 'Other/Generic',
    description: 'Generic platform with custom URLs',
  },
};

/**
 * Get a platform adapter by platform type
 * @param platform Platform type
 * @returns Platform adapter instance
 */
export function getPlatformAdapter(platform: PlatformType): PlatformAdapter {
  const adapter = ADAPTERS[platform];
  
  if (!adapter) {
    throw new Error(`Unknown platform: ${platform}`);
  }
  
  return adapter;
}

/**
 * Get platform information
 * @param platform Platform type
 * @returns Platform information
 */
export function getPlatformInfo(platform: PlatformType): PlatformRegistryEntry {
  const info = PLATFORM_INFO[platform];
  const adapter = getPlatformAdapter(platform);
  
  if (!info) {
    throw new Error(`Unknown platform: ${platform}`);
  }
  
  return {
    adapter,
    ...info,
  };
}

/**
 * Get all supported platforms
 * @returns Array of platform types
 */
export function getSupportedPlatforms(): PlatformType[] {
  return Object.keys(ADAPTERS) as PlatformType[];
}

/**
 * Check if a platform is supported
 * @param platform Platform type to check
 * @returns True if supported, false otherwise
 */
export function isPlatformSupported(platform: string): platform is PlatformType {
  return platform in ADAPTERS;
}

/**
 * Get all platform registry entries
 * @returns Array of all platform entries
 */
export function getAllPlatforms(): PlatformRegistryEntry[] {
  return getSupportedPlatforms().map(platform => getPlatformInfo(platform));
}
