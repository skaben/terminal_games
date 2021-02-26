import {
  range,
  shuffle,
  getRandomInt,
  getRandomFromArray,
  intersection,
  chunkArrayInGroups,
  objectFromArrays,
} from "../../../../util/helpers.js";

import {
  viewMixin,
  canRender
} from '../../../../mixins/view';

import socket from "../../../../util/socket";

import "./style.scss";


class HackGame {

  textScreenCount = 2;
  textScreenRowCount = 16;
  textScreenRowLength = 16;
  garbageChars = ["~", "@", "#", "$", "%", "^", "&", "*", "_", "+", "-", "=", "?", "|", ".", ",", "!"];
  leftBrackets = ["(", "[", "{"];
  rightBrackets = [")", "]", "}"];
  wordRanges = {};
  serviceLog = [];

  gameWin = () => socket.emit("gamewin");
  gameLose = () => socket.emit("gamelose");
  //gameWin = () => dispatchEvent(this.element, "gamewin");
  //gameLose = () => dispatchEvent(this.element, "gamelose");

  constructor({
      words,
      tries,
      password,
      timeout,
      chance
    } = props) {

    this.password = password;
    this.words = words;
    this.dummyWords = words;
    this.tries = tries || 4;
    this.timeout = timeout || 0;
    this.chance = chance;

    this.wordNumber = this.words.length;
    this.wordLength = this.words[0].length;
    this.alphas = this.words.join('');
    this.fieldSize = this.textScreenRowCount * this.textScreenRowLength * this.textScreenCount;
    this.leftOpposites = objectFromArrays(this.leftBrackets, this.rightBrackets),
    this.rightOpposites = objectFromArrays(this.rightBrackets, this.leftBrackets),
    this.cheats = this.leftBrackets.concat(this.rightBrackets);
    this.triesAtStart = this.tries;
    this.cheatRestore = Math.floor(chance / 5);
    this.cheatRemove = 100;  // always

    this.textField = this.getTextField();
    this.content = this.getContent();
  }

  initEventListeners() {
    this.element.addEventListener("pointerover", this.onHover);
    this.element.addEventListener("pointerout", this.onHoverEnd);
    this.element.addEventListener("pointerdown", this.onClick);
  }

  onHover = (event) => {
    //return;
    this.subElements.cli.innerHTML = '';
    const char = event.target.closest(".char");
    if (!char) return;
    const check = this.checkChar(char);

    check.chars.forEach(item => {
      item.classList.add('highlighted');
      item.removeEventListener(item, this.onHoverEnd);
    });

    if (check.word) {
      this.subElements.cli.textContent = check.word;
      this.subElements.cursor.classList.add("blinking");
    }
  }

  onHoverEnd = (event) => {
    //return;
    this.subElements.cli.innerHTML = '';
    const char = event.target.closest(".char");
    if (!char) return;
    const check = this.checkChar(char);

    check.chars.forEach(item => {
      item.classList.remove('highlighted');
      item.removeEventListener(item, this.onHover);
    });

    if (check.word) {
      this.subElements.cursor.classList.remove("blinking");
    };
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
      this.gameLose();
    }
  }

  triesRestore() {
    this.triesUpdate(this.triesAtStart);
  }

  compareWithPassword(word) {
    let count = 0;
    const wordChars = word.split('');
    const passChars = this.password.split('');

    wordChars.forEach((el, idx) => {
      if (passChars[idx] === el) {
        count++;
      };
    })

    return count;
  }

  addServiceRow(content) {
    const templateRow = `<div class="service__row">${content}</div>`;
    this.serviceLog.unshift(templateRow);
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

  template() {
    return `
    <div class="interface">
      <div class="interface_header" data-element="header">
        <p> TRIES LEFT: <span data-element="tries">${"*".repeat(this.tries)}</span></p>
        <p data-element="status"></p>
      </div>
      <div class="interface_content">
        <div class="hack-content">${this.content.left}</div>
        <div class="hack-content">${this.content.right}</div>
        <div class="hack-content content_service">
          <div class="content_service__log" data-element="log"></div>
          <div class="content_service__cli">
            <span class="cli-cursor" data-element="cursor">>> </span>
            <span data-element="cli"></span>
          </div>
        </div>
      </div>
    </div>
    `
  }

}


const getHackGame = (props) => {
  const game = new HackGame(props);
  Object.assign(
    game,
    viewMixin,
    canRender
  )
  game.render();
  return game;
}

export default getHackGame;
