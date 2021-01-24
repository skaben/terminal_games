import './style.scss';

import WaveSurfer from 'wavesurfer.js';
import { canRenderAsyncWithComponents, documentMixin } from '../../../../mixins/document';
//TODO: iamge not found

class AudioDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.audio = data;
    this.timer = timer;
  }

  initComponents() {
    this.initTimer();
  }

  setPlayButton(value) {
    this.subElements.play.textContent = value;
  }

  initEventListeners() {
    this.subElements.play.addEventListener("pointerdown", () => {
      this.wavesurfer.playPause();
    });
    this.subElements.stop.addEventListener("pointerdown", () => {
      this.wavesurfer.stop();
    });
  }

  initWaveSurfer() {
    const wavesurfer = WaveSurfer.create({
      container: this.subElements.wavesurfer,
      cursorColor: 'white',
      waveColor: 'rgba(55, 55, 55, 0.75)',
      progressColor: 'rgba(235, 255, 223, 0.75)',
      height: 320
    });

    try {
      wavesurfer.load(`/assets/audio/${this.audio}`);
      this.wavesurfer = wavesurfer;
      this.wavesurfer.on('play', () => this.setPlayButton('PAUSE'));
      this.wavesurfer.on('pause', () => this.setPlayButton('PLAY'));
      this.wavesurfer.on('finish', () => this.setPlayButton('PLAY'));
    } catch (err) {
      console.error(`audio file cannot be loaded: ${err}`);
    }
  }

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <div class="audio-wrapper" data-element="wavesurfer"></div>
          <div class="audio-controls">
            <div class="button audio-button audio-button-play" data-element="play">PLAY</div>
            <div class="button audio-button audio-button-stop" data-element="stop">STOP</div>
          </div>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}

const getAudioDoc = (props) => {
  const audio = new AudioDoc(props);
  Object.assign(
    audio,
    documentMixin,
    canRenderAsyncWithComponents
  )
  audio.render();
  // because wavesurfer cannot be created without container and assigned later
  audio.initWaveSurfer();
  audio.initEventListeners();
  return audio;
}

export default getAudioDoc;
