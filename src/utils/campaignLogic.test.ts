import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hexToRgb,
  calculateLuminance,
  calculateContrastRatio,
  getFormatMetadata,
  validateAdvertisingCopy,
} from './campaignLogic';

test('hexToRgb correctly parses valid 6-char hex colors', () => {
  const charcoal = hexToRgb('#242A38');
  assert.deepEqual(charcoal, { r: 36, g: 42, b: 56 });

  const blue = hexToRgb('#1D75BC');
  assert.deepEqual(blue, { r: 29, g: 117, b: 188 });

  const orange = hexToRgb('#F7941D');
  assert.deepEqual(orange, { r: 247, g: 148, b: 29 });
});

test('calculateContrastRatio validates art direction palette readability on #242A38', () => {
  // Charcoal background #242A38
  const whiteTextRatio = calculateContrastRatio('#FFFFFF', '#242A38');
  assert.ok(whiteTextRatio >= 11, `White on charcoal should have very high contrast (${whiteTextRatio})`);

  const orangeTextRatio = calculateContrastRatio('#F7941D', '#242A38');
  assert.ok(orangeTextRatio >= 4.5, `Orange highlight #F7941D meets WCAG AA 4.5:1 ratio (${orangeTextRatio})`);

  const blueAtmosphericRatio = calculateContrastRatio('#1D75BC', '#242A38');
  assert.ok(blueAtmosphericRatio > 2.0, `Blue key light provides atmospheric tonal depth (${blueAtmosphericRatio})`);
});

test('getFormatMetadata delivers correct safe zones for square 1080x1080', () => {
  const squareMeta = getFormatMetadata('square');
  assert.equal(squareMeta.dimensions.width, 1080);
  assert.equal(squareMeta.dimensions.height, 1080);
  assert.equal(squareMeta.ratio, '1:1');

  // Upper left negative space should be located in top 40% and left 50%
  assert.ok(squareMeta.safeZones.upperLeftNegativeSpace.x < 10);
  assert.ok(squareMeta.safeZones.upperLeftNegativeSpace.y < 10);
  assert.ok(squareMeta.safeZones.upperLeftNegativeSpace.w <= 50);

  // Child subject anchor is placed right of center (x > 50%)
  assert.ok(squareMeta.safeZones.childSubjectAnchor.x > 50);
});

test('validateAdvertisingCopy accepts well-dimensioned Arabic / English headlines', () => {
  const validResult = validateAdvertisingCopy(
    'المستقبل قيد البناء',
    'برامج الذكاء الاصطناعي والبرمجة لصنّاع الغد من سن ٨ إلى ١٦ سنة'
  );
  assert.equal(validResult.valid, true);
  assert.equal(validResult.headlineWordCount, 3);

  const emptyResult = validateAdvertisingCopy('', 'Some subhead');
  assert.equal(emptyResult.valid, false);

  const overlyLongResult = validateAdvertisingCopy(
    'This headline contains way too many words and will crowd out the child subject entirely on mobile',
    'Short subhead'
  );
  assert.equal(overlyLongResult.valid, false);
});
