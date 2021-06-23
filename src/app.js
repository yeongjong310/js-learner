let user = {
  name: 'GUEST',
  solved: 73,
  correct: 49,
  stageCleared: new Set()
};

const mainPage = (function () {
  let mode = 'EASY';
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

  const setUser = _user => {
    user = _user;
    document.querySelector('.user__name').textContent = user.name;
    localStorage.setItem('userName', user.name);
  };

  const getUserSession = () => localStorage.getItem('userName');
  const getCorrectRate = () => Math.floor((user.correct / user.solved) * 100);
  const getStageClearRate = () =>
    Math.floor((user.stageCleared.size / categories.length) * 100);

  const fetch = () => {
    document.body.style.setProperty(
      'overflow-y',
      getUserSession() ? 'scroll' : 'hidden'
    );
    document.body.className = 'main';
    document.body.innerHTML = `
    <section class="profile-container">
    <div role="button" class="btn profile">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
    <section class="user">
      <h2 class="user__name">${user.name}</h2>
      <div class="user__status">
        <section class="user__status-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="user__status-svg" viewBox="-1 -1 34 34">
            <circle
              cx="16"
              cy="16"
              r="15.923566879"
              class="progress-bar__background"
            />

            <circle
              cx="16"
              cy="16"
              r="15.923566879"
              class="progress-bar__progress js-progress-bar"
            />
          </svg>
          <div class="user__status-content">
            <p class="progress-title">STAGE</p>
            <span class="progress-rate">${getStageClearRate()}%</span>
          </div>
        </section>
        <section class="user__status-circle">
          <svg viewBox="-1 -1 34 34">
            <circle
              cx="16"
              cy="16"
              r="15.923566879"
              class="progress-bar__background"
            />

            <circle
              cx="16"
              cy="16"
              r="15.923566879"
              class="progress-bar__progress js-progress-bar"
            />
          </svg>
          <div class="user__status-content">
            <p class="progress-title">CORRECT</p>
            <span class="progress-rate">${getCorrectRate()}%</span>
          </div>
        </section>
      </div>
      <div class="user__more-btn" role="button">MORE</div>
    </section>
    <section class="user__more-info">
      <p class="user__more-title">JS DIVER Version 2</p>
      <p class="user__more-content">Coming Soon ...</p>
    </section>
  </section>
  <section class="ocean">
    <div
      class="bubble bubble-rising"
      style="width: 20px; height: 25px; left: 54%; bottom: 70%"
    ></div>
    <div
      class="bubble bubble-rising"
      style="width: 30px; height: 30px; left: 29%; bottom: 63%"
    ></div>
    <div
      class="bubble bubble-rising"
      style="width: 24px; height: 24px; left: 14%; bottom: 30%"
    ></div>
    <div
      class="bubble bubble-rising"
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
  <div class="scroll-del-wrapper">
  <div class="btn mode scroll-del" role="button">EASY MODE</div>
  <div class="arrow arrow-left scroll-del"></div>
  <div class="arrow arrow-right scroll-del"></div>
  <div class="scroll-up">GO DIVE !</div>
  </div>
  ${
    !getUserSession()
      ? `<div class="overlay">
    <section class="login">
      <div class="login-logo">
        <div class="sea">
          <div class="circle-wrapper">
            <div class="bubble"></div>
            <div class="submarine-wrapper">
              <div class="submarine-body">
                <div class="window"></div>
                <div class="engine"></div>
                <div class="light"></div>
              </div>
              <div class="helix"></div>
              <div class="hat">
                <div class="leds-wrapper">
                  <div class="periscope"></div>
                  <div class="leds"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form action="#" method="GET" class="login-form">
          <label for="userName" class="login-label">LOGIN DIVER !</label>
          <input
            type="text"
            name="userName"
            id="userName"
            class="login-input"
            maxlength="15"
          />
          <button type="submit" class="login-btn">GO DIVE</button>
        </form>
      </div>
    </section>
  </div>`
      : ''
  }
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const throttle = (callback, delay) => {
    let timerId = null;

    return e => {
      if (timerId) return;
      callback(e);
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    };
  };

  return {
    init() {
      fetch();

      // 1. renderCategories
      (function renderCategories() {
        const $fragment = document.createDocumentFragment();

        categories.forEach(({ name }, idx) => {
          const $category = document.createElement('div');

          $category.className = 'category';
          $category.setAttribute('role', 'button');
          $category.innerHTML = `
            <p class='category__name'>${name}</p>
          `;
          $category.style.setProperty('top', (idx + 1) * 500 + 100 + 'px');
          $category.style.setProperty('left', Math.random() * 50 + 20 + '%');
          $fragment.appendChild($category);
        });
        // $fragment.append($shark);

        document.querySelector('.ocean').appendChild($fragment);
      })();

      // 2. bubble logic
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

          $bubble.classList.add('bubble', 'bubble-rising');
          $bubble.setAttribute(
            'style',
            `width: ${size}px; height: ${size}px; left: ${location}%; bottom: ${
              Math.random() * 20
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

          // Add a bubble every 1s.
          timerId = setInterval(addBubble, 1000);
        })();
      })();

      // 3. addEventListeners
      (function bindEventListeners() {
        (function modeToggleBtn() {
          const modeBtn = document.querySelector('.mode');
          const birds = document.querySelectorAll('.bird');
          const sun = document.querySelector('.sun');
          const moon = document.querySelector('.moon');
          const boat = document.querySelector('.boat');
          const stars = document.querySelector('.stars');

          modeBtn.addEventListener(
            'click',
            throttle(() => {
              if (mode === 'HARD') {
                // HARD MODE
                mode = 'EASY';
                document.body.classList.remove('night');
                modeBtn.textContent = 'EASY MODE';
                sun.classList.remove('night');
                moon.classList.remove('night');
                stars.classList.remove('night');
                boat.classList.remove('night');
                birds.forEach(bird => bird.classList.remove('night'));

                return;
              }
              // EASY MODE
              mode = 'HARD';
              document.body.classList.add('night');
              modeBtn.textContent = 'HARD MODE';
              birds.forEach(bird => bird.classList.add('night'));
              sun.classList.add('night');
              moon.classList.add('night');
              stars.classList.add('night');
              boat.classList.add('night');
            }, 500)
          );
        })();

        document.querySelector('.ocean').addEventListener('click', e => {
          if (!e.target.matches('.category, .category__name')) return;
          gamePage.start(mode);
        });

        window.addEventListener(
          'scroll',
          throttle(() => {
            const currentY = window.scrollY;

            document.querySelectorAll('.scroll-del').forEach(e => {
              e.classList.toggle('disable', currentY > 200);
            });
            document
              .querySelector('.scroll-up')
              .classList.toggle('able', currentY > 200);
          }, 50)
        );

        document.querySelector('.profile').addEventListener(
          'click',
          throttle(e => {
            const $progressBars = document.querySelectorAll('.js-progress-bar');
            const percentageCompletes = [getStageClearRate(), getCorrectRate()];

            [...$progressBars].forEach(($bar, idx) => {
              $bar.style.setProperty(
                'stroke-dashoffset',
                100 -
                  (!e.target
                    .closest('.profile-container')
                    .classList.contains('active')
                    ? percentageCompletes[idx]
                    : 0)
              );
            });

            e.target.closest('.profile-container').classList.toggle('active');
          }, 700)
        );

        document.querySelector('.user__more-btn').addEventListener(
          'click',
          throttle(() => {
            const $toast = document.querySelector('.user__more-info');

            $toast.classList.add('active');
            setTimeout(() => {
              $toast.classList.remove('active');
            }, 2000);
          }, 3000)
        );

        if (getUserSession()) {
          setUser({ ...user, name: localStorage.getItem('userName') });
          return;
        }

        (function login() {
          document.querySelector('.overlay').addEventListener('submit', e => {
            e.preventDefault();
            const userName = document
              .querySelector('.login-input')
              .value.trim();

            if (!userName) return;
            setUser({ ...user, name: userName });
            document.querySelector('.overlay').remove();

            (function greeting() {
              const $greeting = document.createElement('h2');
              $greeting.className = 'greeting';
              $greeting.textContent = `Let's Dive ${user.name} !`;
              document.body.append($greeting);
              document.body.style.setProperty('overflow-y', 'scroll');

              setTimeout(() => {
                $greeting.remove();
              }, 1500);
            })();
          });
        })();
      })();
    },

    render() {
      this.init();
    }
  };
})();

mainPage.render();

// yj

// 게임 유틸즈
const gameUtils = (() => {
  let timerId;
  let _oxygen;

  const initializeState = () => {
    clearInterval(timerId);
    _oxygen = 100;
  };

  const renderGameBackground = () => {
    initializeState();
    document.body.innerHTML = `
      <section class="ocean">
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
        </div>
        <div class="shark">
          <!-- eyes -->
          <span></span>
          <span></span>
          <!-- mouth -->
          <span></span>
        </div>
        <div class="fishes">
          <div class="fish1"></div>
          <div class="fish2"></div>
          <div class="fish3"></div>
          <div class="fish4"></div>
        </div>
        <aside class="oxygen-tank">
          <div class="oxygen"></div>
        </aside>
      </section>
      <div class="overlay">
        <div class="loading">
          <svg class="spinner" width="100" height="100">
            <circle cx="50" cy="50" r="40"
            stroke="rgba(100, 100, 100, 0.4)"
            stroke-width="10"
            fill='rgba(0, 0, 0, 0)' />
            <circle cx="50" cy="50" r="40"
            stroke="rgb(25, 132, 219)" stroke-width="10"
            stroke-dasharray="314" stroke-dashoffset="270"
            stroke-linecap="round" fill='rgba(0,0,0,0)' />
          <div class="loading__text">LOADING</div>
        </div>
      </div>
      `;
    const timer = setInterval(() => {
      const $loadingText = document.querySelector('.loading__text');
      $loadingText.textContent =
        $loadingText.textContent.length >= 12
          ? 'LOADING'
          : $loadingText.textContent + ' .';
    }, 250);

    setTimeout(() => {
      clearInterval(timer);
    }, 2000);
  };

  const oxygenTank = (() => {
    let _inhaleAmount;

    const minusOxygen = () => {
      _oxygen -= 5;
    };

    const init = (inhaleAmount, callback) => {
      _inhaleAmount = inhaleAmount;

      timerId = setInterval(() => {
        _oxygen -= _inhaleAmount;

        document
          .querySelector('.oxygen-tank')
          .style.setProperty('--amount', _oxygen);

        if (_oxygen <= 0) {
          clearInterval(timerId);
          callback(); // 게임 종료 콜백
          document.querySelector('.ocean').classList.remove('active');
        } else if (_oxygen <= 30) {
          document.querySelector('.ocean').classList.add('active');
        }
      }, 100);
    };
    return {
      init,
      minusOxygen
    };
  })();
  return {
    renderGameBackground,
    oxygenTank
  };
})();

// document.body.classList.add('game');
// gameUtils.renderGameBackground();
// gameUtils.oxygenTank.init(0);

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
    },
    {
      id: 5,
      type: PROBLEM_TYPES.MULTIPLE_MULTIPLE,
      question: '다음 중 옳은 것을 모두 고르시오',
      sub: '',
      options: [
        {
          id: 1,
          content: '클로저는 해당 함수와 그 함수의 렉시컬 환경의 조합이다.'
        },
        {
          id: 2,
          content: 'JS에서는 함수도 값이다.'
        },
        {
          id: 3,
          content: 'JS의 배열은 기본적으로 희소배열이 아니다.'
        },
        {
          id: 4,
          content: '브라우저는 싱글 스레드다.'
        }
      ]
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
    },
    {
      problemId: 5,
      answers: ['1', '2']
    }
  ];

  // elements
  const $body = document.body;

  // states
  let currentProblemIdx;
  let problems;
  let gameEnd;
  let mode;

  // initialize states
  const initializeStates = () => {
    currentProblemIdx = 0;
    problems = [...PROBLEMS].map(problem => ({
      ...problem,
      completed: false,
      correct: false
    }));
    gameEnd = false;
  };

  // append problem section to $body
  const appendProblem = () => {
    const SVG_CHARACTER_SRC = './src/img/jelly-fish.svg';

    const {
      id: problemId,
      type: problemType,
      question,
      sub,
      options
    } = problems[currentProblemIdx];

    const $defaultProblemsSection = $body.querySelector('.problems');

    const $sectionProblem = document.createElement('section');
    $sectionProblem.className = 'problem';
    const $innerForm = document.createElement('form');
    $innerForm.className = 'form';
    $innerForm.setAttribute('data-problem-id', problemId);
    $innerForm.setAttribute('data-problem-type', problemType);

    if (problemType === PROBLEM_TYPES.MULTIPLE_SINGLE) {
      $innerForm.innerHTML = `
        <fieldset>
          <legend>
            ${question}
          </legend>
          <div>
            ${sub}
          </div>
          <section class="form__selections">
            ${options
              .map(
                ({ id: optionId, content }, idx) => `
              <div class="form__selection ${
                idx % 2 === 0 ? 'fly-slightly' : ''
              }">
                <img width="100" class="jelly-fish" src="${SVG_CHARACTER_SRC}"/>
                <input
                  type='radio'
                  id=question${problemId}-option${optionId}
                  data-option-id=${optionId}
                  name='option'
                  class="a11y-hidden"
                />
                <label
                  for=question${problemId}-option${optionId}
                >
                  ${content}
                </label>
              </div>
            `
              )
              .join('')}
            </section>
            <button class="btn next" type='submit'>SKIP</button>
        </fielset>
      `;
    }
    if (problemType === PROBLEM_TYPES.MULTIPLE_MULTIPLE) {
      $innerForm.innerHTML = `
        <fieldset>
          <legend>
            ${question}
          </legend>
          <div>
            ${sub}
          </div>
          <section class="form__selections">
          ${options
            .map(
              ({ id: optionId, content }, idx) => `
              <div class="form__selection ${
                idx % 2 === 0 ? 'fly-slightly' : ''
              }">
                <img width="100" class="jelly-fish" src="${SVG_CHARACTER_SRC}" />
                <input
                  type='checkbox'
                  id=question${problemId}-option${optionId}
                  data-option-id=${optionId}
                  name='option'
                  class="a11y-hidden"
                />
                <label
                  for=question${problemId}-option${optionId}
                >
                  ${content}
                </label>
              </div>
          `
            )
            .join('')}
            </section>
            <button class="btn next" type='submit'>SKIP</button>
        </fielset>
      `;
    }
    if (problemType === PROBLEM_TYPES.OX) {
      $innerForm.innerHTML = `
        <fieldset>
          <legend>
            ${question}
          </legend>
          <div>
            ${sub}
          </div>
          <section class="form__selections">
            ${options
              .map(
                ({ id: optionId, content }) => `
              <div class="form__selection">
                <img width="100" class="jelly-fish" src="${SVG_CHARACTER_SRC}" />
                <input
                  type='radio'
                  id=question${problemId}-option${optionId}
                  data-option-id=${optionId}
                  name='option'
                  class="a11y-hidden"
                />
                <label
                  for=question${problemId}-option${optionId}
                >
                  ${content}
                </label>
              </div>
            `
              )
              .join('')}
          </section>
          <button class="btn next" type='submit'>SKIP</button>
        </fielset>
      `;
    }
    if (problemType === PROBLEM_TYPES.SHORT) {
      $innerForm.innerHTML = `
        <fieldset>
          <legend>
            ${question}
          </legend>
          <div class="sub">
            ${sub}
          </div>
          <section class="form__selections">
            <div class="input__answer">
              <img width='100' src='${SVG_CHARACTER_SRC}' />
              <input
                type="text"
                placeholder="답을 입력하세요"
                id=question${problemId}
                class='input__short-type'
              />
            </div>
          </section>
          <button class="btn next" type='submit'>SKIP</button>
        </fielset>
      `;
    }

    $sectionProblem.appendChild($innerForm);
    $defaultProblemsSection.appendChild($sectionProblem);
    registerFormEvent($innerForm);
  };

  // append problem control
  // const appendControl = () => {
  //   const $sectionControl = document.createElement('section');
  //   $sectionControl.className = 'problem-control';
  //   const $nextBtn = document.createElement('button');
  //   // const $prevBtn = document.createElement('button');

  //   $nextBtn.className = 'next';
  //   $nextBtn.textContent = '>>';
  //   // $prevBtn.className = 'prev';
  //   // $prevBtn.textContent = '<<';

  //   // $prevBtn.addEventListener('click', moveProblem.prev);
  //   $nextBtn.addEventListener('click', moveProblem.next);

  //   $sectionControl.appendChild($nextBtn);
  //   // $sectionControl.appendChild($prevBtn);

  //   $body.appendChild($sectionControl);
  // };

  // load game
  const loadGame = () => {
    let count = 1;
    const timerId = setInterval(() => {
      if (count === 0) {
        clearInterval(timerId);
        $body.querySelector('.overlay').remove();
        getReady();
        return;
      }
      count--;
    }, 1000);
  };

  // initial game setting
  const initializeGame = _mode => {
    mode = _mode;
    $body.className = 'game';
    gameUtils.renderGameBackground();
    initializeStates();
    const $defaultProblemsSection = document.createElement('section');
    $defaultProblemsSection.className = 'problems';
    $body.appendChild($defaultProblemsSection);
    loadGame();
  };

  // show result
  const showResult = () => {
    if (gameEnd) return;

    gameEnd = true;
    const correctProblemCnt = problems.filter(
      problem => problem.correct
    ).length;
    const totalProblemLength = problems.length;
    const $resultSection = document.createElement('section');
    $resultSection.className = 'results';
    $resultSection.innerHTML = `
        <div class="overlay progress"></div>
        <div class="result">
          <div class="user-name">
            <span>&#127881;</span>
            Great! ${user.name}
            <span>&#127881;</span>
          </div>
          <div class="user-score">${correctProblemCnt} / ${totalProblemLength}</div>
          <button class="close">HOME</button>
        </div>
      `;

    $body.appendChild($resultSection);
    $resultSection.querySelector('.close').addEventListener('click', () => {
      mainPage.render();
    });
  };

  const startGame = () => {
    appendProblem();
    gameUtils.oxygenTank.init(mode === 'HARD' ? 5 : 0.2, showResult);
  };

  // getReady game
  const getReady = () => {
    let count = 3;
    const $defaultProblemsSection = $body.querySelector('.problems');
    const $countdownDiv = document.createElement('div');
    $countdownDiv.className = 'countdown';
    $defaultProblemsSection.appendChild($countdownDiv);

    const timerId = setInterval(() => {
      if (count === -1) {
        clearInterval(timerId);
        $countdownDiv.remove();
        startGame();
        return;
      }
      $countdownDiv.textContent = count === 0 ? 'GO DIVE!' : count;
      count--;
    }, 1000);
  };

  // hide existing problem
  const hideExistingProblem = () => {
    const $allProblems = [...$body.querySelectorAll('.problem')];
    const $currentProblem = $allProblems[$allProblems.length - 1];
    $currentProblem.classList.add('completed');
  };

  // check selection
  const checkSelection = e => {
    if (e.target.value || e.target.checked) {
      e.currentTarget.querySelector('.next').textContent = 'SUBMIT';
    }
  };

  // check correctness
  const checkCorrect = e => {
    const { dataset } = e.target;
    const problemId = +dataset.problemId;
    const problemType = +dataset.problemType;
    let userAnswers = [];

    if (problemType === PROBLEM_TYPES.SHORT) {
      const $userAnswer = e.target.querySelector('input[type=text]');
      if ($userAnswer) userAnswers = [$userAnswer.value];
    } else if (problemType === PROBLEM_TYPES.MULTIPLE_MULTIPLE) {
      const $userAnswers = [
        ...e.target.querySelectorAll('input[type=checkbox]:checked')
      ];
      if ($userAnswers) {
        userAnswers = [
          ...$userAnswers.map($answer => $answer.dataset.optionId)
        ];
      }
    } else {
      const $userAnswer = e.target.querySelector('input[type=radio]:checked');
      if ($userAnswer) userAnswers = [...$userAnswer.dataset.optionId];
    }

    const answers = [
      ...ANSWERS.find(answer => answer.problemId === problemId).answers
    ];

    let isCorrect = true;
    if (userAnswers.length !== answers.length) {
      isCorrect = false;
    }
    answers.sort();
    userAnswers.sort();

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] !== userAnswers[i]) {
        isCorrect = false;
        break;
      }
    }

    user.solved++;
    if (isCorrect) {
      user.correct++;
      problems.find(problem => problem.id === problemId).correct = true;
      return;
    }
    gameUtils.oxygenTank.minusOxygen();
  };

  // move problem
  const moveProblem = (() => ({
    next() {
      if (currentProblemIdx > problems.length - 1) return;
      if (currentProblemIdx === problems.length - 1) {
        showResult();
        return;
      }
      hideExistingProblem();
      currentProblemIdx++;
      appendProblem();
    },
    prev() {
      currentProblemIdx--;
    }
  }))();

  // register form event
  const registerFormEvent = $form => {
    $form.onsubmit = e => {
      e.preventDefault();
      checkCorrect(e);
      moveProblem.next();
    };
    $form.onclick = e => {
      if (!e.target.matches('input')) return;
      checkSelection(e);
    };
    $form.oninput = e => {
      if (!e.target.matches('input[type=text]')) return;
      checkSelection(e);
    };
  };

  // game initial settings
  // const init = () => {
  //   $body.className = 'game';
  //   gameUtils.renderGameBackground();
  //   // gameUtils.oxygenTank.init(0.5, renderResult);
  // };

  // const renderResult = () => {
  // const checkCorrectness = () => {
  //   const isEqual = (array1, array2) => {
  //     if (array1.length !== array2.length) return false;
  //     array1.sort();
  //     array2.sort();
  //     for (let i = 0; i < array1.length; i++) {
  //       if (array1[i] !== array2[i]) return false;
  //     }

  //     return true;
  //   };

  //   userAnswers.forEach(userAnswer => {
  //     const correctAnswer = ANSWERS.find(
  //       answer => answer.problemId === userAnswer.problemId
  //     );
  //     userAnswer.correct = isEqual(correctAnswer.answers, userAnswer.answer);
  //   });
  // };

  // checkCorrectness();

  //   $body.appendChild($result);

  //   $result.addEventListener('click', e => {
  //     if (!e.target.matches('.overlay')) return;
  //     mainPage.render();
  //   });
  // };

  // const renderProblem = () => {
  //   const nextProblem = idx => {
  //     problems[currentProblemIdx].completed = true;
  //     currentProblemIdx = idx + 1;
  //     renderProblem();
  //   };

  //   // $body.innerHTML = '';

  //   const $options = (() => {
  //     const { id: problemId, type, options } = problems[currentProblemIdx];

  //     switch (type) {
  //       case PROBLEM_TYPES.MULTIPLE_SINGLE:
  //         return options
  //           .map(
  //             ({ id, content }, idx) => `
  //             <div class="starfish" style="display:inline-block; margin: 25px 50px;vertical-align:top;">
  //               <div class="fish-leg"></div>
  //               <div class="fish-face">
  //                 <div class="fish-smile">
  //                   <div class="fish-tongue"></div>
  //                 </div>
  //               </div>
  //             </div>
  //             <input
  //               type="radio"
  //               id=question${problemId}-option${id}
  //               data-problem-id=${problemId}
  //               data-option-id=${id}
  //               name="option"
  //             />
  //             <label class='multiple ${
  //               idx % 2 === 0 ? 'even' : ''
  //             }' for=question${problemId}-option${id}>
  //               ${content}
  //             </label>
  //           `
  //           )
  //           .join('');
  //       case PROBLEM_TYPES.MULTIPLE_MULTIPLE:
  //         return options
  //           .map(
  //             ({ id, content }, idx) => `
  //             <div class="starfish" style="display:inline-block; margin: 25px 50px;vertical-align:top;">
  //             <div class="fish-leg"></div>
  //             <div class="fish-face">
  //               <div class="fish-smile">
  //                 <div class="fish-tongue"></div>
  //               </div>
  //             </div>
  //           </div>
  //             <input
  //               type="checkbox"
  //               id=problem${problemId}-option${id}
  //               data-problem-id=${problemId}
  //               data-option-id=${id}
  //               name="option"
  //             />
  //             <label for=problem${problemId}-option${id}>
  //               ${content}
  //             </label>
  //           `
  //           )
  //           .join('');
  //       case PROBLEM_TYPES.OX:
  //         return options
  //           .map(
  //             ({ id, content }) => `
  //             <div class="starfish" style="display:inline-block; margin: 25px 50px;vertical-align:top;">
  //             <div class="fish-leg"></div>
  //             <div class="fish-face">
  //               <div class="fish-smile">
  //                 <div class="fish-tongue"></div>
  //               </div>
  //             </div>
  //           </div>
  //             <input
  //               type="radio"
  //               id=problem${problemId}-option${id}
  //               data-problem-id=${problemId}
  //               data-option-id=${id}
  //               name="option"
  //             />
  //             <label class='multiple' for=problem${problemId}-option${id}>
  //               ${content}
  //             </label>
  //           `
  //           )
  //           .join('');
  //       case PROBLEM_TYPES.SHORT:
  //         return `
  //           <input
  //             type="text"
  //             placeholder="답을 입력하세요"
  //             id=question${problemId}
  //             data-problem-id=${problemId}
  //           />
  //         `;
  //       default:
  //         return '';
  //     }
  //   })();

  //   // 문제 번호 링크
  //   // const $problemLinks = (() => {
  //   //   const CLASS_PROBLEM_LINKS = 'problem-links';
  //   //   const $container = document.createElement('ol');
  //   //   $container.className = CLASS_PROBLEM_LINKS;
  //   //   $container.innerHTML = problems
  //   //     .map(
  //   //       (problem, idx) => `
  //   //       <li data-problem-idx=${idx}>
  //   //         <button ${problem.completed ? 'disabled' : ''}>
  //   //           ${problem.id}
  //   //         </button>
  //   //       </li>
  //   //     `
  //   //     )
  //   //     .join('');

  //   //   $container.addEventListener('click', e => {
  //   //     if (!e.target.matches(`ol.${CLASS_PROBLEM_LINKS} > li > button`)) {
  //   //       return;
  //   //     }
  //   //     getProblemByIdx(+e.target.parentNode.dataset.problemIdx);
  //   //   });
  //   //   return $container;
  //   // })();

  //   const $container = document.createElement('section');
  //   $container.className = 'problem';
  //   const $form = document.createElement('form');
  //   $form.className = 'form';
  //   $form.innerHTML = `
  //     <fieldset>
  //       <legend>
  //         ${problems[currentProblemIdx].question}
  //       </legend>
  //       <div>
  //         ${problems[currentProblemIdx].sub}
  //       </div>
  //       ${$options}
  //       <button type="submit">
  //         제출
  //       </button>
  //     </fieldset>
  //   `;
  //   $container.appendChild($form);

  //   // 문제 번호 링크 DOM에 추가
  //   // $container.appendChild($problemLinks);
  //   $body.appendChild($container);
  //   isLoading = false;

  //   $form.addEventListener('submit', e => {
  //     e.preventDefault();

  //     const currentProblemType = problems[currentProblemIdx].type;

  //     let $inputs;
  //     switch (currentProblemType) {
  //       case PROBLEM_TYPES.SHORT:
  //         $inputs = [...e.target.querySelectorAll('input[type=text]')];
  //         break;
  //       case PROBLEM_TYPES.MULTIPLE_MULTIPLE:
  //         $inputs = [
  //           ...e.target.querySelectorAll('input[type=checkbox]:checked')
  //         ];
  //         break;
  //       case PROBLEM_TYPES.MULTIPLE_SINGLE:
  //         $inputs = [...e.target.querySelectorAll('input[type=radio]:checked')];
  //         break;
  //       case PROBLEM_TYPES.OX:
  //         $inputs = [...e.target.querySelectorAll('input[type=radio]:checked')];
  //         break;
  //       default:
  //         break;
  //     }

  //     const problemId = +$inputs[0].dataset.problemId;
  //     const userAnswerForProblem = userAnswers.find(
  //       userAnswer => userAnswer === problemId
  //     );

  //     // 문제에 대한 기존의 답이 있을 경우
  //     // if (userAnswerForProblem) {
  //     //   userAnswerForProblem.answer = [
  //     //     ...userAnswerForProblem.answer,
  //     //     ...(currentProblemType === PROBLEM_TYPES.SHORT
  //     //       ? $inputs.map($input => $input.value)
  //     //       : $inputs.map($input => $input.dataset.optionId))
  //     //   ];
  //     // }

  //     // 문제에 대한 기존의 답이 없을 경우
  //     userAnswers = [
  //       ...userAnswers,
  //       {
  //         problemId: +$inputs[0].dataset.problemId,
  //         answer: [
  //           ...(currentProblemType === PROBLEM_TYPES.SHORT
  //             ? $inputs.map($input => $input.value)
  //             : $inputs.map($input => $input.dataset.optionId))
  //         ],
  //         correct: false
  //       }
  //     ];

  //     $container.classList.add('completed');

  //     // 마지막 문제일 경우, 테스트 결과 보여주기
  //     if (!problems[currentProblemIdx + 1]) {
  //       renderResult();
  //       return;
  //     }

  //     // 마지막 문제가 아닐경우, 다음 문제 보여주기
  //     nextProblem(currentProblemIdx);
  //   });
  // };

  return {
    start(_mode) {
      // init();
      // renderProblem();
      initializeGame(_mode);
    },
    end() {}
  };
})();

// gamePage.start();
