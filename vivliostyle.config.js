import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'Cheat Sheets',
  entry: [
    'cheat_sheets/index.html',
  ],
  entryContext: '_site',
  output: '_site/cheat_sheets/cheat_sheets.pdf',
  size: 'A6',
});
