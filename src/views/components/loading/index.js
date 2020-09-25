import { dispatchEvent, changeUrl } from "../../../util/helpers";

import "./style.scss";

export default class Loading {

    constructor(timeout) {
      this.timeout = timeout;
      this.render();
      this.initEventListeners();
    }

    initEventListeners() {
      this.element.addEventListener("pointerdown", e => {
        this.moving.classList.remove("rotate");
        this.animated.classList.add("scalemove");
        setTimeout(() => changeUrl('/menu'), 50);
      });
    }

    get template() {
      return `
        <div class="loading">
          <svg
             xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:svg="http://www.w3.org/2000/svg"
             xmlns="http://www.w3.org/2000/svg"
             width="100%"
             viewBox="-50 0 300 300"
             preserveAspectRatio="xMidYMid meet"
             class="loading__svg animate-centered"
             >
            <g>
              <path
                 class="rotate animate-centered moving-path"
                 d="m 111.12889,225.48471 c 0,-4.9861 0.10956,-6.6404 0.44591,-6.73175 0.24525,-0.0665 2.13145,-0.47913 4.19152,-0.91671 3.26514,-0.69356 7.57314,-1.92241 9.28895,-2.64969 0.42175,-0.17878 1.29049,1.09292 3.74561,5.48317 1.7581,3.14377 3.29052,5.7164 3.40543,5.71697 0.18145,9.1e-4 15.99402,-8.8305 16.32504,-9.11758 0.0685,-0.0593 -1.32561,-2.64714 -3.09787,-5.75059 l -3.22235,-5.64261 1.31423,-1.2163 c 4.84898,-4.48772 6.1866,-5.7915 7.83435,-7.63606 l 1.85313,-2.07455 5.71502,3.41228 c 3.14327,1.87676 5.83431,3.41141 5.98009,3.41035 0.28576,-0.002 9.84946,-16.05443 9.65629,-16.20777 -0.0639,-0.0507 -2.52422,-1.50693 -5.46723,-3.2359 -2.94301,-1.72897 -5.54386,-3.31827 -5.77968,-3.53179 -0.33034,-0.29906 -0.18669,-1.0708 0.62542,-3.36042 1.09396,-3.08404 2.59443,-8.75325 3.01359,-11.38607 l 0.24137,-1.51609 h 6.74646 6.74645 v -9.44555 -9.44557 l -6.83047,-0.0969 -6.83048,-0.0969 -0.85075,-3.81255 c -0.46792,-2.09689 -1.32499,-5.22718 -1.90461,-6.95618 -0.93394,-2.78597 -0.99137,-3.19025 -0.5046,-3.55346 0.30206,-0.22543 2.94602,-1.75044 5.87548,-3.38891 2.92946,-1.63848 5.32888,-3.07307 5.33204,-3.18795 0.005,-0.1746 -8.80759,-15.96974 -9.10195,-16.31414 -0.0534,-0.0625 -2.68626,1.34213 -5.85082,3.12135 -3.16452,1.77922 -5.83415,3.23496 -5.93244,3.23496 -0.18772,0 -10.4993,-10.44262 -10.50036,-10.6338 -3.1e-4,-0.0607 1.51473,-2.668334 3.36685,-5.794773 l 3.36746,-5.6844 -7.0239,-4.149185 c -3.86315,-2.281975 -7.53288,-4.455213 -8.15495,-4.82934 l -1.13104,-0.680242 -3.45328,5.74355 c -2.73124,4.542665 -3.57623,5.694581 -4.0415,5.509328 -2.71412,-1.080686 -8.40285,-2.764047 -11.55758,-3.420052 l -3.83483,-0.797418 v -6.895035 -6.895034 h -9.45328 -9.453249 v 6.895034 6.895035 l -3.834831,0.803979 c -2.109131,0.442198 -5.279557,1.27022 -7.045354,1.840065 -3.804254,1.227682 -2.985712,1.860828 -7.061355,-5.462068 -2.14964,-3.862344 -3.069125,-5.207176 -3.462091,-5.063803 -0.492124,0.179548 -15.716124,8.66274 -15.998823,8.914979 -0.06849,0.06107 1.336092,2.707914 3.121304,5.881849 1.785212,3.173947 3.245889,5.832721 3.245889,5.908411 0,0.0757 -2.506377,2.61237 -5.569746,5.63708 l -5.569695,5.49946 -5.388499,-3.18275 c -2.963648,-1.75052 -5.548294,-3.12947 -5.743705,-3.06434 -0.407388,0.13579 -9.464397,15.21722 -9.472041,15.77254 -0.0052,0.20123 2.402329,1.78082 5.34468,3.51019 2.942349,1.72937 5.430943,3.27577 5.530204,3.43643 0.09932,0.16068 -0.371462,1.95215 -1.046109,3.98108 -0.674644,2.02891 -1.585569,5.41461 -2.024137,7.52375 l -0.797448,3.83481 H 29.555617 22.66058 v 9.45327 9.45326 h 6.924846 6.924795 l 0.241374,1.51609 c 0.357604,2.24604 1.82842,7.98903 2.671676,10.43138 0.884173,2.5612 1.47413,1.95026 -5.788139,5.99407 -2.891139,1.60985 -5.25887,3.02517 -5.261724,3.14518 -0.0052,0.19558 8.822975,16.00736 9.111481,16.32022 0.06539,0.071 2.690887,-1.33368 5.834459,-3.12136 3.14357,-1.78769 5.85331,-3.25034 6.021717,-3.25034 0.168416,0 1.155711,1.04707 2.194024,2.32681 1.03831,1.27975 3.482116,3.83078 5.430689,5.66895 l 3.542856,3.34213 -3.431468,5.79773 c -2.796159,4.72445 -3.344233,5.87788 -2.96049,6.23068 0.710976,0.65362 15.199287,9.09587 15.610037,9.09587 0.196431,0 1.747453,-2.36779 3.446652,-5.26174 1.699248,-2.89394 3.279417,-5.46685 3.511518,-5.71759 0.339666,-0.36695 1.252577,-0.17828 4.680019,0.96726 2.341896,0.78273 5.742892,1.70362 7.557707,2.04645 l 3.299752,0.62331 v 6.70332 6.70333 h 9.453249 9.45328 z M 97.573251,202.83781 C 84.438613,201.61334 72.670744,195.72115 64.266469,186.16109 48.75289,168.51403 47.86775,142.5266 62.129465,123.41996 c 2.384799,-3.19497 7.43098,-8.09892 10.816895,-10.51199 5.344065,-3.80861 12.774641,-7.02727 19.298421,-8.35938 4.16593,-0.85065 12.681349,-1.04852 16.922079,-0.39323 18.85618,2.91373 34.23963,15.80244 39.95984,33.4796 3.21843,9.94577 3.16839,21.59591 -0.13457,31.34171 -5.1106,15.07937 -17.07683,26.85441 -32.17936,31.66517 -6.04658,1.92608 -13.2793,2.75162 -19.239529,2.19597 z"
              />
              <path
                 d="m 101.20176,112.91532 c -13.774557,0.03 -26.200564,5.34772 -29.244413,20.57018 -3.595452,10.97068 5.513253,19.81677 1.789449,27.00328 -0.995186,1.71316 -0.467973,6.6172 0.470278,7.71583 2.709636,1.92354 4.506483,5.59956 5.309214,7.40255 1.087613,2.51125 2.191395,3.891 6.004514,2.2251 0.27332,-0.11216 1.385033,-0.1024 1.335208,0.64989 -1.281977,4.12053 -1.022437,8.33222 -0.983092,12.4955 0.04664,0.80537 2.601551,1.14849 2.698769,0.92165 0.769793,-1.24666 0.291157,-2.18944 0.817668,-3.31556 0.604221,-1.05931 1.410991,-0.45299 1.399011,-0.0167 0.127716,1.86257 0.207831,2.96109 1.547892,2.96109 0.378225,0.0343 0.926025,0.006 1.245409,-0.0637 0.804063,-0.17642 0.571321,-0.7423 1.098883,-2.39864 0.288799,-0.88427 1.461147,-0.75405 1.736952,-0.15362 0.480996,1.09369 -0.251995,2.67114 1.862196,2.50499 2.142512,0.0155 0.897398,-1.50776 1.715682,-2.53335 0.71408,-0.73466 1.80191,-0.44387 2.09143,0.0212 0.4699,0.81412 -0.50423,2.32768 1.5597,2.33011 1.70251,0.0585 1.08282,-1.52605 1.53374,-2.36555 0.36938,-0.64541 1.52221,-1.11767 1.87163,-0.026 0.36028,1.13336 -0.0278,2.53649 1.97562,2.48372 1.8442,-0.0226 1.52511,-1.41975 2.05364,-2.53571 0.4002,-1.01475 2.03037,-0.97366 2.10089,0.005 l 0.36864,2.7862 c -0.0318,0.36665 3.22072,-0.0906 3.29969,-0.30156 1.08734,-6.32407 -1.23484,-11.69786 -1.14209,-12.69125 0,0 0.64803,-1.34995 1.29368,-0.97525 3.31268,1.92249 5.82429,0.0806 6.6483,-1.72721 0.68398,-0.63918 3.81782,-6.30935 6.2561,-9.04643 1.07001,-2.22338 0.47479,-4.37837 -0.23895,-6.35228 -3.26053,-9.46045 2.31483,-17.15603 1.05618,-24.97116 -3.30633,-15.34206 -15.75727,-22.63181 -29.53182,-22.60188 z m -16.3125,44.56604 c 0.890623,-0.003 1.38444,0.17944 1.70859,0.29539 3.670882,1.3131 9.337377,3.95872 10.84943,5.65277 0.06062,0.23964 0.01652,0.82146 -0.803491,1.33521 -0.385637,0.24159 -7.564525,3.56129 -12.182269,3.99379 -0.697635,0.17805 -1.795372,-0.89622 -2.074887,-1.4179 -2.367973,-4.41972 -3.719828,-8.78265 2.502627,-9.85926 z m 34.35615,0.23632 c 6.22244,1.07661 4.87061,5.43718 2.50263,9.85688 -0.27952,0.5217 -1.3749,1.59832 -2.07253,1.42029 -4.61774,-0.4325 -11.79664,-3.75221 -12.18226,-3.9938 -0.82008,-0.51375 -0.86417,-1.09795 -0.80349,-1.33757 1.51204,-1.69405 7.17616,-4.33731 10.84705,-5.65041 0.32415,-0.11595 0.81796,-0.29927 1.7086,-0.29539 z m -17.28802,10.40894 c 2.18948,1.08276 3.69968,7.72942 3.67477,8.17667 -2.4e-4,0.38413 -0.44329,1.49851 -1.96619,2.1694 -0.10805,0.006 -0.13315,-0.0329 -0.18433,-0.0968 -1.09466,-1.36766 -1.08692,-1.47795 -1.56679,-1.46518 -0.27454,0.007 -0.55319,0.40448 -1.2005,1.36829 -0.10296,0.15327 -0.09,0.15428 -0.26941,0.15596 -1.207248,-0.28194 -1.998552,-1.23139 -2.292306,-2.1316 -0.108499,-0.58094 1.845691,-7.4466 3.804756,-8.17665 z"
             />
            </g>
          </svg>
        </div>
      `
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
      this.animated = this.element.querySelector(".loading__svg");
      this.moving = this.element.querySelector(".moving-path");
      return this.element;
    }

    show(target) {
      const parent = target || document.body;
      if (this.timeout) {
        setTimeout(() => dispatchEvent(this.element, "loadingEnd"), this.timeout);
      }
      parent.append(this.element);
    }

    remove() {
      this.element.remove()
    }

    destroy() {
      this.remove();
    }
}
