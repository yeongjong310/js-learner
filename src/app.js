let user = {
  name: 'GUEST',
  solved: 0,
  correct: 0,
  stageCleared: new Set()
};

const mainPage = (function () {
  let mode = 'EASY';
  let bubbleId;
  let bubblingFunc;
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
  const getCorrectRate = () =>
    user.solved ? Math.floor((user.correct / user.solved) * 100) : 0;
  const getStageClearRate = () =>
    Math.floor((user.stageCleared.size / categories.length) * 100);

  const fetch = () => {
    document.body.style.setProperty(
      'overflow-y',
      getUserSession() ? 'scroll' : 'hidden'
    );
    document.body.className = `main ${mode === 'HARD' ? 'night' : ''}`;
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
        <section class="user__status-circle status-stage">
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
        <section class="user__status-circle status-problem">
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
  <div class="boat ${mode === 'HARD' ? 'night' : ''}">
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
  <div class="sun ${mode === 'HARD' ? 'night' : ''}">
    <div class="cloud"></div>
  </div>
  <div class="moon ${mode === 'HARD' ? 'night' : ''}"></div>
  <div class="stars ${mode === 'HARD' ? 'night' : ''}"></div>
  <div class="bird ${mode === 'HARD' ? 'night' : ''}"></div>
  <div class="bird two ${mode === 'HARD' ? 'night' : ''}"></div>
  <div class="bird three ${mode === 'HARD' ? 'night' : ''}"></div>
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
    // accessibility();
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

        categories.forEach(({ id, name }, idx) => {
          const $category = document.createElement('div');
          $category.id = id;
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
      bubblingFunc = (function startBubbleMaking() {
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
        return (function () {
          let i = 0;

          function addBubble() {
            if (i < numBubbles) {
              createBubble();
              i++;
              return;
            }

            clearInterval(bubbleId);
          }

          // Add a bubble every 1s.
          // bubbleId = setInterval(addBubble, 1000);

          return addBubble;
        })();
      })();
      bubbleId = setInterval(bubblingFunc, 1000);

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
          gamePage.start(mode, e.target.closest('.category').id);
        });

        window.addEventListener(
          'scroll',
          throttle(() => {
            const currentY = window.scrollY;

            document.querySelectorAll('.scroll-del')?.forEach(e => {
              e.classList.toggle('disable', currentY > 200);
            });
            document
              .querySelector('.scroll-up')
              ?.classList.toggle('able', currentY > 200);
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

        // mouseover를 넣을까, mouseenter를 넣을까 고민을 많이 함
        // mouseover의 경우, 버블링 때문에 circle 안의 모든 원소들에 hover를 할 때마다 이벤트가 발생
        // 하지만 mouseenter의 경우 버블링이 일어나지 않기 때문에 원하는대로 한번씩만 이벤트가 발생하여 더 효과적이라고 판단
        document.querySelectorAll('.user__status-circle').forEach($el => {
          $el.addEventListener('mouseenter', e => {
            e.target.querySelector('.progress-title').textContent =
              e.target.classList.contains('status-stage')
                ? `${user.stageCleared.size} / ${categories.length}`
                : `${user.correct} / ${user.solved}`;
          });
        });

        document.querySelectorAll('.user__status-circle').forEach($el => {
          $el.addEventListener('mouseleave', e => {
            e.target.querySelector('.progress-title').textContent =
              e.target.classList.contains('status-stage') ? 'STAGE' : 'CORRECT';
          });
        });

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

    toggleAnimationRun(animationState) {
      if (animationState === 'running') {
        bubbleId = setInterval(bubblingFunc, 1000);
      } else {
        clearInterval(bubbleId);
      }
    },

    render() {
      this.init();
    }
  };
})();

mainPage.render();

// yj
// 접근성
const accessibility = (() => {
  let aniPlayState = 'running';

  // make button(DOM) for accessibility only one time
  const $accessbility = document.createElement('article');
  $accessbility.classList.add('accessibility');
  $accessbility.innerHTML = `
  <a class="accessibility__menu-btn" role="button">
    <img src="./src/img/disabled.svg"/ alt="accessibility menu button" />
  </a>
  <div class="accessibility__menu">
    <div class="accessibility__menu-title">접근성 메뉴</div>
    <ul>
      <li>
        <button class="accessibility__btn">텍스트 크기 조절</button>
        <div class="accessibility__btn--level-wrapper">
          <span class="accessibility__btn--level"></span>
        </div>
      </li>
      <li><button class="accessibility__btn">애니메이션 중지</button></li>
    </ul>
  </div>
  `;

  const $accessibilityMenu = $accessbility.querySelector(
    '.accessibility__menu'
  );
  const $accessbilityMenuToggleBtn = $accessbility.querySelector(
    '.accessibility__menu-btn'
  );
  const [$btnBiggerText, $btnToggleAni] = $accessbility.querySelectorAll(
    '.accessibility__btn'
  );

  // functions
  const biggerText = (() => {
    const $fontLevelIcons = document.querySelector(
      '.accessibility__btn--level-wrapper'
    );
    const FONT_SIZES = ['16px', '18px', '20px'];
    let level = 0;
    return () => {
      level = (level + 1) % FONT_SIZES.length;
      document.documentElement.style.fontSize = FONT_SIZES[level];

      const $fontLevelIcon = document.createElement('span');
      $fontLevelIcon.className = 'accessibility__btn--level';
      $fontLevelIcons.append($fontLevelIcon);

      if ($fontLevelIcons.children.length === 4) {
        $fontLevelIcons.innerHTML =
          '<div class="accessibility__btn--level"></div>';
      }
    };
  })();

  const toggleAnimation = () => {
    if (aniPlayState === 'running') {
      aniPlayState = 'paused';
      $btnToggleAni.textContent = '애니메이션 시작';
    } else {
      aniPlayState = 'running';
      $btnToggleAni.textContent = '애니메이션 중지';
    }
    mainPage.toggleAnimationRun(aniPlayState);
    document.body.style.setProperty('--play-state', aniPlayState);
  };

  // handlers
  $accessibilityMenu.addEventListener('click', ({ target }) => {
    if (!target.matches('.accessibility__menu .accessibility__btn')) return;
    target === $btnBiggerText ? biggerText() : toggleAnimation();
  });

  $accessbilityMenuToggleBtn.addEventListener('click', () => {
    $accessibilityMenu.classList.toggle('on');
  });

  return {
    display() {
      document.body.appendChild($accessbility);
    }
  };
})();

// 게임 유틸즈
const gameUtils = (() => {
  const renderGameBackground = () => {
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
      </section>`;
  };
  const load = (() => {
    let _timerId;
    const $overlay = document.createElement('div');
    $overlay.className = 'overlay';
    $overlay.innerHTML = `
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
      </div>`;

    return {
      start() {
        document.body.appendChild($overlay);
        _timerId = setInterval(() => {
          const $loadingText = document.querySelector('.loading__text');
          $loadingText.textContent =
            $loadingText.textContent.length >= 12
              ? 'LOADING'
              : $loadingText.textContent + ' .';
        }, 250);
      },
      stop() {
        clearInterval(_timerId);
        document.body.removeChild($overlay);
      }
    };
  })();

  const fetchGames = () => {
    load.start();
    setTimeout(load.stop, 2000);
  };

  const oxygenTank = (() => {
    let _inhaleAmount;
    let _timerId;
    let _oxygen = 100;
    let _endCallback;

    const stopInhaleOxygen = () => {
      clearInterval(_timerId);
    };

    const startInhaleOxygen = () => {
      const _inhale = () => {
        _oxygen -= _inhaleAmount;
      };

      const _renderRestOxygenAmount = () => {
        const $tank = document.querySelector('.oxygen-tank');
        $tank.style.setProperty('--amount', _oxygen);
      };

      const _endGame = () => {
        stopInhaleOxygen();
        _endCallback();
        document.querySelector('.ocean').classList.remove('active');
      };

      const _showAlmostEnd = () => {
        document.querySelector('.ocean').classList.add('active');
      };

      _timerId = setInterval(() => {
        _inhale();
        _renderRestOxygenAmount();

        if (_oxygen <= 30) _showAlmostEnd();
        if (_oxygen <= 0) _endGame();
      }, 100);
    };

    const minusOxygen = () => {
      _oxygen -= 5;
    };

    const init = (inhaleAmount, endCallback) => {
      _oxygen = 100;
      _inhaleAmount = inhaleAmount;
      _endCallback = endCallback;
      startInhaleOxygen();
    };

    return {
      init,
      minusOxygen,
      stopInhaleOxygen
    };
  })();
  return {
    renderGameBackground,
    oxygenTank,
    fetchGames
  };
})();

// accessibility.display();
// document.body.classList.add('game');
// gameUtils.renderGameBackground();
// gameUtils.oxygenTank.init(1);
// gameUtils.fetchGames();

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
      categoryId: 1,
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
      categoryId: 1,
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
      categoryId: 1,
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
      categoryId: 1,
      type: PROBLEM_TYPES.SHORT,
      question: '다음은 어떤 결과를 반환할까요?',
      sub: '[1, 2, 3, 4].reduce((acc, cur) => acc + cur ** 2, 1);',
      options: []
    },
    {
      id: 5,
      categoryId: 1,
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
  let categoryId;

  // initialize states
  const initializeStates = () => {
    currentProblemIdx = 0;
    problems = [
      ...PROBLEMS.filter(problem => problem.categoryId === +categoryId)
    ].map(problem => ({
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
        getReady();
        return;
      }
      count--;
    }, 1000);
  };

  // initial game setting
  const initializeGame = (_mode, _categoryId) => {
    mode = _mode;
    categoryId = _categoryId;
    $body.className = 'game';
    gameUtils.renderGameBackground();
    gameUtils.fetchGames();
    initializeStates();
    const $defaultProblemsSection = document.createElement('section');
    $defaultProblemsSection.className = 'problems';
    $body.appendChild($defaultProblemsSection);
    loadGame();
  };

  // show result
  const showResult = () => {
    if (gameEnd) return;

    // returns {
    //   correctProblemCnt: number,
    //   totalProblemLength: number,
    //   stage: {
    //     id: number,
    //     cleared: boolean
    //   }
    // }
    const _getComprehensiveResult = () => {
      const _correct = problems.filter(problem => problem.correct).length;
      const _totalLength = problems.length;

      return {
        correctProblemCnt: _correct,
        totalProblemLength: _totalLength,
        stage: {
          id: 1,
          cleared: _correct / _totalLength > 0.5
        }
      };
    };

    gameEnd = true;
    gameUtils.oxygenTank.stopInhaleOxygen();
    const { correctProblemCnt, totalProblemLength, stage } =
      _getComprehensiveResult();
    if (stage.cleared) user.stageCleared.add(stage.id);

    const $resultSection = document.createElement('section');
    $resultSection.className = 'results';
    $resultSection.innerHTML = `
        <div class="overlay progress"></div>
        <div class="result">
          <div class="user-name">
            <span>${stage.cleared ? '&#127881;' : '&#128517;'}</span>
            ${stage.cleared ? 'Great!' : 'Try again ...'} ${user.name}
            <span>${stage.cleared ? '&#127881;' : '&#128517;'}</span>
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

  return {
    start(_mode, _categoryId) {
      initializeGame(_mode, _categoryId);
    },
    end() {}
  };
})();
