// crisis hotline info
export const crisisResources = [
  {
    name: '988 Suicide & Crisis Lifeline',
    action: 'Call or text 988',
    url: 'https://988lifeline.org',
  },
  {
    name: 'Crisis Text Line',
    action: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org',
  },
  {
    name: 'Emergency Services',
    action: 'Call 911 or your local emergency number',
    url: null as string | null,
  },
];

// mood labels for the slider
export const moodLabels: Record<number, string> = {
  1: 'Really struggling',
  2: 'Very low',
  3: 'Not great',
  4: 'A bit down',
  5: 'Okay',
  6: 'Decent',
  7: 'Pretty good',
  8: 'Good',
  9: 'Great',
  10: 'Wonderful',
};
