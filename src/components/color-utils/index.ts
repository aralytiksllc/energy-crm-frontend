import * as colors from '@ant-design/colors';

const paletteNames = [
  'red',
  'volcano',
  'orange',
  'gold',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
];

const paletteMap: Record<string, string[]> = {
  red: colors.red,
  volcano: colors.volcano,
  orange: colors.orange,
  gold: colors.gold,
  yellow: colors.yellow,
  lime: colors.lime,
  green: colors.green,
  cyan: colors.cyan,
  blue: colors.blue,
  geekblue: colors.geekblue,
  purple: colors.purple,
  magenta: colors.magenta,
};

let colorList = paletteNames.flatMap((name) => [
  paletteMap[name][7],
  paletteMap[name][9],
]);

while (colorList.length < 55) {
  colorList = colorList.concat(colorList);
}
colorList = colorList.slice(0, 55);
for (let i = colorList.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [colorList[i], colorList[j]] = [colorList[j], colorList[i]];
}

export const getUserColor = (userId: string | number) => {
  const seed = Number(
    String(userId)
      .split('')
      .reduce((acc, c) => acc + c.charCodeAt(0), 0),
  );
  const idx = Math.abs(seed) % colorList.length;
  return colorList[idx];
};

export const getContrastTextColor = (bgColor: string) => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#222' : '#fff';
};
