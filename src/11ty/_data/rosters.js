import { loadJson5 } from '../utils.js';

export default async function () {
  let rosters = [];
  const abbreviations = await loadJson5('../../json/abbreviations.json5');
  const abbreviations_reversed = await loadJson5('../../json/abbreviations_reversed.json5');
  const teams = await loadJson5('../../json/teams.json5');
  const players_raw = await loadJson5('../../json/players.json5');
  for (let team of teams) {
    let roster = {};
    rosters.push(roster);
    let players = [];
    roster["players"] = players;
    roster["name"] = team.name;

    let number = 1;
    for (let player_id of team.players) {
      let player_raw = players_raw[player_id];
      for (let i = 1; i <= player_raw.quantity; i++) {
        let player = structuredClone(player_raw);
        players.push(player);
        player["number"] = String(number).padStart(2, "0");
        number += 1;
        let skills_abbr = [];
        player["skills_abbr"] = skills_abbr;
        for (let skill of player.skills) {
          skills_abbr.push(abbreviations_reversed[skill]);
        }
       }
    }
  }
  return rosters;
}