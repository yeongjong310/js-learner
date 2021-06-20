const mainPage = (function () {
  return {
    fetch() {
      document.body.className = 'main';
      document.body.innerHTML = `
        <section class="stage">
        <h2 class="a11y-hidden">Game Stages</h2>
        <section class="stage__sky"></section>
        <div class="stage__boat">User Name</div>
        <section class="stage__sea">
          <div class="stage__sea-level"></div>
          <div class="stage__sea-level"></div>
          <div class="stage__sea-level"></div>
          <div class="stage__sea-level"></div>
          <div class="stage__sea-level"></div>
          <div class="stage__sea-level"></div>
        </section>
      </section>
      <section class="user">
        <h2 class="a11y-hidden">User Information</h2>
        <section class="user__game-mode">
          <h3 class="title user__title">Game Mode</h3>
          <section class="user__btn-group">
            <div class="btn" role="button">EASY</div>
            <div class="btn" role="button">NORMAL</div>
            <div class="btn" role="button">HARD</div>
          </section>
        </section>
      </section>
      `;
    },

    render() {
      this.fetch();

      const $stages = document.querySelectorAll('.stage__sea-level');
      $stages.forEach(($stage, idx) => {
        $stage.style.top = idx * 300 + 100 + 'px';
        $stage.style.left = (idx % 2 ? 65 : 35) + '%';
      });
    },
  };
})();

mainPage.render();
