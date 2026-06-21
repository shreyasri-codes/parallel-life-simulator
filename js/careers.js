function selectCareer(careerName) {
    // 1. Save the selected career path name
    localStorage.setItem('currentSelectedCareer', careerName);
    
    // 2. Set the starting base stats for this specific simulation run
    const initialStats = {
        career: careerName,
        skill: 50,
        finance: 50,
        growth: 50,
        happiness: 50
    };
    localStorage.setItem('currentSimStats', JSON.stringify(initialStats));
    
    // 3. FORCE the browser to go to the simulation screen immediately
    window.location.href = 'simulation.html';
}