const fs = require('fs');
const path = require('path');

const speciesDir = path.join(__dirname, 'src/content/species');
const files = fs.readdirSync(speciesDir).filter(f => f.endsWith('.json'));

function calculateSpeakingScore(text, vocalization) {
    const combined = (text + " " + vocalization).toLowerCase();
    if (combined.includes('excellent talker') || combined.includes('hundreds of words')) return 9;
    if (combined.includes('good talker') || combined.includes('large vocabulary')) return 7;
    if (combined.includes('can learn words') || combined.includes('mimic')) return 5;
    if (combined.includes('whistle') || combined.includes('chatter')) return 3;
    return 1;
}

function calculateNoiseScore(loudness) {
    const text = loudness.toLowerCase();
    if (text.includes('very loud') || text.includes('scream')) return 9; // Cockatoo/Macaw level
    if (text.includes('loud') || text.includes('noisy')) return 7;       // Conure level
    if (text.includes('moderate')) return 5;                             // Cockatiel level
    if (text.includes('quiet') || text.includes('soft')) return 2;       // Budgie/Parrotlet level
    return 5; // Default
}

function calculateSocialScore(temperament) {
    const text = temperament.toLowerCase();
    if (text.includes('velcro') || text.includes('demanding') || text.includes('highly social')) return 9;
    if (text.includes('social') || text.includes('flock')) return 7;
    if (text.includes('independent')) return 4;
    return 6;
}

function calculateCuddlinessScore(temperament) {
    const text = temperament.toLowerCase();
    if (text.includes('affectionate') || text.includes('cuddly') || text.includes('velcro')) return 9;
    if (text.includes('nippy') || text.includes('hands-off')) return 3;
    if (text.includes('friendly')) return 7;
    return 5;
}

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(speciesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Use English text for analysis
    const descEn = data.description.en;
    const tempEn = data.temperament.en;
    const loudEn = data.loudness.en;
    const vocEn = data.vocalization.en;

    // Calculate scores
    const talking = calculateSpeakingScore(descEn, vocEn);
    const noise = calculateNoiseScore(loudEn);
    const social = calculateSocialScore(tempEn);
    const cuddly = calculateCuddlinessScore(tempEn);

    // Apply new fields
    data.talkingScore = talking;
    data.noiseScore = noise;
    data.socialScore = social;
    data.cuddlinessScore = cuddly;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    updatedCount++;
});

console.log(`Updated ratings for ${updatedCount} species.`);
