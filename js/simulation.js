//  Setup
let currentStep = 'college'; 
const stats = JSON.parse(localStorage.getItem('currentSimStats')) || {
    career: 'Software Engineer', skill: 50, finance: 50, growth: 50, happiness: 50
};

// Variables 
stats.risk = 30; // Base starting risk
stats.stability = 70; // Base starting stability
stats.journey = []; // Array to track user decisions for the timeline view

//  Grab HTML elements
const stepTitle = document.getElementById('step-title');
const stepDescription = document.getElementById('step-description');
const optionsContainer = document.getElementById('options-container');
const progressBarText = document.getElementById('current-stage-text');
const outcomeScreen = document.getElementById('outcome-screen');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

//  Advanced Choices Data Definition
const stageData = {
    college: [
        { title: 'DSA Master', text: '📚 Focus on DSA', desc: 'Master coding patterns.', stats: { skill: 25, finance: 15, growth: 10, happiness: -10, risk: -5, stability: 15 } },
        { title: 'Project Builder', text: '🛠️ Build Personal Projects', desc: 'Make full-stack apps.', stats: { skill: 20, finance: 10, growth: 15, happiness: 15, risk: 10, stability: -5 } },
        { title: 'Hackathon Competitor', text: '🏆 Compete in Hackathons', desc: 'Build under pressure.', stats: { skill: 15, finance: 5, growth: 25, happiness: 20, risk: 15, stability: -10 } },
        { title: 'Academic Researcher', text: '🔬 Join a Research Lab', desc: 'Write academic papers.', stats: { skill: 30, finance: -5, growth: 20, happiness: 5, risk: 5, stability: 5 } }
    ],
    internship: [
        { title: 'Fast Startup', text: '🚀 Fast-paced Startup', desc: 'High equity, massive work.', stats: { skill: 25, finance: 10, growth: 25, happiness: -5, risk: 25, stability: -20 } },
        { title: 'Corporate MNC', text: '🏢 Big MNC Corporation', desc: 'Stable hours, solid salary.', stats: { skill: 10, finance: 25, growth: 10, happiness: 10, risk: -15, stability: 25 } },
        { title: 'Research Intern', text: '🧪 University Lab', desc: 'Deep research focus.', stats: { skill: 20, finance: 5, growth: 15, happiness: 15, risk: 0, stability: 10 } }
    ]
};

const specializations = {
    'AI/ML Engineer': [
        { title: 'Computer Vision', text: '👁️ Computer Vision', desc: 'Process image data.', stats: { skill: 15, finance: 20, risk: 5, stability: 5 } },
        { title: 'Generative AI & NLP', text: '💬 NLP & Text Modeling', desc: 'Work with LLMs.', stats: { skill: 20, finance: 25, risk: 15, stability: -5 } }
    ],
    'Software Engineer': [
        { title: 'Cloud Architecture', text: '🌐 Cloud Architecture', desc: 'Scale backends on AWS.', stats: { skill: 15, finance: 20, risk: 5, stability: 10 } },
        { title: 'Mobile Dev', text: '📱 Mobile Development', desc: 'Build iOS and Android apps.', stats: { skill: 10, finance: 15, risk: 5, stability: 5 } }
    ],
    'Cybersecurity Engineer': [
        { title: 'Ethical Hacking', text: '🛡️ Ethical Hacking', desc: 'Penetration testing loops.', stats: { skill: 20, finance: 15, risk: 10, stability: 5 } },
        { title: 'Security Audit', text: '📊 Security Auditing', desc: 'Enterprise risk tracking.', stats: { skill: 10, finance: 20, risk: -5, stability: 15 } }
    ],
    'Data Scientist': [
        { title: 'Predictive Analytics', text: '📉 Predictive Analytics', desc: 'Business forecast models.', stats: { skill: 15, finance: 15, risk: 0, stability: 10 } },
        { title: 'Data Viz Systems', text: '📊 Data Visualization', desc: 'Turn raw inputs into dashboards.', stats: { skill: 10, finance: 10, risk: -5, stability: 10 } }
    ]
};

// End-Report Profiles Data
const careerProfiles = {
    'AI/ML Engineer': { title: 'Senior Machine Learning Architect', location: 'Bangalore (Tech Hub)', salary: '20–35 LPA', skills: 'Python, PyTorch, LLMs, Deep Learning', style: 'Hybrid / Flexible', outlook: 'Excellent (High Growth Demand)' },
    'Software Engineer': { title: 'Lead Full-Stack Cloud Engineer', location: 'Hyderabad / Remote', salary: '15–28 LPA', skills: 'System Design, AWS, Node.js, React', style: 'Fully Remote or Hybrid', outlook: 'Very High (Stable Industry Backbone)' },
    'Cybersecurity Engineer': { title: 'Principal Security & DevSecOps Engineer', location: 'Pune / Mumbai', salary: '18–32 LPA', skills: 'Penetration Testing, IAM, Network Shielding, CI/CD', style: 'On-site / Secure Room', outlook: 'Critical Demand (High Salary Growth)' },
    'Data Scientist': { title: 'Principal Data Insights Scientist', location: 'Delhi NCR / Bangalore', salary: '16–30 LPA', skills: 'R, SQL, Predictive Math, Tableau', style: 'Hybrid / Corporate', outlook: 'Strong Growth (Data-Driven Era)' }
};

function renderStage() {
    optionsContainer.innerHTML = '';
    let currentOptions = [];

    if (currentStep === 'college') {
        progressBarText.innerText = 'College Phase';
        stepTitle.innerText = 'What do you focus on in college?';
        currentOptions = stageData.college;
    } else if (currentStep === 'internship') {
        progressBarText.innerText = 'Internship Phase';
        stepTitle.innerText = 'Where will you complete your internship?';
        currentOptions = stageData.internship;
    } else if (currentStep === 'specialization') {
        progressBarText.innerText = 'Specialization Phase';
        stepTitle.innerText = `Pick a specialty for your ${stats.career} path:`;
        currentOptions = specializations[stats.career] || specializations['Software Engineer'];
    }

    currentOptions.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${opt.text}</h3><p>${opt.desc}</p>`;
        card.onclick = () => handleChoice(opt.title, opt.stats);
        optionsContainer.appendChild(card);
    });
}

function handleChoice(chosenTitle, bonusStats) {
    // Save decision name into structural timeline array
    stats.journey.push(chosenTitle);

    for (let key in bonusStats) {
        if (stats[key] !== undefined) {
            stats[key] = Math.min(100, Math.max(0, stats[key] + bonusStats[key]));
        }
    }

    if (currentStep === 'college') {
        currentStep = 'internship';
        renderStage();
    } else if (currentStep === 'internship') {
        currentStep = 'specialization';
        renderStage();
    } else if (currentStep === 'specialization') {
        showResults();
    }
}

function showResults() {
    progressBarText.innerText = 'Final Outcome Report';
    stepTitle.classList.add('hidden');
    stepDescription.classList.add('hidden');
    optionsContainer.classList.add('hidden');
    
    // Fetch job description object profile
    const profile = careerProfiles[stats.career] || careerProfiles['Software Engineer'];
    stats.finalTitle = profile.title;

    // Rebuild outcome screen cleanly
    outcomeScreen.innerHTML = `
        <h3 style="color: var(--primary); font-size: 1.3rem; margin-top:0;">Simulation Complete!</h3>
        <h2 style="margin: 0.5rem 0; font-size: 1.8rem; color: var(--dark);">${profile.title}</h2>
        
        <div style="text-align: left; margin: 1rem 0; padding: 1.25rem; background: #f1f5f9; border-radius: 8px; font-size: 0.95rem; line-height: 1.6; color: #334155;">
            <p style="margin: 0.4rem 0;">📍 <strong>Location:</strong> ${profile.location}</p>
            <p style="margin: 0.4rem 0;">💵 <strong>Salary Range:</strong> ${profile.salary}</p>
            <p style="margin: 0.4rem 0;">🛠️ <strong>Core Skills:</strong> ${profile.skills}</p>
            <p style="margin: 0.4rem 0;">🏢 <strong>Work Style:</strong> ${profile.style}</p>
            <p style="margin: 0.4rem 0;">📈 <strong>Future Outlook:</strong> ${profile.outlook}</p>
        </div>

        <div style="text-align: left; margin: 1rem 0; padding: 1rem; background: #e2e8f0; border-radius: 8px; font-size: 0.9rem; display:grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div>🛠️ <strong>Skill Score:</strong> ${stats.skill}/100</div>
            <div>💰 <strong>Finance Score:</strong> ${stats.finance}/100</div>
            <div>⚡ <strong>Risk Score:</strong> ${stats.risk}/100</div>
            <div>🛡️ <strong>Stability Score:</strong> ${stats.stability}/100</div>
        </div>

        <button id="compare-btn" class="btn" style="width: 100%; margin-top: 0.5rem;">Go to Strategy Dashboard</button>
    `;

    outcomeScreen.classList.remove('hidden');

    let timelines = JSON.parse(localStorage.getItem('savedTimelines')) || [];

timelines.push(stats);

// Keep only the latest two simulations
if (timelines.length > 2) {
    timelines = timelines.slice(-2);
}
    localStorage.setItem('savedTimelines', JSON.stringify(timelines));

    document.getElementById('compare-btn').onclick = function() {
        window.location.href = 'comparison.html';
    };
}

renderStage();