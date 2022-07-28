<template>
  <div class="content">
    <div class="blur" />
    <video ref="video" src="/test.mp4" muted autoplay />
    <canvas ref="canvas" />
  </div>
</template>

<script>
import {
  listenCb,
  mapRange,
  onWindowResize,
  tickUpdate
} from "~/assets/js/utils";
import { makeNoise2D } from "fast-simplex-noise";

const setPixel = (id, x, y, rgb) => {
  const base = id.width * y * 4 + x * 4;
  id.data[base + 0] = rgb[0] || 0;
  id.data[base + 1] = rgb[1] || 0;
  id.data[base + 2] = rgb[2] || 0;
  id.data[base + 3] = 255;
};

export default {
  data() {
    return {
      width: -1,
      height: -1
    };
  },
  computed: {
    canvas() {
      return this.$refs.canvas;
    },
    ctx() {
      return this.canvas.getContext("2d");
    }
  },
  mounted() {
    listenCb(document, "mousemove", this.onMove.bind(this));

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.noise = makeNoise2D();

    this.resize();
    onWindowResize(tickUpdate(this.onResize.bind(this)));

    this.onUpdate();
  },
  methods: {
    onMove(e) {
      this.$refs.video.playbackRate = mapRange(e.pageY, 0, this.height, 1, 10);
    },
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.resize();
    },
    resize() {
      const dpr = window.devicePixelRatio;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;

      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);
    },
    onUpdate() {
      // const dpr = window.devicePixelRatio;
      const id = this.ctx.createImageData(this.width, this.height);

      for (let x = 0; x < id.width; x++) {
        for (let y = 0; y < id.height; y++) {
          // const r =
          //   (this.noise(
          //     x * (Math.random() * 1000),
          //     y * (Math.random() * 1000)
          //   ) +
          //     0.5) *
          //   255;
          const r = Math.random() * 255;
          setPixel(id, x, y, [r, r, r]);
        }
      }

      this.ctx.putImageData(id, 0, 0);

      requestAnimationFrame(() => {
        this.onUpdate();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  .blur {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    backdrop-filter: blur(120px);
    z-index: 10;
  }

  canvas {
    position: absolute;

    top: 0;
    left: 0;

    z-index: 15;

    transform-origin: top left;
    transform: scale(2);

    image-rendering: pixelated;

    mix-blend-mode: screen;
    opacity: 0.1;
  }

  video {
    width: 100vw;
    height: 100vh;

    object-fit: cover;

    filter: saturate(200%);
  }
}
</style>
