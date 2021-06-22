const mainPage = (function () {
  const categories = [
    {
      id: 1,
      name: 'DOM'
    },
    {
      id: 2,
      name: 'THIS'
    },
    {
      id: 3,
      name: 'CLOUSER'
    },
    {
      id: 4,
      name: 'LET/CONST'
    },
    {
      id: 5,
      name: 'EVENT'
    }
  ];

  return {
    fetch() {
      document.body.className = 'main';
      document.body.innerHTML = `
        <section class="profile-container">
          <input type="checkbox" id="profile" class="a11y-hidden" />
          <label for="profile" class="btn profile">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </label>
          <section class="user">
            <h2 class="user__name">John</h2>
            <div class="user__status"></div>
          </section>
        </section>
        <section class="ocean">
          <div
            class="bubble"
            style="width: 20px; height: 25px; left: 54%; bottom: 70%"
          ></div>
          <div
            class="bubble"
            style="width: 30px; height: 30px; left: 29%; bottom: 63%"
          ></div>
          <div
            class="bubble"
            style="width: 24px; height: 24px; left: 14%; bottom: 30%"
          ></div>
          <div
            class="bubble"
            style="width: 35px; height: 35px; left: 79%; bottom: 56%"
          ></div>
        </section>
        <div class="boat">
          <div class="cabin"></div>
          <div class="top"></div>
          <div class="pole"></div>
        </div>
        <div class="land">
          <div class="tree">
            <div class="leaf"></div>
            <div class="leaf left"></div>
          </div>
        </div>
        <div class="sun">
          <div class="cloud"></div>
        </div>
        <div class="moon"></div>
        <div class="stars"></div>
        <div class="bird"></div>
        <div class="bird two"></div>
        <div class="bird three"></div>
        <input type="checkbox" id="checkbox" class="a11y-hidden" />
        <label for="checkbox" class="btn mode">NIGHT</label>
      `;
    },

    init() {
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

      // 2. renderCategories
      (function renderCategories() {
        const $fragment = document.createDocumentFragment();

        categories.forEach(({ name }, idx) => {
          const $category = document.createElement('div');

          $category.className = 'category';
          $category.setAttribute('role', 'button');
          $category.innerHTML = `
            <p class='category__name'>${name}</p>
          `;
          $category.style.setProperty('top', (idx + 1) * 600 + 'px');
          $category.style.setProperty('left', Math.random() * 50 + 20 + '%');
          $fragment.appendChild($category);
        });

        document.querySelector('.ocean').appendChild($fragment);
      })();

      // 3. bubble logic
      (function startBubbleMaking() {
        const $ocean = document.querySelector('.ocean');
        const numBubbles = 30;
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
              Math.random() * 20
            }%`
          );

          $ocean.appendChild($bubble);
        }

        // Start adding bubbles.
        function startBubbles() {
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
          timerId = setInterval(addBubble, 800);
        }

        startBubbles();
      })();

      // 4. addEventListeners
      (function bindEventListeners() {
        document.querySelector('.ocean').addEventListener('click', e => {
          if (!e.target.matches('.category, .category__name')) return;
          // gamePage.start();
        });
      })();
    },

    renderProblem() {
      this.fetch();
      this.init();
    }
  };
})();

// mainPage.renderProblem();

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
// backgroundModule.setOcean();

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
    backgroundModule.setOcean();
    $body.className = 'game';
  };

  const end = () => {
    renderResult();
  };

  const renderResult = () => {
    const $result = document.createElement('section');
    $result.className = 'result-container';
    $result.innerHTML = `
      <div class="overlay"></div>
      <div class="result">
        <div>John</div>
        <div>${userAnswers.filter(userAnswer => userAnswer.correct).length} / ${
      problems.length
    }
      </div>
      </div>
    `;
    $body.appendChild($result);
  };

  const renderProblem = () => {
    const getProblemByIdx = idx => {
      if (problems[idx].completed) return;
      currentProblemIdx = idx;
      renderProblem();
    };

    const next = currentIdx => {
      const nextIdx = currentIdx + 1;
      if (!problems[nextIdx]) {
        end();
        return;
      }
      getProblemByIdx(nextIdx);
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

    // const $problemLinks = (() => {
    //   const CLASS_PROBLEM_LINKS = 'problem-links';
    //   const $container = document.createElement('ol');
    //   $container.className = CLASS_PROBLEM_LINKS;
    //   $container.innerHTML = problems
    //     .map(
    //       (problem, idx) => `
    //       <li data-problem-idx=${idx}>
    //         <button ${problem.completed ? 'disabled' : ''}>
    //           ${problem.id}
    //         </button>
    //       </li>
    //     `
    //     )
    //     .join('');

    //   $container.addEventListener('click', e => {
    //     if (!e.target.matches(`ol.${CLASS_PROBLEM_LINKS} > li > button`)) {
    //       return;
    //     }
    //     getProblemByIdx(+e.target.parentNode.dataset.problemIdx);
    //   });
    //   return $container;
    // })();

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
    // $container.appendChild($problemLinks);
    $body.appendChild($container);

    // body innerHTML
    // $body.innerHTML += `
    //   <section class="problem">
    //     <form class="form">
    //       <fieldset>
    //         <legend>
    //           ${problems[currentProblemIdx].question}
    //         </legend>
    //         <div>
    //           ${problems[currentProblemIdx].sub}
    //         </div>
    //         ${$options}
    //         <button type="submit">
    //           제출
    //         </button>
    //       </fieldset>
    //     </form>
    //     ${$problemLinks}
    //   </section>
    // `;

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
      $container.classList.add('completed');
      // 복수 정답 로직
      // [...e.target.querySelectorAll('input[type=radio]:checked')]
      //   .filter($input => {
      //     console.log($input);
      //     $input.checked;
      //   })
      //   .forEach($input => {
      //     problems[+$input.dataset.problemId].completed = true;
      //   });

      next(currentProblemIdx);
    });
  };

  return {
    start() {
      init();
      renderProblem();
    },
    end() {}
  };
})();

gamePage.start();
