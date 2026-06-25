function selectCareer(careerName) {
    // Save the selected career path name
    localStorage.setItem('currentSelectedCareer', careerName);
    
    // Set the base
    const initialStats = {
        career: careerName,
        skill: 50,
        finance: 50,
        growth: 50,
        happiness: 50
    };
    localStorage.setItem('currentSimStats', JSON.stringify(initialStats));
    
    // Force the browser to go to the simulation screen immediately
    window.location.href = 'simulation.html';
}