const mainPage = (function () {
  return {
    fetch() {
      document.body.className = 'main';
      document.body.innerHTML = `
        <h1 class="a11y-hidden">JS Driver: JS Learning Game</h1>
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
    }
  };
})();

mainPage.render();

const gamePage = (function () {
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

  let currentProblemIdx = 0;
  const problems = [...PROBLEMS].map(problem => ({
    ...problem,
    completed: false
  }));
  let userAnswers = [];

  const $body = document.querySelector('body');
  $body.className = 'game';

  const render = () => {
    const goTo = idx => {
      if (!problems[idx] || problems[idx].completed) return;
      currentProblemIdx = idx;
      render();
    };

    $body.innerHTML = '';

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
        goTo(+e.target.parentNode.dataset.problemIdx);
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
      console.log(problems);
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

      goTo(++currentProblemIdx);
    });
  };

  return {
    start() {
      render();
    },
    end() {}
  };
})();

gamePage.start();
