import "./style.scss";

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomFromArray(items) {
  return items[Math.floor(Math.random() * items.length)];
}


function intersection(arrA, arrB) {
  return arrA.filter(x => arrB.includes(x));
}


function chunkArrayInGroups(arr, size) {
  let myArray = [];
  for(let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}


function objectFromArrays(arrA, arrB) {
  return Object.fromEntries(arrA.map((_, i) => [arrA[i], arrB[i]]));
}


export default class FallHackGame {

  textScreenCount = 2;
  textScreenRowCount = 16;
  textScreenRowLength = 16;
  garbageChars = ["~", "@", "#", "$", "%", "^", "&", "*", "_", "+", "-", "=", "?", "|", ".", ",", "!"];
  leftBrackets = ["(", "[", "{"];
  rightBrackets = [")", "]", "}"];
  wordRanges = {};
  serviceLog = [];

  cheatRestore = 10;
  cheatRemove = 100;

  constructor ({
    words = ['DESCRIBE', 'LINGERIE', 'MCMILLEN', 'OPPERMAN', 'PAVEMENT', 'QUANTITY', 'REVERENT', 'AARDVARK'],
    password = 'AARDVARK',
    tries = 4,
    timeout = 0,
    text_header = 'text in header',
    text_footer = 'text in footer',
    chance = 20
  } = {}) {
    this.words = words;
    this.password = password || getRandomFromArray(words);
    this.tries = tries;
    this.chance = chance;
    this.timeout = timeout;
    // todo: should be removed
    this.text_header = text_header;
    this.text_footer = text_footer;
    // service attributes
    this.wordNumber = words.length;
    this.wordLength = words[0].length;
    this.alphas = this.words.join('');
    this.fieldSize = this.textScreenRowCount * this.textScreenRowLength * this.textScreenCount;
    this.leftOpposites = objectFromArrays(this.leftBrackets, this.rightBrackets),
    this.rightOpposites = objectFromArrays(this.rightBrackets, this.leftBrackets),
    this.cheats = this.leftBrackets.concat(this.rightBrackets);
    this.triesAtStart = tries;
    this.dummyWords = words.filter(item => item !== this.password);
    // generated attributes
    this.textField = this.getTextField();
    this.content = this.getContent();
    this.render();
    this.initEventListeners();
  }

  gameWin = () => {
    const event = new CustomEvent("gamewin", {
      cancelable: true,
      bubbles: true
    });
    this.element.dispatchEvent(event);
  }

  gameLose = () => {
    const event = new CustomEvent("gamelose", {
      cancelable: true,
      bubbles: true
    });
    this.element.dispatchEvent(event);
  }

  initEventListeners() {
    this.element.addEventListener("pointerover", this.onHover);
    this.element.addEventListener("pointerout", this.onHoverEnd);
    this.element.addEventListener("pointerdown", this.onClick);
  }

  onHover = (event) => {
    //return;
    const char = event.target.closest(".char");
    if (!char) return;
    const check = this.checkChar(char);

    check.chars.forEach(item => {
      item.classList.add('highlighted');
      item.removeEventListener(item, this.onHoverEnd);
    });

    if (check.word) {
      this.subElements.cli.textContent = check.word;
    }
  }

  onHoverEnd = (event) => {
    //return;
    const char = event.target.closest(".char");
    if (!char) return;
    const check = this.checkChar(char);

    check.chars.forEach(item => {
      item.classList.remove('highlighted');
      item.removeEventListener(item, this.onHover);
    });

    this.subElements.cli.textContent = '';
  }

  onClick = (event) => {
    const char = event.target.closest(".char");
    if (!char) return;

    const target = this.checkChar(char);

    if (target.word) {
      this.wordRanges[target.word] = [];
      target.chars.forEach(this.makeDot);
      if (target.word === this.password) {
        this.subElements.status.textContent = 'WINNED';
        this.addServiceRow("ACCESS GRANTED!");
        setTimeout(this.gameWin, 1000);
      } else {
        const sharedChars = this.compareWithPassword(target.word);
        this.addServiceRow(`${target.word} [${sharedChars}/${this.wordLength}]`);
        this.triesUpdate(this.tries - 1);
      }
    }

    if (target.cheat) {
      target.chars.forEach(this.makeDot);
      const chance = getRandomInt(0, 100);
      if (chance <= this.cheatRestore) {
        this.triesRestore();
        this.addServiceRow('TRIES RESTORED!');
      } else if (chance <= this.cheatRemove) {
        const word = getRandomFromArray(this.dummyWords);
        range(...this.wordRanges[word]).forEach(index => {
          this.makeDot(this.subElements[index]);
        });
        this.wordRanges[word] = [];
        this.addServiceRow('DUD REMOVED!')
      }
    }
  }

  makeDot = (item) => {
    item.textContent = '.';
    this.textField[item.dataset.element] = '.';
    item.classList.remove("highlighted");
    item.removeEventListener(item, this.onHover);
  }

  triesUpdate(number) {
    this.tries = number;
    this.subElements.tries.textContent = "*".repeat(number);
    if (this.tries <= 0) {
      this.subElements.status.textContent = "FAILED";
      this.addServiceRow("ACCESS DENIED!");
    }
  }

  triesRestore() {
    this.triesUpdate(this.triesAtStart);
  }

  compareWithPassword(word) {
    return intersection(word.split(''), this.password.split('')).length;
  }

  addServiceRow(content) {
    const templateRow = `<div class="service__row">${content}</div>`;
    this.serviceLog.push(templateRow);
    this.subElements.log.innerHTML = this.serviceLog.join('');
  }

  checkChar(char) {
    if (!char) return;
    let result = {'chars': [char]}
    if (this.cheats.includes(char.textContent)) {
      result = this.checkCharIsCheat(char);
    } else if (this.alphas.includes(char.textContent)) {
      result = this.checkCharIsWord(char);
    }
    return result;
  }

  checkCharIsWord(char) {
    const isWord = this.checkCharInRange(char.dataset.element);
    if (isWord.length > 0) {
      const indexRange = range(...isWord[1]);
      const chars = indexRange.map(index => {
        return this.subElements[index];
      });
      return {"chars": chars, "word": isWord[0]};
    }
  }

  checkCharInRange(index) {
    return Object.entries(this.wordRanges).reduce((accum, item) => {
      const [word, range] = [...item];
      if (index >= range[0] && index <= range[1]) {
        accum = item;
      }
      return accum;
    }, []);
  }

  checkCharIsCheat(char) {
    const index = parseInt(char.dataset.element, 10),
          rowStart = Math.floor(index / this.textScreenRowLength) * this.textScreenRowLength,
          rowEnd = rowStart + this.textScreenRowLength - 2;

    let rowSlice = [],
        opposite = '',
        left = 0,
        right = 0,
        cheatRange = [index, ];

    if (this.leftBrackets.includes(char.textContent)) {
      rowSlice = Object.entries(this.textField).slice(index, rowEnd);
      opposite = this.leftOpposites[char.textContent];
      left = 1;
    } else if (this.rightBrackets.includes(char.textContent)) {
      rowSlice = Object.entries(this.textField).slice(rowStart, index + 1).reverse();
      opposite = this.rightOpposites[char.textContent];
      right = 1;
    }

    for (const [idx, char] of Object.values(rowSlice)) {
      if (char === opposite && idx !== index) {
        cheatRange.push(parseInt(idx, 10) + left);
        cheatRange[0] += right;
        cheatRange.sort();
        break;
      } else if (this.alphas.includes(char)) {
        break;
      };
    }

    if (cheatRange.length > 1) {
      const chars = Object.keys(this.subElements).slice(...cheatRange).map(key => {
        return this.subElements[key];
      });
      return {"chars": chars, "cheat": true};
    } else {
      return {"chars": [char,]}
    }

  }

  getTextField() {
    const wordSpace = this.wordLength * this.wordNumber;
    const garbage = Array(this.fieldSize - wordSpace).fill('');

    let textField = garbage.map(() => {
      if (getRandomInt(0, 100) <= this.chance) {
        return getRandomFromArray(this.cheats);
      } else {
        return getRandomFromArray(this.garbageChars);
      }
    });

    const wordPositions = this.setWordPositions();
    wordPositions.forEach((item, index) => {
      // put words into positions on text field
      textField.splice(item, 0, this.words[index])
    });
    const shuffled = shuffle(textField);
    // get word positions in shuffled array
    this.getWordRanges(shuffled);
    // break array into symbols, assign indexes for every char
    return Object.assign({}, shuffled.join(''));
  }

  setWordPositions() {
    const positions = [];
    const delta = this.fieldSize / this.wordNumber;
    for (let i = 0; i < this.wordNumber; i++) {
      positions.push(getRandomInt(i * delta, (i + 1) * delta - 2 - this.wordLength));
    }
    return positions;
  }

  getWordRanges(textField) {
    const shuffledWords = textField.filter(word => this.words.includes(word));
    const _word = this.wordLength - 1;
    shuffledWords.forEach((item, index) => {
      const start = textField.findIndex(word => word === item) + index * _word;
      const end = start + _word;
      this.wordRanges[item] = [start, end];
    });
  }

  getRowIndexes() {
    const startIndex = getRandomInt(0x1000, 0xFFFF-513);
    const overallIndexes = this.textScreenRowCount * this.textScreenCount;
    const emptyArray = Array(overallIndexes).fill(0);

    return emptyArray.map((_i, index, _a) => {
                  const number = index === 0 ? startIndex : startIndex + 16 * index;
                  return `0x${number.toString(16).toUpperCase()}`;
                })
  }

  getContent() {
    const rowIndexes = this.getRowIndexes();
    const chunked = chunkArrayInGroups(Object.entries(this.textField), this.textScreenRowLength);
    const textContent = chunked.map((item, index) => this.getRowTemplate(rowIndexes[index], item));
    const left = textContent.splice(0, this.textScreenRowCount).join(''),
          right = textContent.join('');
    return {left, right};
  }

  getRowTemplate(index, content) {
    const row = [...content].map(item => {
      const [index, char] = [...item];
      return `<span class="char" data-element="${index}">${char}</span>`;
    }).join('');

    return `
      <div class="row">
        <span class="row__index">${index}</span>
        <span class="row__content">${row}</span>
      </div>
    `
  }

  get template() {
    return `
    <div class="interface">
      <div class="interface_header">
        <p data-element="status">-----</p>
        <a href="/main">main</a>
        <p> TRIES LEFT: <span data-element="tries">${"*".repeat(this.tries)}</span></p>
      </div>
      <div class="interface_content">
        <div class="content">${this.content.left}</div>
        <div class="content content_right">${this.content.right}</div>
        <div class="content content_service content_right">
          <div class="content_service__log" data-element="log"></div>
          <div class="content_service__cli"> >> <span data-element="cli"></span></div>
        </div>
      </div>
    </div>
    `
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    return this.element;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  show(target) {
    const parent = target || document.body;
    parent.append(this.element);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

}
