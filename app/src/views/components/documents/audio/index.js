import './style.scss';

import TextBar from '../../elements/textbar';
import Timer from '../../elements/timer';
import { canRenderAsyncWithComponents, documentMixin } from '../../../../mixins/document';
//TODO: iamge not found

class AudioDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.data = data;
    this.timer = timer;
  }

  initComponents() {
    if (this.timer && this.timer > 0) {
      this.nav = {};
      this.components['footer'] = new Timer({timer: timer, message: 'document blocked... '});
    }

    this.components['header'] = new TextBar("header", `image document ${this.name}` || '', this.nav);
    this.initWaveSurfer();
  }

  initWaveSurfer() {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'white',
      progressColor: 'white'
    });
    try {
      wavesurfer.load(this.data);
      wavesurfer.on('ready', () => wavesurfer.play());
    } catch (err) {
      console.error(`audio file cannot be loaded: ${err}`);
    }
  }

  template() {
    return `
      <div class="audio-page">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <div id="waveform" class="audio-wrapper"></div>
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
  return audio;
}

export default getAudioDoc;
