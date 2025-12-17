import { loadJson5 } from '../utils.js';


function render_abbreviations({ abbreviations, title }) {
  return `\
<h2>${title}</h2>
<dl>${Object.entries(abbreviations)
      .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
      .join("")}</dl>`;
}


export default class {
  async data() {
    const abbreviations = await loadJson5('../../json/abbreviations.json5');
    const abbreviations_reversed = await loadJson5('../../json/abbreviations_reversed.json5');
    const teams = await loadJson5('../../json/teams.json5');
    return {
      layout: "base.njk",
      abbreviations,
      abbreviations_reversed,
      teams,
    };
  }

  render({ abbreviations, abbreviations_reversed, teams }) {
    for (let team of teams) {

    }
    return `<div class="card"></div>`;
  }
}
