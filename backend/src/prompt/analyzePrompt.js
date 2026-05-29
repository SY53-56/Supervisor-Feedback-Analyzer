const buildPrompt = (transcript, rubric) => {
  return `
You are an expert analyst evaluating a Fellow's performance 
based on a supervisor's transcript.

RUBRIC:
${JSON.stringify(rubric, null, 2)}

TRANSCRIPT:
${transcript}

IMPORTANT RULES:
1. Score based on EVIDENCE only — supervisor ki tone ignore karo
2. Layer 1 (task execution) vs Layer 2 (systems building) distinguish karo
   - Layer 1: meetings, follow-up, data entry, coordination
   - Layer 2: SOPs, trackers, dashboards jo Fellow ke baad bhi chalein
3. Survivability Test: "Agar Fellow kal chala jaye — kya system chalta rahega?"
   - Haan → systems building (score 7+)
   - Nahi → task execution only (score max 6)
4. Supervisor Bias check karo:
   - "Mere saare kaam karta hai" → helpful lag raha, actually 5-6
   - "Laptop pe rehta hai" → negative lag raha, actually systems building ho sakta
5. Critical boundary — 6 vs 7:
   - Score 6: Tasks execute karta jo supervisor define kare
   - Score 7: Khud problems identify kare jo supervisor ne notice nahi ki

ASSESSMENT DIMENSIONS (gaps check karo):
- execution: Kya kaam time pe hota hai bina reminder ke?
- systems_building: Kya koi self-sustaining system banaya?
- kpi_impact: Kya measurable business outcome connect hai?
- change_management: Kya floor team ne new processes adopt ki?

Return ONLY valid JSON, no extra text:

{
  "score": {
    "value": number,
    "label": string,
    "confidence": "low | medium | high",
    "justification": string
  },
  "evidence": [
    {
      "quote": string,
      "signal": "positive | negative | neutral",
      "dimension": "execution | systems_building | kpi_impact | change_management",
      "interpretation": string
    }
  ],
  "kpiMapping": [
    {
      "kpi": string,
      "evidence": string,
      "type": "system | personal"
    }
  ],
  "gaps": [
    {
      "dimension": string,
      "detail": string
    }
  ],
  "followUpQuestions": [
    {
      "question": string,
      "target": string
    }
  ]
}

Do not include any explanation outside JSON.
`;
};

module.exports = { buildPrompt };