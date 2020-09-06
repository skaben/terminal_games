let game_data = {
  password: 'AARDVARK',
  num_tries: 4,
  num_words: 8,
  len_word: 8,
  timeout: 0,
  falsewords: ['DESCRIBE', 'LINGERIE', 'MCMILLEN', 'OPPERMAN', 'PAVEMENT', 'QUANTITY', 'REVERENT'],
  header: ' ROBCO INDUSTRIES 2077',
  footer: 'FALLOUT TERMINAL'
};

// �������� ��������������� �������

function isAlpha(c) {
	return (alphas.indexOf(c) != -1);
}

function isDigit(c) {
	return (digits.indexOf(c) != -1);
}

function isAlphaNum(c) {
	return (isAlpha(c) || isDigit(c));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //�������� � ������� ����������
}

function numTries(num_tries) {
	let tmp_txt = "";
	for (let i = 0; i < num_tries; i++) {
		tmp_txt += "* ";
	}
	document.getElementById("tries").innerHTML = tmp_txt;
}

function compareWords(word, pass_word) {
	let count = 0;
	for (let i = 0; i < pass_word.length; i++) {
		if (pass_word[i] == word[i]) {
			count++;
		}
	}
	return count;
}

// ���� 2�16�16, ���� � ��� � ��������������.

const num_rows = 16;
const num_chars = 16;
const grb_chars = ["~", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+",
                   "-", "=", "?", "|", ".", ",", "!", "&lt;", "&gt;", "{", "}", "[", "]"];
const left_brk = ["(", "[", "{", "&lt;"];
const right_brk = [")", "]", "}", "&gt;"];

const alphas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

const fgCol = "rgba(235,255,223)"; // ������� �� CSS!
const fgColSelect = "rgba(0,0,0)";
const bgCol = "none";
const bgColSelect = "rgba(235,255,223)";

let i = 0;
let j = 0;
let k = 0;

let l_cheat = -1;
let r_cheat = -1;

let word_list = [];
let pass_pos = getRandomInt(0, game_data.num_words - 1);

numTries(game_data.num_tries);

for (i = 0; i < game_data.num_words; i++) {
  if (i == pass_pos) {
    word_list[i] = game_data.password;
  } else {
    word_list[i] = game_data.falsewords[j++];
  }
}

for (i = 0; i < game_data.num_words; i++) {
  trandom = getRandomInt(0, game_data.num_words-1)
  mix_elem = word_list[trandom];
  word_list[trandom] = word_list[i];
  word_list[i] = mix_elem;
}


let num_garbage = 2 * (num_rows * num_chars);

let garbageElementsArray = [];
let garbageCharsArray = [];

let wordStartPosition = [];
let delta_words = 2*(num_rows*num_chars)/game_data.num_words;

for (i = 0; i < game_data.num_words; i++) {
  wordStartPosition[i] = getRandomInt(i*delta_words, (i+1)*delta_words-2-game_data.len_word);
}

j = 0;
k = 0;
let word_flag = 0;

for (i = 0; i < num_garbage; i++) {
  // если счетчик это начало слова
  if (wordStartPosition.includes(i)) {
    // а вот тут мы не обращаемся к массиву, а обращаемся к массиву представленному строкой... oh my js
	  garbageCharsArray[i] = word_list[j].slice(word_flag,word_flag+1);
    garbageElementsArray[i] = `<span class=\"word\" id=\"${word_list[j]}\">` + word_list[j].slice(word_flag,word_flag+1);
    word_flag++;
    continue;
  }
  //
  if (word_flag > 0 && word_flag < game_data.len_word) {
	garbageCharsArray[i] = word_list[j].slice(word_flag,word_flag+1);
    garbageElementsArray[i] = word_list[j].slice(word_flag,word_flag+1);
    word_flag++;
    continue;
  }
  if (word_flag == game_data.len_word) {
    garbageElementsArray[i-1] += "</span>";
    j++;
    word_flag=0;
  }
  c_cur = grb_chars[getRandomInt(0, grb_chars.length-1)];
  garbageElementsArray[i] = `<span class=\"char\" id=\"${i}\">` + c_cur + "</span>";
  garbageCharsArray[i] = c_cur;
}




let text = '';
let text_idx = '';

let start_idx = getRandomInt(0x1000,0xFFFF-513);

for (i = 0; i < num_rows; i++) {
  text_idx += '0x' + start_idx.toString(16).toUpperCase() + '<br>';
  start_idx += 16;
  for (j = 0; j < num_chars; j++) {
    text += garbageElementsArray[i*num_chars+j];
  }
  text += "<br>";
}

const idxRight = document.querySelector(".idx_right");
const idxLeft = document.querySelector(".idx_left");
const textLeft = document.querySelector(".content_left");
const textRight = document.querySelector(".content_right");
const m_field = document.querySelector('.interface_field');
const serviceField = document.querySelector('.service');

idxLeft.innerHTML = text_idx;
textLeft.innerHTML = text;

text = '';
text_idx = '';

for (i = num_rows; i < num_rows*2; i++) {
  text_idx += '0x' + start_idx.toString(16).toUpperCase() + '<br>';
  start_idx += 16;
  for (j = 0; j < num_chars; j++) {
    text += garbageElementsArray[i*num_chars+j];
  }
  text += "<br>";
}

idxRight.innerHTML = text_idx;
textRight.innerHTML = text;

m_field.onmouseover = function onMouseOver(event) {
  let c_elem = event.target;
	let p_elem = event.relatedTarget;
	if (c_elem.className == 'char' || c_elem.className == 'word') {
		if (p_elem != null) {
			if (p_elem.className == 'char' || p_elem.className == 'word') {
				// �� ������, ���������� � ���������� �����.
				p_elem.style.color = fgCol;
				p_elem.style.background = bgCol;
			}
		}
		if (c_elem.className == 'char') {
			// ��� ������. ������� ��� ID.
			// console.log(`CHAR ${c_elem.id} color ${fg_col}`);
	    let c_id = c_elem.id;
      let left_border = Math.floor(c_id/num_chars)*num_chars; // ����� ������� ��������� � �������� ������� ��������
      let right_border = left_border + num_chars; 						// ������ ������� ��������� � �������� ������� ���������
	    let l_idx = left_brk.indexOf(garbageCharsArray[c_id]); 	// ���������, �������� �� ������ ����� �������
	    let r_idx = right_brk.indexOf(garbageCharsArray[c_id]);	// ���������, �������� �� ������ ������ �������
	    let i = 0;
	    let j = 0;
      if (l_idx >= 0) { // ��� ����� ������.
				let r_brk = right_brk[l_idx]; // �������� � ��� ������ ����
				for (i=c_id; i<right_border; i++) { // ���������� �� ������� ��������� ������ �� ������ ������� ��������� (������)
					if (isAlpha(garbageCharsArray[i])) { // ���������� �� �����, �������
						break;
					}
					if (garbageCharsArray[i] == r_brk) { // ����� ������ ������
							l_cheat = c_id; // ����� ������� ���� ���������
							r_cheat = i; 		// ������ ������� ���� ���������
						for (j = c_id; j<=i; j++) { // ������ ���� ���
							document.getElementById(j).style.background = bgColSelect;;
							document.getElementById(j).style.color = fgColSelect;;
						}
						break;
					}
				}
			} else if (r_idx >= 0) { // ��� ������ ������.
				let l_brk = left_brk[r_idx]; // �������� � ��� ����� ����
				for (i=c_id; i>left_border; i--) { // ���������� �� ������� ��������� ������ �� ����� ������� ��������� (������)
					if (isAlpha(garbageCharsArray[i])) { // ���������� �� �����, �������
						break;
					}
					if (garbageCharsArray[i] == l_brk) {
						l_cheat = i;		// ����� ������� ���� ���������
						r_cheat = c_id;	// ������ ������� ���� ���������
						for (j = i; j<=c_id; j++) { // ������ ���� ���
							document.getElementById(j).style.background = bgColSelect;
							document.getElementById(j).style.color = fgColSelect;
						}
						break;
					}
				}
			}
		}
		event.target.style.color = fgColSelect;
		event.target.style.background = bgColSelect;
	}
};

m_field.onmouseout = function onMouseOut(event) {
  let c_elem = event.target;
	let p_elem = event.relatedTarget;
	c_elem.style.color = fgCol;
	c_elem.style.background = bgCol;
	if (c_elem.className == 'char') {
		if (l_cheat >=0 || r_cheat>= 0) {
			for (i = l_cheat; i <= r_cheat; i++) { // ���� ��� ����������
				document.getElementById(i).style.background = bgCol;
				document.getElementById(i).style.color = fgCol;
			}
			l_cheat = -1; 		// ����� ������� ���� ��������� - ���� � ������������������
			r_cheat = -1; 		// ������ ������� ���� ��������� - ���� � ������������������
		}
	}
};

m_field.onclick = function onMouseClick(event) {
  let c_elem = event.target;
	let c_id = c_elem.id;
	if (c_elem.className == 'word') { // ���� �� �����
		if (c_id == game_data.password) { // �������!
			document.getElementById('tries').innerHTML = "WIN! WIN! WIN!";
			return;
		} else {
			game_data.num_tries--;
			numTries(game_data.num_tries);
			if (game_data.num_tries == 0) { // ��������, ������� ��������� !
				document.getElementById('tries').innerHTML = "LOSE! LOSE! LOSE!";
			}	else {
				let n_let = compareWords(c_id, game_data.password); // �������� ��������� � ������-�������!
				serviceField.innerHTML = `${c_id} ${n_let} of ${game_data.num_words}`;
			}
		}
	} else if (c_elem.className == 'char') {
		let i = 0;
		let flag = 0;
		if (l_cheat >= 0 && r_cheat >= 0) {
			for (i = l_cheat; i <= r_cheat; i++) {
				document.getElementById(i).innerHTML = '.';
				document.getElementById(i).style.background = '#383838';
				document.getElementById(i).style.color = '00DD00';
				garbageCharsArray[i] = '.';
			}
			let idx_dumb = getRandomInt(0, game_data.falsewords.length-1);
			let word_sel = document.getElementById(game_data.falsewords[idx_dumb]);
			game_data.falsewords.splice(idx_dumb, 1);
			let new_word = '';
			for (i = 0; i < word_sel.innerHTML.length; i++) {
				if (flag == 0 && word_sel.innerHTML[i] == '<') {
					flag = 1;
					new_word += word_sel.innerHTML[i];
					continue;
				}
				if (flag == 1 && word_sel.innerHTML[i] == '>') {
					new_word += word_sel.innerHTML[i];
					flag = 0;
					continue;
				}
				if (flag == 1) {
					new_word += word_sel.innerHTML[i];
					continue;
				}
				new_word += '<span id=\"dot\" class=\"char\">.</span>';
			}
			word_sel.innerHTML = new_word;
			word_sel.onmouseover = function onOverWordDummy(event) {};
			word_sel.onmouseout = function onOutWordDummy(event) {};
			word_sel.onclick = function onClickWordDummy(event) {};
			word_sel.className = '...';
			word_sel.id = '';
		}
	}
};

