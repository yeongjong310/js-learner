const mainPage = (function () {
  return {
    fetch() {
      document.body.className = 'main';
      // document.body.innerHTML = `

      // `;
    },
    init() {
      this.fetch();

      const gameModeBtn = document.querySelector('#checkbox');
      const modeBtn = document.querySelector('.mode');
      const birds = document.querySelectorAll('.bird');
      const sun = document.querySelector('.sun');
      const moon = document.querySelector('.moon');
      const boat = document.querySelector('.boat');
      const stars = document.querySelector('.stars');

      // 1. toggle mode
      gameModeBtn.addEventListener('click', () => {
        if (!gameModeBtn.checked) {
          // EASY MODE
          document.body.classList.remove('night');
          modeBtn.textContent = 'HARD';
          sun.classList.remove('night');
          moon.classList.remove('night');
          stars.classList.remove('night');
          boat.classList.remove('night');
          birds.forEach(bird => bird.classList.remove('night'));

          return;
        }
        // HARD MODE
        document.body.classList.add('night');
        modeBtn.textContent = 'EASY';
        birds.forEach(bird => bird.classList.add('night'));
        sun.classList.add('night');
        moon.classList.add('night');
        stars.classList.add('night');
        boat.classList.add('night');
      });

      // 2. bubble logic
      const $ocean = document.querySelector('.ocean');
      const numBubbles = 50;
      const minSize = 20;
      const maxSize = 40;

      // Get the size of a bubble.
      // Randomized between minSize and maxSize.
      function bubbleSize() {
        return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      }

      // Get the location of a bubble.
      // Between left=2% and left=98%.
      function bubbleLocation() {
        return Math.floor(Math.random() * 96) + 2;
      }

      // Create a bubble using the previous two functions.
      function createBubble() {
        const size = bubbleSize();
        const location = bubbleLocation();
        const $bubble = document.createElement('div');

        $bubble.classList.add('bubble');
        $bubble.setAttribute(
          'style',
          `width: ${size}px; height: ${size}px; left: ${location}%; bottom: ${
            Math.random() * 30
          }%`
        );

        $ocean.appendChild($bubble);
      }

      // Start adding bubbles.
      (function startBubbles() {
        let i = 0;
        let timerId;

        function addBubble() {
          if (i < numBubbles) {
            createBubble();
            i++;
            return;
          }

          clearInterval(timerId);
        }

        // Add a bubble every 500ms.
        timerId = setInterval(addBubble, 500);
      })();
    },

    render() {}
  };
})();

mainPage.init();
