import { closestColor } from './colorCalculations'

const palette = [
  '#7EB5D6',
  '#2A75A9',
  '#274257',
  '#DFC184',
  '#8F6048',
  '#644436'
]

test('calculates closest', () => {
  // palette and expectations from
  // http://danieltao.com/nearest-color/
  const fixtures = [
    { target: '#00b224', expected: '#274257' },
    { target: '#4db244', expected: '#8F6048' },
    { target: '#4f54b6', expected: '#2A75A9' }
  ]

  fixtures.forEach(fixture => {
    expect(
      closestColor(fixture.target, palette)
    ).toBe(fixture.expected)
  })
})
