export const tickUpdate = cb => {
  let ticking = false;

  const update = e => {
    cb(e);
    ticking = false;
  };

  const requestTick = e => {
    if (!ticking) {
      requestAnimationFrame(() => update(e));
      ticking = true;
    }
  };

  return requestTick;
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const mapRange = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const timer = (time = 2000, error = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    }, time);
  });
};

export const formToObject = form => {
  const fd = new FormData(form);
  return [...fd.entries()].reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: curr[1]
    }),
    {}
  );
};

export const onWindowResize = cb => {
  window.addEventListener("resize", cb, {
    passive: true
  });

  window.addEventListener("orientationchange", cb, {
    passive: true
  });

  return () => {
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", cb);
  };
};

export const registerBootlegVH = () => {
  const setVh = () =>
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight / 100}px`
    );

  const cb = tickUpdate(() => {
    setVh();
  });

  setVh();

  return onWindowResize(cb);
};

export const debounce = (cb, time = 1000) => {
  let timer = 0;

  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...arguments);
    }, time);
  };
};

export const throttle = (cb, time = 1000) => {
  let timer;

  return function() {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      cb(...arguments);
      timer = undefined;
    }, time);
  };
};

export const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = src;
  });
};

export const breakpointListen = (query, cb) => {
  const mq = window.matchMedia(query);
  const onCall = ev => {
    cb(ev.matches);
  };
  mq.addListener(onCall);

  cb(mq.matches);

  return () => mq.removeListener(onCall);
};

export const listenCb = (el, evt, cb, opts = false) => {
  el.addEventListener(evt, cb, opts);
  return () => el.removeEventListener(evt, cb);
};

export const getCoords = elem => {
  // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left),
    height: box.height,
    width: box.width
  };
};

export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
};

const TWEETS = [() => `Hey this is a tweet, https://mschf.com/`];

export const tweeter = () => {
  const generateTweet = () => {
    return TWEETS[Math.floor(Math.random() * TWEETS.length)]();
  };

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    generateTweet()
  )}`;
};
