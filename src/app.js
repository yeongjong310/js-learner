/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
let user = {
  name: 'GUEST',
  solved: 0,
  correct: 0,
  stageCleared: new Set()
};
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
    const $fontLevelIcons = $accessbility.querySelector(
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

const mainPage = (function () {
  let mode = 'EASY';
  let bubbleId;
  let bubblingFunc;
  let shark = {
    x: 0,
    y: 0
  };

  const setShark = _shark => {
    const $shark = document.querySelector('.shark');
    $shark.style.setProperty(
      'transform',
      `translate3d(-50%, -50%, 0) scaleX(${_shark.x < shark.x ? -1 : 1})`
    );

    shark = _shark;
    $shark.style.left = shark.x <= 0 ? 0 : shark.x + 'px';
    $shark.style.top = shark.x <= 0 ? 0 : shark.y + 'px';
  };

  const categories = [
    {
      id: 1,
      name: 'DATA TYPE'
    },
    {
      id: 2,
      name: 'FUNCTION'
    },
    {
      id: 3,
      name: 'DOM'
    },
    {
      id: 4,
      name: 'THIS'
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
  <div class="shark"></div>
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
            placeholder="이름을 입력하세요"
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
    accessibility.display();
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

  const followingShark = throttle(e => {
    setShark({ x: e.pageX, y: e.pageY - 100 });
  }, 50);

  const registerShark = throttle(() => {
    window.addEventListener('mousemove', followingShark);
  }, 50);

  const removeShark = throttle(() => {
    window.removeEventListener('mousemove', followingShark);
  }, 50);

  return {
    init() {
      fetch();

      // 1. renderCategories
      (function renderCategories() {
        const $fragment = document.createDocumentFragment();

        categories.forEach(({ id, name }, idx) => {
          const $category = document.createElement('div');
          $category.id = id;
          $category.className = `category ${
            user.stageCleared.has(id) ? 'solved' : ''
          }`;
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

        function bubbleSize() {
          return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        }

        function bubbleLocation() {
          return Math.floor(Math.random() * 96) + 2;
        }

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

        return (() => {
          let i = 0;

          return () => {
            if (i < numBubbles) {
              createBubble();
              i++;
              return;
            }
            clearInterval(bubbleId);
          };
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

        document
          .querySelector('.ocean')
          .addEventListener('mouseenter', registerShark);

        document
          .querySelector('.ocean')
          .addEventListener('mouseleave', removeShark);

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
        document
          .querySelector('.ocean')
          .addEventListener('mouseenter', registerShark);

        document
          .querySelector('.ocean')
          .addEventListener('mouseleave', removeShark);
      } else {
        clearInterval(bubbleId);
        document
          .querySelector('.ocean')
          .removeEventListener('mouseenter', registerShark);

        document
          .querySelector('.ocean')
          .removeEventListener('mouseleave', removeShark);
      }
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
    };

    return {
      init,
      minusOxygen,
      startInhaleOxygen,
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
    MULTIPLE_QUESTION_SINGLE_ANSWER: 0,
    MULTIPLE_QUESTION_MULTIPLE_ANSWER: 1,
    OX: 2,
    SHORT_ANSWER: 3
  };

  const PROBLEMS = [
    {
      id: 1,
      categoryId: 1,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
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
      id: 2,
      categoryId: 2,
      type: PROBLEM_TYPES.OX,
      question: 'JS의 함수는 일급객체이다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 3,
      categoryId: 2,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question:
        '다음은 함수를 정의하는 방법이다. 네가지 방식에서 모두 사용할 수 있는 것을 고르시오.',
      sub: `
      <div>a) function add(x, y) { return x + y };</div>
      <div>b) const add = function(x, y) { return x + y; };</div>
      <div>c) const add = new Function(‘x’, ‘y’, return x + y’);</div>
      <div>d) const add = (x, y) => x + y;</div>`,
      options: [
        { id: 1, content: 'rest 파라미터' },
        { id: 2, content: 'super' },
        { id: 3, content: 'prototype 프로퍼티' },
        { id: 4, content: 'arguments' }
      ]
    },
    {
      id: 4,
      categoryId: 2,
      type: PROBLEM_TYPES.SHORT_ANSWER,
      question: '다음 두 빈칸에 들어갈 동일한 내용을 작성하세요.',
      sub: `
      <div style="text-align:initial">function add ( 빈 칸 ) { </div>
      <div style="text-align:initial">&nbsp&nbsp return [ 빈 칸 ].reduce((acc, cur) => acc + cur, 0);</div>
      <div style="text-align:initial">}</div>
      <div style="text-align:initial">function add(1, 2, 3); // 6</div>
      <div style="text-align:initial">function add(1, 2); // 3</div>
      `,
      options: [
        { id: 1, content: 'function add(x, y) { return x + y }' },
        {
          id: 2,
          content: 'const add = function(x, y) { return x + y; }'
        },
        {
          id: 3,
          content: 'const add = new Function(‘x’, ‘y’, return x + y’)'
        },
        { id: 4, content: 'const add = (x, y) => x + y;' }
      ]
    },
    {
      id: 5,
      categoryId: 2,
      type: PROBLEM_TYPES.OX,
      question: '함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생한다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 6,
      categoryId: 2,
      type: PROBLEM_TYPES.SHORT_ANSWER,
      question:
        '함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 영어로 “  “ 함수라고 한다.',
      sub: '',
      options: []
    },
    {
      id: 7,
      categoryId: 1,
      type: PROBLEM_TYPES.OX,
      question:
        'JS의 데이터 타입은 정수형 숫자, 실수형 숫자 , 문자열, 불리언, undefined, null, 객체 총 7가지로 나뉜다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 8,
      categoryId: 1,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: 'JS에서 데이터 타입이 필요한 이유로 적절하지 않은 것은?',
      sub: '',
      options: [
        {
          id: 1,
          content:
            '값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해.'
        },
        {
          id: 2,
          content:
            '값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해.'
        },
        {
          id: 3,
          content: '메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정하기 위해'
        },
        { id: 4, content: '데이터 타입을 정적으로 고정시키기 위해.' }
      ]
    },
    {
      id: 9,
      categoryId: 1,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: '다음 중 실행 결과로 틀린 것을 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: `let foo; 
            typeof foo // undefined
            `
        },
        {
          id: 2,
          content: `foo = 3; 
            typeof foo // number
            `
        },
        {
          id: 3,
          content: `foo = {}; 
          typeof foo // object
          `
        },
        {
          id: 4,
          content: `foo = []; 
        typeof foo // array
        `
        }
      ]
    },
    {
      id: 10,
      categoryId: 1,
      type: PROBLEM_TYPES.OX,
      question: 'Symbol은 es6에서 추가된 새로운 객체 타입의 값이다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 11,
      categoryId: 1,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: '다음 중 결과가 다른 하나를 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: "Number('0')"
        },
        {
          id: 2,
          content: 'parseInt(‘0’)'
        },
        {
          id: 3,
          content: '‘0’ * 1'
        },
        {
          id: 4,
          content: '0 + ‘’'
        }
      ]
    },
    {
      id: 12,
      categoryId: 3,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: '노드 타입이 아닌 것을 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: '문서 노드'
        },
        {
          id: 2,
          content: '요소 노드'
        },
        {
          id: 3,
          content: '어트리뷰트 노드'
        },
        {
          id: 4,
          content: '데이터 노드'
        }
      ]
    },
    {
      id: 13,
      categoryId: 3,
      type: PROBLEM_TYPES.SHORT_ANSWER,
      question:
        "'fruit'이라는 class를 가진 요소 모두를 선택할 수 있도록 빈칸을 작성해 주세요.",
      sub: 'document.querySelectorAll( _____ )',
      options: []
    },
    {
      id: 14,
      categoryId: 3,
      type: PROBLEM_TYPES.OX,
      question:
        '크로스 사이트 스크립팅 공격(XSS)에 방어할 수 있도록 innerHTML을 사용할 것을 권장한다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 15,
      categoryId: 3,
      type: PROBLEM_TYPES.OX,
      question:
        'HTML Attribute의 역할은 HTML 요소의 최신 상태를 지정하는 것이다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 16,
      categoryId: 3,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: '다음 중 결과가 다른 하나를 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: '$element.\nchildren[0];'
        },
        {
          id: 2,
          content: '$element.\nfirstElementChild;'
        },
        {
          id: 3,
          content: '$element.\nlastElementChild;'
        },
        {
          id: 4,
          content: '$element.\nfirstChild;'
        }
      ]
    },
    {
      id: 17,
      categoryId: 4,
      type: PROBLEM_TYPES.OX,
      question:
        '‘this’ 키워드를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 18,
      categoryId: 4,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_MULTIPLE_ANSWER,
      question: '옳은 것을 모두 고르시오',
      sub: '',
      options: [
        {
          id: 1,
          content: '‘this’는 평가될 때 정적으로 바인딩된다.'
        },
        {
          id: 2,
          content: '‘strict mode’는 ‘this’ 바인딩에 영향을 준다.'
        },
        {
          id: 3,
          content: '전역에서도 ‘this’를 참조할 수 있다.'
        },
        {
          id: 4,
          content:
            '일반 함수가 호출될 때 ‘this’는 전역 객체와 바인딩되지 않는다.'
        }
      ]
    },
    {
      id: 19,
      categoryId: 4,
      type: PROBLEM_TYPES.OX,
      question:
        'this에 값을 할당하여 사용하거나 this의 값을 변수에 할당하여 사용할 수 있다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 20,
      categoryId: 4,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_MULTIPLE_ANSWER,
      question:
        'Function.prototype.apply/call/bind에 대한 내용 중 옳은 것을 모두 고르시오',
      sub: '',
      options: [
        {
          id: 1,
          content: '이들은 모두 Function.prototype의 메서드다.'
        },
        {
          id: 2,
          content: 'apply에는 인수를 쉼표로 구분해 전달해주어야 한다.'
        },
        {
          id: 3,
          content: 'bind는 함수 호출하지 않는다.'
        },
        {
          id: 4,
          content: '모든 함수는 이 메서드들을 사용할 수 있다.'
        }
      ]
    },
    {
      id: 21,
      categoryId: 4,
      type: PROBLEM_TYPES.OX,
      question:
        'strict mode가 적용된 일반 함수 내부의 this에는 null이 바인딩된다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    },
    {
      id: 22,
      categoryId: 5,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question:
        '프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: '이벤트 드리븐 프로그래밍'
        },
        {
          id: 2,
          content: '객체 지향 프로그래밍'
        },
        {
          id: 3,
          content: '함수형 프로그래밍'
        },
        {
          id: 4,
          content: '우리형 프로그래밍'
        }
      ]
    },
    {
      id: 23,
      categoryId: 5,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_MULTIPLE_ANSWER,
      question:
        'HTML 요소가 포커스를 받았을 때 발생하는 이벤트를 모두 고르세요.',
      sub: '',
      options: [
        {
          id: 1,
          content: 'focus'
        },
        {
          id: 2,
          content: 'focusin'
        },
        {
          id: 3,
          content: 'blur'
        },
        {
          id: 4,
          content: 'focusout'
        }
      ]
    },
    {
      id: 24,
      categoryId: 5,
      type: PROBLEM_TYPES.SHORT_ANSWER,
      question: '$button이 클릭 됐을 때 실행결과를 작성하세요',
      sub: `
      <div>$button.onclick = function () {
        console.log(‘button 1’);
      };</div>
      <div>$button.onclick = function () {
        console.log(‘button 2’);
      };</div>
      `,
      options: []
    },
    {
      id: 25,
      categoryId: 5,
      type: PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER,
      question: '올바른 이벤트 전파 단계를 고르세요',
      sub: '',
      options: [
        {
          id: 1,
          content: `
          1.capturing\n
          2.target\n
          3.bubbling`
        },
        {
          id: 2,
          content: `
          1.target\n
          2.bubbling\n
          3.capturing`
        },
        {
          id: 3,
          content: `
          1.bubbling\n
          2.capturing\n
          3.target`
        },
        {
          id: 4,
          content: `
          1. target\n
          2. capturing\n
          3. bubbling`
        }
      ]
    },
    {
      id: 26,
      categoryId: 5,
      type: PROBLEM_TYPES.OX,
      question:
        '이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러에서 this는 항상 이벤트를 바인딩한 DOM 요소를 가리킨다.',
      sub: '',
      options: [
        { id: 1, content: 'O' },
        { id: 2, content: 'X' }
      ]
    }
  ];

  const ANSWERS = [
    {
      problemId: 1,
      answers: ['4']
    },
    {
      problemId: 2,
      answers: ['1']
    },
    {
      problemId: 3,
      answers: ['1']
    },
    {
      problemId: 4,
      answers: ['...args']
    },
    {
      problemId: 5,
      answers: ['2']
    },
    {
      problemId: 6,
      answers: ['callback']
    },
    {
      problemId: 7,
      answers: ['2']
    },
    {
      problemId: 8,
      answers: ['4']
    },
    {
      problemId: 9,
      answers: ['4']
    },
    {
      problemId: 10,
      answers: ['2']
    },
    {
      problemId: 11,
      answers: ['4']
    },
    {
      problemId: 12,
      answers: ['4']
    },
    {
      problemId: 13,
      answers: ['.fruit']
    },
    {
      problemId: 14,
      answers: ['2']
    },
    {
      problemId: 15,
      answers: ['2']
    },
    {
      problemId: 16,
      answers: ['4']
    },
    {
      problemId: 17,
      answers: ['1']
    },
    {
      problemId: 18,
      answers: ['2', '3']
    },
    {
      problemId: 19,
      answers: ['2']
    },
    {
      problemId: 20,
      answers: ['1', '4']
    },
    {
      problemId: 21,
      answers: ['1']
    },
    {
      problemId: 22,
      answers: ['1']
    },
    {
      problemId: 23,
      answers: ['1', '2']
    },
    {
      problemId: 24,
      answers: ['button 2']
    },
    {
      problemId: 25,
      answers: ['1']
    },
    {
      problemId: 26,
      answers: ['1']
    }
  ];

  // ELEMENTS
  const $body = document.body;

  // STATES
  let currentProblemIdx;
  let problems;
  let gameEnd;
  let mode;
  let categoryId;

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

    if (problemType === PROBLEM_TYPES.MULTIPLE_QUESTION_SINGLE_ANSWER) {
      $innerForm.innerHTML = `
          <fieldset>
            <legend>
              ${question}
            </legend>
            <pre>
              <code>
                ${sub}
              </code>
            </pre>
            <section class="form__selections">
              ${options
                .map(
                  ({ id: optionId, content }, idx) => `
                <div class="form__selection ${
                  idx % 2 === 0 ? 'fly-slightly' : ''
                }">
                  <img width="70" class="jelly-fish" src="${SVG_CHARACTER_SRC}"/>
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
    if (problemType === PROBLEM_TYPES.MULTIPLE_QUESTION_MULTIPLE_ANSWER) {
      $innerForm.innerHTML = `
          <fieldset>
            <legend>
              ${question}
            </legend>
            <pre>
              <code>
                ${sub}
              </code>
            </pre>
            <section class="form__selections">
            ${options
              .map(
                ({ id: optionId, content }, idx) => `
                <div class="form__selection ${
                  idx % 2 === 0 ? 'fly-slightly' : ''
                }">
                  <img width="70" class="jelly-fish" src="${SVG_CHARACTER_SRC}" />
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
            <pre>
              <code>
                ${sub}
              </code>
            </pre>
            <section class="form__selections">
              ${options
                .map(
                  ({ id: optionId, content }) => `
                <div class="form__selection">
                  <img width="70" class="jelly-fish" src="${SVG_CHARACTER_SRC}" />
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
    if (problemType === PROBLEM_TYPES.SHORT_ANSWER) {
      $innerForm.innerHTML = `
          <fieldset>
            <legend>
              ${question}
            </legend>
            <pre>
              <code>
                ${sub}
              </code>
            </pre>
            <section class="form__selections">
              <div class="input__answer">
                <img width='70' src='${SVG_CHARACTER_SRC}' />
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

  // show result
  const showResult = () => {
    if (gameEnd) return;

    /*
    @returns {
      correctProblemCnt: number,
      totalProblemLength: number,
      stage: {
        id: number,
        cleared: boolean
      }
    }
    */
    const _getComprehensiveResult = () => {
      const _correct = problems.filter(problem => problem.correct).length;
      const _totalLength = problems.length;

      return {
        correctProblemCnt: _correct,
        totalProblemLength: _totalLength,
        stage: {
          id: categoryId,
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

  // START THE GAME: 게임을 시작한다.
  const startGame = () => {
    appendProblem();
    gameUtils.oxygenTank.init(mode === 'HARD' ? 5 : 0.2, showResult);
    gameUtils.oxygenTank.startInhaleOxygen();
  };

  // INITIALIZE STATES: 상태를 초기화한다.
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
    categoryId = +_categoryId;
    $body.className = 'game';
    gameUtils.renderGameBackground();
    gameUtils.fetchGames();
    accessibility.display();
    initializeStates();
    const $defaultProblemsSection = document.createElement('section');
    $defaultProblemsSection.className = 'problems';
    $body.appendChild($defaultProblemsSection);
    loadGame();
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

    if (problemType === PROBLEM_TYPES.SHORT_ANSWER) {
      const $userAnswer = e.target.querySelector('input[type=text]');
      if ($userAnswer) userAnswers = [$userAnswer.value];
    } else if (
      problemType === PROBLEM_TYPES.MULTIPLE_QUESTION_MULTIPLE_ANSWER
    ) {
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
      accessibility.display();
    },
    end() {}
  };
})();
