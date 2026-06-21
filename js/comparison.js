// 1. Fetch simulation runs from LocalStorage
const timelines = JSON.parse(localStorage.getItem('savedTimelines')) || [];
const badgesContainer = document.getElementById('badges-container');

// 2. Map data fields into the analytics bar visuals and timelines matrix
if (timelines.length > 0) {
    const fA = timelines[0];
    document.getElementById('leg-a').innerText = fA.finalTitle || fA.career;
    document.getElementById('heading-timeline-a').innerText = "Future A Profile";
    document.getElementById('career-a').innerText = fA.career;
    document.getElementById('skill-a').innerText = `${fA.skill}/100`;
    document.getElementById('finance-a').innerText = `${fA.finance}/100`;
    document.getElementById('risk-a').innerText = `${fA.risk}/100`;
    document.getElementById('stability-a').innerText = `${fA.stability}/100`;
    document.getElementById('happiness-a').innerText = `${fA.happiness}/100`;

    // Fill Visual Graphic Progress Bars for Future A
    document.getElementById('bar-skill-a').style.width = `${fA.skill}%`;
    document.getElementById('bar-finance-a').style.width = `${fA.finance}%`;
    document.getElementById('bar-risk-a').style.width = `${fA.risk}%`;
    document.getElementById('bar-stability-a').style.width = `${fA.stability}%`;
    document.getElementById('bar-happiness-a').style.width = `${fA.happiness}%`;

    // Render Journey Visual Timeline for A
    let flowA = `<div class="timeline-step">🎓 Start College Phase</div>`;
    if (fA.journey && fA.journey.length > 0) {
        fA.journey.forEach(stepName => {
            flowA += `<div class="timeline-arrow">↓</div><div class="timeline-step">${stepName}</div>`;
        });
        flowA += `<div class="timeline-arrow">↓</div><div class="timeline-step" style="background-color: #e0e7ff;">💼 ${fA.career}</div>`;
    }
    document.getElementById('timeline-a-flow').innerHTML = flowA;
} else {
    document.getElementById('timeline-a-flow').innerHTML = "<em>No simulation history discovered yet.</em>";
}

if (timelines.length > 1) {
    const fB = timelines[1];
    document.getElementById('leg-b').innerText = fB.finalTitle || fB.career;
    document.getElementById('heading-timeline-b').innerText = "Future B Profile";
    document.getElementById('career-b').innerText = fB.career;
    document.getElementById('skill-b').innerText = `${fB.skill}/100`;
    document.getElementById('finance-b').innerText = `${fB.finance}/100`;
    document.getElementById('risk-b').innerText = `${fB.risk}/100`;
    document.getElementById('stability-b').innerText = `${fB.stability}/100`;
    document.getElementById('happiness-b').innerText = `${fB.happiness}/100`;

    // Append Numeric Tooltip values comparison indicators text
    const fA = timelines[0];
    document.getElementById('val-skill').innerText = `A: ${fA.skill} | B: ${fB.skill}`;
    document.getElementById('val-finance').innerText = `A: ${fA.finance} | B: ${fB.finance}`;
    document.getElementById('val-risk').innerText = `A: ${fA.risk} | B: ${fB.risk}`;
    document.getElementById('val-stability').innerText = `A: ${fA.stability} | B: ${fB.stability}`;
    document.getElementById('val-happiness').innerText = `A: ${fA.happiness} | B: ${fB.happiness}`;

    // Fill Visual Graphic Progress Bars for Future B
    document.getElementById('bar-skill-b').style.width = `${fB.skill}%`;
    document.getElementById('bar-finance-b').style.width = `${fB.finance}%`;
    document.getElementById('bar-risk-b').style.width = `${fB.risk}%`;
    document.getElementById('bar-stability-b').style.width = `${fB.stability}%`;
    document.getElementById('bar-happiness-b').style.width = `${fB.happiness}%`;

    // Render Journey Visual Timeline for B
    let flowB = `<div class="timeline-step">🎓 Start College Phase</div>`;
    if (fB.journey && fB.journey.length > 0) {
        fB.journey.forEach(stepName => {
            flowB += `<div class="timeline-arrow">↓</div><div class="timeline-step">${stepName}</div>`;
        });
        flowB += `<div class="timeline-arrow">↓</div><div class="timeline-step" style="background-color: #e0f2fe;">💼 ${fB.career}</div>`;
    }
    document.getElementById('timeline-b-flow').innerHTML = flowB;
} else if (timelines.length === 1) {
    const fA = timelines[0];
    document.getElementById('val-skill').innerText = `${fA.skill}/100`;
    document.getElementById('val-finance').innerText = `${fA.finance}/100`;
    document.getElementById('val-risk').innerText = `${fA.risk}/100`;
    document.getElementById('val-stability').innerText = `${fA.stability}/100`;
    document.getElementById('val-happiness').innerText = `${fA.happiness}/100`;
    document.getElementById('timeline-b-flow').innerHTML = "<em>Simulate a second alternative future path track to trigger alignment timelines.</em>";
}

// 3. Generate Automated Future Strategy Insights Conclusions
function generateInsights() {
    if (timelines.length < 2) return;
    
    const fA = timelines[0];
    const fB = timelines[1];
    const listContainer = document.getElementById('insights-list');
    let insightLines = [];

    if (fA.skill !== fB.skill) {
        let expert = fA.skill > fB.skill ? "Future A" : "Future B";
        insightLines.push(`<strong>${expert}</strong> accomplished a higher specialized technical skillset ceiling.`);
    }
    if (fA.finance !== fB.finance) {
        let wealthier = fA.finance > fB.finance ? "Future A" : "Future B";
        insightLines.push(`Strategic choices in <strong>${wealthier}</strong> optimized career financial yield packages.`);
    }
    if (fA.risk !== fB.risk) {
        let riskier = fA.risk > fB.risk ? "Future A" : "Future B";
        insightLines.push(`Executing operations via <strong>${riskier}</strong> introduced significantly higher baseline vector volatility exposure risks.`);
    }
    if (fA.happiness !== fB.happiness) {
        let happier = fA.happiness > fB.happiness ? "Future A" : "Future B";
        insightLines.push(`Work-life choices made in <strong>${happier}</strong> generated a superior index lifestyle score framework.`);
    }

    if (insightLines.length > 0) {
        listContainer.innerHTML = insightLines.map(line => `<li style="margin: 0.25rem 0;">${line}</li>`).join('');
        document.getElementById('insights-wrapper').classList.remove('hidden');
    }
}
generateInsights();

// 4. Dynamic Badge Calculation Engine System Logic Loop
function calculateBadges() {
    if (timelines.length === 0) return;
    badgesContainer.innerHTML = "";
    let badgeHTML = "";

    timelines.forEach((time, index) => {
        const label = index === 0 ? "A" : "B";
        if (time.skill >= 85) badgeHTML += `<div class="badge-box">🏆 Engineering Guru (Future ${label})</div>`;
        if (time.finance >= 85) badgeHTML += `<div class="badge-box">💰 Wealth Maximizer (Future ${label})</div>`;
        if (time.risk >= 45) badgeHTML += `<div class="badge-box">⚡ High Risk Maverick (Future ${label})</div>`;
        if (time.stability >= 80) badgeHTML += `<div class="badge-box">🛡️ Ironclad Fortress Track (Future ${label})</div>`;
        if (time.happiness >= 80) badgeHTML += `<div class="badge-box">❤️ Zen Master Life (Future ${label})</div>`;
    });

    if (badgeHTML === "") badgeHTML = `<div class="badge-box">🌱 Fresh Explorer Architecture Initialized</div>`;
    badgesContainer.innerHTML = badgeHTML;
}
calculateBadges();

// 5. Dark Mode Persistence Controller
const darkToggle = document.getElementById('dark-toggle-btn');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

darkToggle.onclick = function() {
    document.body.classList.toggle('dark-mode');
    const nowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
};

document.getElementById('download-btn').onclick = function() { window.print(); };
document.getElementById('new-future-btn').onclick = function() { window.location.href = 'careers.html'; };
document.getElementById('reset-btn').onclick = function() {
    if (confirm("Clear your parallel data repository logs?")) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
};