export function symptomsBuilder(entry) {
    let symptoms = [];
    if (entry.mood_scale < 3) symptoms.push("Bad mood");
    if (entry.sleep_quality_scale < 3 || entry.sleep_duration_length < 6) symptoms.push("Bad sleep");
    if (entry.stool_consistency_scale === 3
        || entry.stool_quantity_scale === 3
        || entry.stool_urgency
        || entry.stool_mucus
        || entry.stool_blood
    ) symptoms.push("Stool issues");
    if (entry.stomach_pain || entry.stomach_bloating || entry.stomach_flatulence) symptoms.push("Stomach issues");
    return symptoms.length === 0 ? "None" : symptoms.join(", ");
}