'use client';

import type { Card, CardRarity } from '../types/card';

interface CardBasicInfoProps {
  /** Card object containing basic information */
  card: Card;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Parses MTG mana cost notation into individual symbols
 * Example: "{2}{U}{U}" -> ["2", "U", "U"]
 */
function parseManaSymbols(manaCost: string): string[] {
  if (!manaCost) return [];
  const symbolRegex = /\{([^}]+)\}/g;
  const symbols: string[] = [];
  let match;

  while ((match = symbolRegex.exec(manaCost)) !== null) {
    symbols.push(match[1]);
  }

  return symbols;
}

/**
 * Returns CSS classes for rarity badge styling
 */
function getRarityClasses(rarity: CardRarity): string {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide';

  const rarityColorMap: Record<CardRarity, string> = {
    common: 'bg-gray-200 text-gray-800',
    uncommon: 'bg-gray-400 text-white',
    rare: 'bg-yellow-400 text-yellow-900',
    mythic: 'bg-orange-500 text-white'
  };

  return `${baseClasses} ${rarityColorMap[rarity]} ${rarity}`;
}

/**
 * Returns the appropriate color for each mana symbol
 */
function getManaSymbolColor(symbol: string): string {
  const colorMap: Record<string, string> = {
    'W': 'bg-yellow-50 text-yellow-800 border-yellow-300',
    'U': 'bg-blue-100 text-blue-800 border-blue-300',
    'B': 'bg-gray-800 text-white border-gray-900',
    'R': 'bg-red-100 text-red-800 border-red-300',
    'G': 'bg-green-100 text-green-800 border-green-300',
    'C': 'bg-gray-300 text-gray-700 border-gray-400'
  };

  // Check if it's a number (generic mana)
  if (/^\d+$/.test(symbol)) {
    return 'bg-gray-200 text-gray-700 border-gray-300';
  }

  // Check if it's a color symbol
  return colorMap[symbol] || 'bg-gray-200 text-gray-700 border-gray-300';
}

/**
 * CardBasicInfo component displays essential card information including
 * name, mana cost, type, set symbol, and rarity badge.
 *
 * Layout considerations:
 * - Fixed height containers prevent layout shift during loading
 * - Flexbox layout maintains consistent spacing
 * - All text elements have minimum heights reserved
 */
export function CardBasicInfo({ card, className = '' }: CardBasicInfoProps) {
  const manaSymbols = parseManaSymbols(card.manaCost);

  return (
    <div
      data-testid="card-basic-info"
      className={`space-y-4 ${className}`}
      style={{ minHeight: '200px' }}
    >
      {/* Card Name */}
      <div className="flex items-start justify-between gap-4">
        <h2
          data-testid="card-name"
          className="text-2xl font-bold text-gray-900 leading-tight"
          style={{ minHeight: '2.5rem' }}
        >
          {card.name}
        </h2>

        {/* Mana Cost */}
        <div
          data-testid="mana-cost"
          className="flex items-center gap-1 flex-shrink-0"
          style={{ minHeight: '2rem' }}
        >
          {manaSymbols.length > 0 ? (
            manaSymbols.map((symbol, index) => (
              <span
                key={`${symbol}-${index}`}
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold ${getManaSymbolColor(
                  symbol
                )}`}
                title={symbol}
              >
                {symbol}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm italic">No cost</span>
          )}
        </div>
      </div>

      {/* Card Type */}
      <div>
        <p
          data-testid="card-type"
          className="text-base text-gray-700 font-medium"
          style={{ minHeight: '1.5rem' }}
        >
          {card.type}
        </p>
      </div>

      {/* Set Symbol and Rarity Badge */}
      <div className="flex items-center gap-4 pt-2">
        {/* Set Symbol */}
        <div
          data-testid="set-symbol"
          className="flex items-center gap-2"
          style={{ minHeight: '2rem' }}
        >
          <span className="text-2xl" title={`Set: ${card.setName}`}>
            🔮
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-900 uppercase">
              {card.setCode}
            </span>
            <span className="text-xs text-gray-500">{card.setName}</span>
          </div>
        </div>

        {/* Rarity Badge */}
        <div style={{ minHeight: '2rem' }} className="flex items-center">
          <span
            data-testid="rarity-badge"
            className={getRarityClasses(card.rarity)}
          >
            {card.rarity}
          </span>
        </div>
      </div>

      {/* Card Text (if available) */}
      {card.text && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {card.text}
          </p>
        </div>
      )}

      {/* Power/Toughness or Loyalty */}
      {(card.power || card.loyalty) && (
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
          {card.power && card.toughness && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">P/T:</span>
              <span>
                {card.power}/{card.toughness}
              </span>
            </div>
          )}
          {card.loyalty && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Loyalty:</span>
              <span>{card.loyalty}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardBasicInfo;
