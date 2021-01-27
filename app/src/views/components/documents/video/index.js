import './style.scss';

import videojs from 'video.js';
import { canRenderAsyncWithComponents, documentMixin } from '../../../../mixins/document';
//TODO: iamge not found

class VideoDoc {

  constructor({
    name,
    data,
    timer
  } = props) {
    this.name = name;
    this.video = `/assets/video/${data}`;
    this.timer = timer;
  }

  initComponents() {
    this.initTimer();
  }

  initVideoPlayer() {
    const videoPlayer = videojs(this.subElements.video);
    videoPlayer.src(this.video);
  }

  template() {
    return `
      <div class="content">
        <div class="content__header" data-element="header"></div>
        <div class="content__main" data-element="main">
          <video id="videoPlayer"
                 data-element="video"
                 ref="Player"
                 class="vjs-default-skin"
                 controls preload="auto"
                 width="640"
                 height="268">
          </video>
        </div>
        <div class="content__footer" data-element="footer"></div>
      </div>
    `;
  }

}

const getVideoDoc = (props) => {
  const video = new VideoDoc(props);
  Object.assign(
    video,
    documentMixin,
    canRenderAsyncWithComponents
  )
  video.render();
  video.initVideoPlayer();
  return video;
}

export default getVideoDoc;
