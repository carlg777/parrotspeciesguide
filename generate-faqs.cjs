const fs = require('fs');
const path = require('path');

const speciesDir = path.join(__dirname, 'src/content/species');
const files = fs.readdirSync(speciesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(speciesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Skip if already has structured FAQs (prevent overwriting manual edits)
    if (data.faqs && data.faqs.length > 0) return;

    const speciesNameEn = data.species.en;
    const speciesNameEs = data.species.es;
    const lifespanEn = data.lifespan.en;
    const lifespanEs = data.lifespan.es;
    const originEn = data.origin.en;
    const originEs = data.origin.es;
    const careLevel = data.careLevel;

    const faqs = [
        {
            question: {
                en: `What is the lifespan of a ${speciesNameEn}?`,
                es: `¿Cuál es la esperanza de vida de un ${speciesNameEs}?`
            },
            answer: {
                en: `The ${speciesNameEn} typically lives for ${lifespanEn}. With proper care, diet, and regular vet check-ups, they can live a full and healthy life.`,
                es: `El ${speciesNameEs} suele vivir ${lifespanEs}. Con los cuidados adecuados, una dieta correcta y revisiones veterinarias periódicas, pueden vivir una vida plena y sana.`
            }
        },
        {
            question: {
                en: `Is the ${speciesNameEn} good for beginners?`,
                es: `¿Es el ${speciesNameEs} adecuado para principiantes?`
            },
            answer: {
                en: `This species is rated as '${careLevel}' care level. ${careLevel === 'beginner'
                        ? 'They are generally easier to handle and train compared to larger parrots.'
                        : 'They require specific attention, socialization, or dietary needs that may challenge first-time owners.'
                    }`,
                es: `Esta especie está clasificada con un nivel de cuidado '${careLevel === 'beginner' ? 'principiante' : (careLevel === 'intermediate' ? 'intermedio' : 'avanzado')}'. ${careLevel === 'beginner'
                        ? 'Suelen ser más fáciles de manejar y adiestrar que los loros más grandes.'
                        : 'Requieren una atención específica, socialización o necesidades dietéticas que pueden suponer un reto para los propietarios primerizos.'
                    }`
            }
        },
        {
            question: {
                en: `Where does the ${speciesNameEn} come from?`,
                es: `¿De dónde procede el ${speciesNameEs}?`
            },
            answer: {
                en: `The ${speciesNameEn} is native to ${originEn}.`,
                es: `El ${speciesNameEs} es originario de ${originEs}.`
            }
        }
    ];

    data.faqs = faqs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log(`Generated FAQs for ${files.length} species.`);
