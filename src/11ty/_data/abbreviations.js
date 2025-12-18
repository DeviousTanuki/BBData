import { loadJson5 } from '../utils.js';

const abbreviations = await loadJson5('../../json/abbreviations.json5');
const abbreviations_reversed = await loadJson5('../../json/abbreviations_reversed.json5');
const positional_tags = await loadJson5('../../json/positional_tags.json5');
const races = await loadJson5('../../json/races.json5');
const teams = await loadJson5('../../json/teams_list.json5');
const skills_and_traits = await loadJson5('../../json/skills_and_traits.json5');

function lookup(lst) {
  const mydict = {}
  for (let tag of lst) {
    mydict[tag] = abbreviations_reversed[tag];
  }
  return mydict;
}

export default {
  positional_tags: lookup(positional_tags),
  races: lookup(races),
  abbreviations: abbreviations,
  abbreviations_reversed: abbreviations_reversed,
  teams: lookup(teams),
  agility: lookup(skills_and_traits.agility),
  devious: lookup(skills_and_traits.devious),
  general: lookup(skills_and_traits.general),
  mutation: lookup(skills_and_traits.mutation),
  passing: lookup(skills_and_traits.passing),
  strength: lookup(skills_and_traits.strength),
  traits: lookup(skills_and_traits.traits),
}