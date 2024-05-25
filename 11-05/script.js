(() => {
    /*
      timesVisited: {
        count: number,
        lastVisited: Date
      }
    */
  
    let timesVisited = localStorage.getItem('timesVisited');
  
    if (!timesVisited) {
      timesVisited = {
        count: 0,
        lastVisited: null,
      };
    } else {
      timesVisited = JSON.parse(timesVisited);
    }
  
    timesVisited.count++;
    timesVisited.lastVisited = new Intl.DateTimeFormat('pt-BR').format(
      new Date()
    );
  
    localStorage.setItem('timesVisited', JSON.stringify(timesVisited));
  
    const timesVisitedFooter = document.getElementById('times-visited');
  
    timesVisitedFooter.textContent = `Esta página foi visitada ${timesVisited.count} vezes. A última visita foi: ${timesVisited.lastVisited}`;
  })();
  