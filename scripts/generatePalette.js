#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const tinycolor = require('tinycolor2');

const { argv } = require('yargs').command(
  '$0 <palette> <color>',
  false,
  yargs =>
    yargs
      .positional('palette', {
        describe: "Palette's name",
        type: 'string',
        choices: ['primary', 'secondary'],
      })
      .positional('color', {
        describe: 'Base color',
        type: 'string',
        coerce: tinycolor.isValid,
      }),
);

const getAccentColor = color =>
  tinycolor(color)
    .lighten(20)
    .saturate()
    .brighten()
    .toHexString();

const shades = [];
const hsl = tinycolor(argv.color).toHsl();

for (let i = 9.5; i >= 0.5; i -= 0.9) {
  hsl.l = 0.1 * i;

  shades.push(tinycolor(hsl).toHexString());
}

const colors = shades.reduce(
  (acc, color, index) => ({
    ...acc,
    [index ? index * 100 : 50]: color,
  }),
  {
    A100: getAccentColor(shades[3]),
    A200: getAccentColor(shades[4]),
    A400: getAccentColor(shades[6]),
    A700: getAccentColor(shades[9]),
    contrastDefaultColor: 'dark',
  },
);

fs.writeFileSync(
  path.join(__dirname, '../src/shared/config/palettes', `${argv.palette}.json`),
  JSON.stringify(colors, null, 2),
);
