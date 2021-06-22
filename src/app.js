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

mainPage.render();

const backgroundModule = (() => {
  const $body = document.querySelector('body');
  const setOcean = () => {
    const $ocean = document.createElement('div');
    $ocean.classList.add('ocean');
    $ocean.innerHTML = `
      <div class="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="fish">
        <!-- eyes -->
        <span></span>
        <span></span>
        <!-- mouth -->
        <span></span>
        <!-- bubbles -->
        <span></span>
        <span></span>
        <span></span>
      </div>
      `;
    $body.appendChild($ocean);
  };
  return {
    setOcean
  };
})();

const gamePage = (function () {
  // data
  const PROBLEM_TYPES = {
    MULTIPLE_SINGLE: 0,
    MULTIPLE_MULTIPLE: 1,
    OX: 2,
    SHORT: 3
  };

  const PROBLEMS = [
    {
      id: 1,
      type: PROBLEM_TYPES.MULTIPLE_SINGLE,
      question:
        '하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 의미하는 것은 다음 중 무엇인가?',
      sub: '',
      options: [
        { id: 1, content: '표현식' },
        { id: 2, content: '변수' },
        { id: 3, content: '객체' },
        { id: 4, content: '스코프' }
      ]
    },
    {
      id: 2,
      type: PROBLEM_TYPES.OX,
      question: '자바스크립트에서는 함수도 값이다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 3,
      type: PROBLEM_TYPES.MULTIPLE_SINGLE,
      question: '자바스크립트에서 다음 중 객체 타입이 아닌 것을 고르시오.',
      sub: '',
      options: [
        { id: 1, content: '배열' },
        { id: 2, content: '객체' },
        { id: 3, content: '함수' },
        { id: 4, content: '심벌' }
      ]
    },
    {
      id: 4,
      type: PROBLEM_TYPES.SHORT,
      question: '다음은 어떤 결과를 반환할까요?',
      sub: '[1, 2, 3, 4].reduce((acc, cur) => acc + cur ** 2, 1);',
      options: []
    }
  ];

  const ANSWERS = [
    {
      problemId: 1,
      answers: ['2']
    },
    {
      problemId: 2,
      answers: ['1']
    },
    {
      problemId: 3,
      answers: ['4']
    },
    {
      problemId: 4,
      answers: ['31']
    }
  ];

  // elements
  const $body = document.body;

  // states
  let currentProblemIdx = 0;
  let userAnswers = [];
  const problems = [...PROBLEMS].map(problem => ({
    ...problem,
    completed: false
  }));

  // game initial settings
  const init = () => {
    $body.className = 'game';
    backgroundModule.setOcean();
  };

  const render = () => {
    const getProblemByIdx = idx => {
      if (!problems[idx] || problems[idx].completed) return;
      currentProblemIdx = idx;
      render();
    };

    // $body.innerHTML = '';

    const $options = (() => {
      const { type, options } = problems[currentProblemIdx];

      switch (type) {
        case PROBLEM_TYPES.MULTIPLE_SINGLE:
          return options
            .map(
              ({ id, content }) => `
              <input
                type="radio"
                id=question${currentProblemIdx + 1}-option${id}
                data-problem-id=${currentProblemIdx}
                data-option-id=${id}
                name="option"
              />
              <label for=question${currentProblemIdx + 1}-option${id}>
                ${content}
              </label>
            `
            )
            .join('');
        case PROBLEM_TYPES.MULTIPLE_MULTIPLE:
          return options
            .map(
              ({ id, content }) => `
              <input
                type="checkbox"
                id=question${currentProblemIdx + 1}-option${id}
                data-problem-id=${currentProblemIdx}
                data-option-id=${id}
                name="option"
              />
              <label for=question${currentProblemIdx + 1}-option${id}>
                ${content}
              </label>
            `
            )
            .join('');
        case PROBLEM_TYPES.OX:
          return options
            .map(
              ({ id, content }) => `
              <input
                type="radio"
                id=question${currentProblemIdx + 1}-option${id}
                data-problem-id=${currentProblemIdx}
                data-option-id=${id}
                name="option"
              />
              <label for=question${currentProblemIdx + 1}-option${id}>
                ${content}
              </label>
            `
            )
            .join('');
        case PROBLEM_TYPES.SHORT:
          return `
            <input
              type="text"
              placeholder="답을 입력하세요"
              id=question${currentProblemIdx + 1}
              data-problem-id=${currentProblemIdx}
            />
          `;
        default:
          return '';
      }
    })();

    const $problemLinks = (() => {
      const CLASS_PROBLEM_LINKS = 'problem-links';
      const $container = document.createElement('ol');
      $container.className = CLASS_PROBLEM_LINKS;
      $container.innerHTML = problems
        .map(
          (problem, idx) => `
          <li data-problem-idx=${idx}>
            <button ${problem.completed ? 'disabled' : ''}>
              ${problem.id}
            </button>
          </li>
        `
        )
        .join('');

      $container.addEventListener('click', e => {
        if (!e.target.matches(`ol.${CLASS_PROBLEM_LINKS} > li > button`)) {
          return;
        }
        getProblemByIdx(+e.target.parentNode.dataset.problemIdx);
      });
      return $container;
    })();

    const $container = document.createElement('section');
    $container.className = 'problem';
    const $form = document.createElement('form');
    $form.className = 'form';
    $form.innerHTML = `
      <fieldset>
        <legend>
          ${problems[currentProblemIdx].question}
        </legend>
        <div>
          ${problems[currentProblemIdx].sub}
        </div>
        ${$options}
        <button type="submit">
          제출
        </button>
      </fieldset>
    `;
    $container.appendChild($form);
    $container.appendChild($problemLinks);
    $body.appendChild($container);

    $form.addEventListener('submit', e => {
      e.preventDefault();

      const isShort = problems[currentProblemIdx].type === PROBLEM_TYPES.SHORT;
      const $input = e.target.querySelector(
        isShort ? 'input[type=text]' : 'input[type=radio]:checked'
      );
      userAnswers = [
        ...userAnswers,
        {
          problemId: +$input.dataset.problemId,
          answer: [isShort ? $input.value : $input.dataset.optionId]
        }
      ];
      problems[+$input.dataset.problemId].completed = true;
      // 복수 정답 로직
      // [...e.target.querySelectorAll('input[type=radio]:checked')]
      //   .filter($input => {
      //     console.log($input);
      //     $input.checked;
      //   })
      //   .forEach($input => {
      //     problems[+$input.dataset.problemId].completed = true;
      //   });

      getProblemByIdx(++currentProblemIdx);
    });
  };

  return {
    start() {
      init();
      render();
    },
    end() {}
  };
})();

gamePage.start();
