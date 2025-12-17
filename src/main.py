import json5
import re
from pathlib import Path

INPUT_DIR = Path.expanduser(
    Path("~/src/github.com/BBBase-EHeresy-PPPub/BBBase/docs/bb2025")
)
OUTPUT_DIR = Path("json")
OUTPUT_DIR.mkdir(exist_ok=True)
all_players = {}
all_teams = []


def parse_int_or_nan(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def parse_cost(cost_str):
    match = re.match(r"(\d+)K", cost_str.strip())
    return int(match.group(1)) * 1000 if match else 0


def parse_skills(skills_str):
    return re.findall(r"\[([^\]]+)\]", skills_str)


def parse_tags(tags):
    return [tag.strip() for tag in tags.split(",")]


def parse_player_row(row, team_name):
    cols = [c.strip() for c in row.strip("|").split("|")]
    if len(cols) < 11:
        return None

    match = re.match(r"(.+)\s*\*\((.+)\)\*", cols[1])
    name, tags = match.groups() if match else (cols[1], "")
    tags = parse_tags(tags)
    name = name.strip()

    quantity = int(cols[0][2:])
    skills = parse_skills(cols[7])
    primary = cols[8].split() if cols[8] else []
    secondary = cols[9].split() if cols[9] else []
    cost = parse_cost(cols[10])

    # Compose a unique player ID
    player_id = (
        f"{team_name.lower().replace(' ', '_')}_{name.lower().replace(' ', '_')}"
    )

    return player_id, {
        "name": name,
        "quantity": quantity,
        "tags": tags,
        "MA": int(cols[2]),
        "ST": int(cols[3]),
        "AG": int(cols[4][:-1]),
        "PA": parse_int_or_nan(cols[5][:-1]),
        "AV": int(cols[6][:-1]),
        "skills": skills,
        "primary": primary,
        "secondary": secondary,
        "cost": cost,
    }


def parse_list_section(lines):
    items = []
    for line in lines:
        m = re.match(r"\*\s*\[([^\]]+)\](?:\s*-\s*(\d+K))?", line.strip())
        if m:
            name, cost = m.groups()
            items.append({"name": name, "cost": parse_cost(cost) if cost else 0})
    return items


def parse_special_rules(lines):
    items = []
    for line in lines:
        m = re.match(r"\*\s*\[([^\]]+)\]", line.strip())
        if m:
            items.append(m.group(1))
    return items


def parse_teams():
    for md_file in INPUT_DIR.glob("teams/*.md"):
        with md_file.open(encoding="utf-8") as f:
            lines = [l.rstrip() for l in f.readlines()]

        team_name = md_file.stem
        team_name = team_name.replace("_", " ").title()

        team_players = []
        special_rules = []
        staff = []
        star_players = []
        inducements = []

        section = None
        for line in lines:
            line = line.strip()
            if not line:
                continue

            if line.startswith("### "):
                section = line[4:].lower()
                continue

            if line.startswith("|") and "Position" not in line and "---" not in line:
                result = parse_player_row(line, team_name)
                if result:
                    player_id, player_data = result
                    # Add to global player list if not present
                    if player_id not in all_players:
                        all_players[player_id] = player_data
                    # Reference player in the team
                    team_players.append(player_id)
                continue

            if line.startswith("* "):
                if section == "special rules":
                    special_rules.extend(parse_special_rules([line]))
                elif section == "staff":
                    staff.extend(parse_list_section([line]))
                elif section == "star players":
                    star_players.extend(parse_list_section([line]))
                elif section == "inducements":
                    inducements.extend(parse_list_section([line]))

        all_teams.append(
            {
                "name": team_name,
                "players": team_players,
                "special_rules": special_rules,
                "staff": staff,
                "star_players": star_players,
                "inducements": inducements,
            }
        )


def main():
    parse_teams()

    # Write players.json
    with (OUTPUT_DIR / "players.json5").open("w", encoding="utf-8") as f:
        json5.dump(all_players, f, indent=2, ensure_ascii=False, quote_keys=True)

    # Write teams.json
    with (OUTPUT_DIR / "teams.json5").open("w", encoding="utf-8") as f:
        json5.dump(all_teams, f, indent=2, ensure_ascii=False, quote_keys=True)

    print(f"Wrote {OUTPUT_DIR / 'players.json5'} and {OUTPUT_DIR / 'teams.json5'}")


main()
