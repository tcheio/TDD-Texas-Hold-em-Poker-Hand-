import { describe, it, expect } from 'vitest'
import { Rank, Suit } from './card'
import { parseCard } from './parser'

describe('parseCard', () => {
  it('parses Ace of Hearts (Ah)', () => {
    const card = parseCard('Ah')

    expect(card.rank).toBe(Rank.Ace)
    expect(card.suit).toBe(Suit.Hearts)
  })

  it('parses Ten of Diamonds (Td)', () => {
    const card = parseCard('Td')

    expect(card.rank).toBe(Rank.Ten)
    expect(card.suit).toBe(Suit.Diamonds)
  })

  it('is case insensitive', () => {
    const card = parseCard('aH')

    expect(card.rank).toBe(Rank.Ace)
    expect(card.suit).toBe(Suit.Hearts)
  })

  it('throws if format is invalid length', () => {
    expect(() => parseCard('AAA')).toThrow()
    expect(() => parseCard('A')).toThrow()
  })

  it('throws if rank is invalid', () => {
    expect(() => parseCard('Xh')).toThrow()
  })

  it('throws if suit is invalid', () => {
    expect(() => parseCard('Ax')).toThrow()
  })
})
