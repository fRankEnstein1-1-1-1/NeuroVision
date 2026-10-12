async function predictState(features) {
    const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
    });
    if (!res.ok) throw new Error(`Model API error: ${res.status}`);
    return res.json();
}
const STATS = {
    rest: { heart_rate: [72, 8], rmssd: [45, 12], sdnn: [55, 12], blink_rate: [15, 4], eye_closure_pct: [3, 1.5], head_movement: [1.0, 0.5] },
    easy_task: { heart_rate: [80, 9], rmssd: [36, 10], sdnn: [48, 10], blink_rate: [17, 4], eye_closure_pct: [4, 1.5], head_movement: [1.4, 0.6] },
    difficult_task: { heart_rate: [95, 11], rmssd: [24, 8], sdnn: [36, 9], blink_rate: [22, 5], eye_closure_pct: [6, 2], head_movement: [2.2, 0.8] },
};
const RANGE = { heart_rate: [50, 140], rmssd: [5, 100], sdnn: [10, 100], blink_rate: [5, 40], eye_closure_pct: [0.5, 15], head_movement: [0.1, 6] };

const randn = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
const clip = (v, [lo, hi]) => Math.min(hi, Math.max(lo, v));

function generateFeatures(condition) {
    const key = { baseline: "rest", recovery: "rest" }[condition] || condition;
    const f = {};
    for (const [k, [m, s]] of Object.entries(STATS[key])) {
        f[k] = +clip(m + s * randn(), RANGE[k]).toFixed(2);
    }
    f.rppg_hr = +clip(f.heart_rate + 3 * randn(), RANGE.heart_rate).toFixed(1);
    return f;
}

module.exports = { predictState, generateFeatures };
