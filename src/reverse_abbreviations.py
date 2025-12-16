import json5

input = "json/abbreviations.json5"
output = "json/abbreviations_reversed.json5"

rev_abbr = {}

with open(input, "r") as file:
    abbr = json5.load(file)
    for e in abbr:
        rev_abbr[abbr[e]] = e

with open(output, "w") as file:
    json5.dump(rev_abbr, file, sort_keys=True, indent=4, quote_keys=True)