
const timelines = JSON.parse(localStorage.getItem('savedTimelines')) || [];
const badgesContainer = document.getElementById('badges-container');

// Bar visuals and timelines matrix
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

    //Update Future A charts
    document.getElementById('bar-skill-a').style.width = `${fA.skill}%`;
    document.getElementById('bar-finance-a').style.width = `${fA.finance}%`;
    document.getElementById('bar-risk-a').style.width = `${fA.risk}%`;
    document.getElementById('bar-stability-a').style.width = `${fA.stability}%`;
    document.getElementById('bar-happiness-a').style.width = `${fA.happiness}%`;

    // Journey Visual Timeline for A
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

    const fA = timelines[0];
    document.getElementById('val-skill').innerText = `A: ${fA.skill} | B: ${fB.skill}`;
    document.getElementById('val-finance').innerText = `A: ${fA.finance} | B: ${fB.finance}`;
    document.getElementById('val-risk').innerText = `A: ${fA.risk} | B: ${fB.risk}`;
    document.getElementById('val-stability').innerText = `A: ${fA.stability} | B: ${fB.stability}`;
    document.getElementById('val-happiness').innerText = `A: ${fA.happiness} | B: ${fB.happiness}`;

    // Update Future B charts
    document.getElementById('bar-skill-b').style.width = `${fB.skill}%`;
    document.getElementById('bar-finance-b').style.width = `${fB.finance}%`;
    document.getElementById('bar-risk-b').style.width = `${fB.risk}%`;
    document.getElementById('bar-stability-b').style.width = `${fB.stability}%`;
    document.getElementById('bar-happiness-b').style.width = `${fB.happiness}%`;

    // Journey Visual Timeline for B
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

// Notes From The Multiverse
function generateInsights() {
    if (timelines.length < 2) return;

    const fA = timelines[0];
    const fB = timelines[1];

    const listContainer = document.getElementById('insights-list');
    const insights = [];

    if (fA.skill !== fB.skill) {
        const winner = fA.skill > fB.skill ? "Future A" : "Future B";
        insights.push(`🧠 In one universe, <strong>${winner}</strong> spent more time mastering technical skills.`);
    }

    if (fA.finance !== fB.finance) {
        const winner = fA.finance > fB.finance ? "Future A" : "Future B";
        insights.push(`💰 <strong>${winner}</strong> unlocked stronger financial growth over time.`);
    }

    if (fA.risk !== fB.risk) {
        const winner = fA.risk > fB.risk ? "Future A" : "Future B";
        insights.push(`🚀 <strong>${winner}</strong> chose a bolder path with higher career risk.`);
    }

    if (fA.stability !== fB.stability) {
        const winner = fA.stability > fB.stability ? "Future A" : "Future B";
        insights.push(`🛡️ <strong>${winner}</strong> followed a more stable and predictable journey.`);
    }

    if (fA.happiness !== fB.happiness) {
        const winner = fA.happiness > fB.happiness ? "Future A" : "Future B";
        insights.push(`😌 <strong>${winner}</strong> ended up with a higher happiness score.`);
    }

    insights.push(
        `🌌 Different choices created different versions of success. The multiverse doesn't have one perfect future; only different possibilities.`
    );

    listContainer.innerHTML = insights
        .map(item => `<li style="margin: 0.5rem 0;">${item}</li>`)
        .join('');

    document.getElementById('insights-wrapper').classList.remove('hidden');
}

generateInsights();

//  Generate achievement badges
function calculateBadges() {

    if (timelines.length === 0) return;

    badgesContainer.innerHTML = "";

    const earnedBadges = new Set();

    timelines.forEach(future => {

        if (future.skill >= 85) {
            earnedBadges.add("🏆 Engineering Guru");
        }

        if (future.finance >= 85) {
            earnedBadges.add("💰 Paycheck Enjoyer");
        }

        if (future.risk >= 45) {
            earnedBadges.add("⚡ Chaos Enjoyer");
        }

        if (future.stability >= 80) {
            earnedBadges.add("🛡️ Safe and Sorted");
        }

        if (future.happiness >= 80) {
            earnedBadges.add("❤️ Living the Dream");
        }

    });

    if (earnedBadges.size === 0) {
        badgesContainer.innerHTML =
            `<div class="badge-box">🌱 Future Explorer</div>`;
        return;
    }

    badgesContainer.innerHTML =
        [...earnedBadges]
            .map(badge => `<div class="badge-box">${badge}</div>`)
            .join("");
}

calculateBadges();

// 5. Dark Mode Controller
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