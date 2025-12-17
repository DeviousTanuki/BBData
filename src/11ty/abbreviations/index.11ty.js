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
    return {
      abbreviations,
      abbreviations_reversed,
    };
  }

  render({ abbreviations, abbreviations_reversed }) {
    return `\
${render_abbreviations({ abbreviations, title: "Abbreviations" })}
${render_abbreviations({ abbreviations: abbreviations_reversed, title: "Reversed Abbreviations" })}
`;
  }
}
