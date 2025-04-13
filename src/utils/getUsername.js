//Coletar info pra saber se é a primeira vez ou não entrando no site
  function isTheFirstTime() {
    const firstAccess = localStorage.getItem('first-time-access');
    if (!firstAccess) {
      const username = window.prompt("Insira seu nome: ");
      if (username) {
        localStorage.setItem('first-time-access', 'true');
        localStorage.setItem('username', username);
      } else { return; }
    }
  }

  export default isTheFirstTime;