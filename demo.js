const PLAYER_VERSION = "20261028-add-k4-match-013";

let interactivePlayerCount = 0;

const stairs26Scenes = [
  {
    id: "stairs26-example-1",
    title: "Example #1",
    sourceCount: 2,
    mixture: "assets/demos/stairs26/example-2/mixture.webm",
    mixtureAudio: "assets/demos/stairs26/example-2/audio/mixture-w.wav",
    queries: [
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        predicted: "assets/demos/stairs26/example-2/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-2/audio/domestic-sounds-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-2/domestic-sounds-foa-energy.mp4",
      },
      {
        id: "female-speech",
        label: "Female speech",
        predicted: "assets/demos/stairs26/example-2/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-2/audio/female-speech-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-2/female-speech-foa-energy.mp4",
      },
    ],
  },
  {
    id: "stairs26-example-2",
    title: "Example #2",
    sourceCount: 2,
    mixture: "assets/demos/stairs26/example-1/mixture.webm",
    mixtureAudio: "assets/demos/stairs26/example-1/audio/mixture-w.wav",
    queries: [
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        predicted: "assets/demos/stairs26/example-1/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-1/audio/domestic-sounds-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-1/domestic-sounds-foa-energy.mp4",
      },
      {
        id: "male-speech",
        label: "Male speech",
        predicted: "assets/demos/stairs26/example-1/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-1/audio/male-speech-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-1/male-speech-foa-energy.mp4",
      },
    ],
  },
  {
    id: "stairs26-example-3",
    title: "Example #3",
    sourceCount: 2,
    mixture: "assets/demos/stairs26/example-3/mixture.webm",
    mixtureAudio: "assets/demos/stairs26/example-3/audio/mixture-w.wav",
    queries: [
      {
        id: "laughter",
        label: "Laughter",
        predicted: "assets/demos/stairs26/example-3/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-3/audio/laughter-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-3/laughter-foa-energy.mp4",
      },
      {
        id: "male-speech",
        label: "Male speech",
        predicted: "assets/demos/stairs26/example-3/mixture.webm",
        predictedAudio: "assets/demos/stairs26/example-3/audio/male-speech-predicted-foa.wav",
        energy: "assets/demos/stairs26/example-3/male-speech-foa-energy.mp4",
      },
    ],
  },
];

const syntheticScenes = [
  {
    id: "synthetic-k2",
    title: "Example #1",
    initialYaw: 130,
    mixture: "assets/demos/synthetic/k2/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k2/audio/mixture-w.wav",
    queries: [
      {
        id: "music",
        label: "Music",
        groundTruth: "assets/demos/synthetic/k2/music-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k2/audio/music-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2/music-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k2/audio/music-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2/music-foa-energy.mp4",
      },
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k2/laughter-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k2/audio/laughter-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2/laughter-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k2/audio/laughter-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2/laughter-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k2-natural-006",
    title: "Example #2",
    initialYaw: -60,
    mixture: "assets/demos/synthetic/k2-natural-006/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k2-natural-006/audio/mixture-w.wav",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k2-natural-006/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k2-natural-006/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2-natural-006/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k2-natural-006/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2-natural-006/bell-foa-energy.mp4",
      },
      {
        id: "door-or-cupboard",
        label: "Door/Cupboard",
        groundTruth: "assets/demos/synthetic/k2-natural-006/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k2-natural-006/audio/door-or-cupboard-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2-natural-006/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k2-natural-006/audio/door-or-cupboard-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2-natural-006/door-or-cupboard-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k3-semantic-001",
    title: "Example #3",
    initialYaw: -35,
    mixture: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k3-semantic-001/audio/mixture-w.wav",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k3-semantic-001/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k3-semantic-001/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3-semantic-001/bell-foa-energy.mp4",
      },
      {
        id: "door-or-cupboard",
        label: "Door/Cupboard",
        groundTruth: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k3-semantic-001/audio/door-or-cupboard-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k3-semantic-001/audio/door-or-cupboard-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3-semantic-001/door-or-cupboard-foa-energy.mp4",
      },
      {
        id: "knock",
        label: "Knock",
        groundTruth: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k3-semantic-001/audio/knock-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3-semantic-001/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k3-semantic-001/audio/knock-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3-semantic-001/knock-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k3",
    title: "Example #4",
    initialYaw: 15,
    mixture: "assets/demos/synthetic/k3/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k3/audio/mixture-w.wav",
    queries: [
      {
        id: "water-tap",
        label: "Water tap",
        groundTruth: "assets/demos/synthetic/k3/water-tap-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/water-tap-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/water-tap-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/water-tap-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/water-tap-foa-energy.mp4",
      },
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k3/bell-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/bell-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/bell-foa-energy.mp4",
      },
      {
        id: "door-or-cupboard",
        label: "Door/Cupboard",
        groundTruth: "assets/demos/synthetic/k3/door-or-cupboard-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/door-or-cupboard-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/door-or-cupboard-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/door-or-cupboard-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/door-or-cupboard-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k4-match-013",
    title: "Example #5",
    initialYaw: 0,
    mixture: "assets/demos/synthetic/k4-match-013/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k4-match-013/audio/mixture-w.wav",
    queries: [
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        groundTruth: "assets/demos/synthetic/k4-match-013/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k4-match-013/audio/domestic-sounds-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4-match-013/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k4-match-013/audio/domestic-sounds-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4-match-013/domestic-sounds-foa-energy.mp4",
      },
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k4-match-013/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k4-match-013/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4-match-013/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k4-match-013/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4-match-013/bell-foa-energy.mp4",
      },
      {
        id: "male-speech",
        label: "Male speech",
        groundTruth: "assets/demos/synthetic/k4-match-013/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k4-match-013/audio/male-speech-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4-match-013/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k4-match-013/audio/male-speech-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4-match-013/male-speech-foa-energy.mp4",
      },
      {
        id: "knock",
        label: "Knock",
        groundTruth: "assets/demos/synthetic/k4-match-013/mixture.webm",
        groundTruthAudio: "assets/demos/synthetic/k4-match-013/audio/knock-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4-match-013/mixture.webm",
        predictedAudio: "assets/demos/synthetic/k4-match-013/audio/knock-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4-match-013/knock-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k4",
    title: "Example #6",
    initialYaw: -59,
    mixture: "assets/demos/synthetic/k4/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k4/audio/mixture-w.wav",
    queries: [
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k4/laughter-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/laughter-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/laughter-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/laughter-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/laughter-foa-energy.mp4",
      },
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        groundTruth: "assets/demos/synthetic/k4/domestic-sounds-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/domestic-sounds-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/domestic-sounds-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/domestic-sounds-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/domestic-sounds-foa-energy.mp4",
      },
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k4/bell-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/bell-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/bell-foa-energy.mp4",
      },
      {
        id: "telephone",
        label: "Telephone",
        groundTruth: "assets/demos/synthetic/k4/telephone-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/telephone-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/telephone-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/telephone-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/telephone-foa-energy.mp4",
      },
    ],
  },
];

const createPlayer = (label) => {
  const panel = document.createElement("div");
  panel.className = "media-panel scene-output";

  const heading = document.createElement("p");
  heading.className = "media-label";
  heading.textContent = label;

  const frame = document.createElement("iframe");
  frame.className = "player-frame";
  frame.dataset.playerId = `interactive-player-${++interactivePlayerCount}`;
  frame.loading = "lazy";
  frame.allow = "autoplay; fullscreen";
  frame.setAttribute("allowfullscreen", "");
  frame.title = label;

  panel.append(heading, frame);
  return { panel, frame };
};

const createFlatVideo = (label) => {
  const panel = document.createElement("div");
  panel.className = "media-panel scene-output";

  const heading = document.createElement("p");
  heading.className = "media-label";
  heading.textContent = label;

  const player = document.createElement("div");
  player.className = "flat-player";

  const video = document.createElement("video");
  video.className = "flat-video";
  video.playsInline = true;
  video.preload = "auto";
  video.setAttribute("aria-label", label);
  video.appendChild(document.createTextNode("Your browser does not support embedded video."));

  const controls = document.createElement("div");
  controls.className = "flat-player-controls";

  const rewindButton = document.createElement("button");
  rewindButton.className = "flat-player-button";
  rewindButton.type = "button";
  rewindButton.textContent = "Rewind";

  const playButton = document.createElement("button");
  playButton.className = "flat-player-button flat-player-play";
  playButton.type = "button";
  playButton.textContent = "Play";

  const fullscreenButton = document.createElement("button");
  fullscreenButton.className = "flat-player-button flat-player-fullscreen";
  fullscreenButton.type = "button";
  fullscreenButton.title = "Fullscreen";
  fullscreenButton.setAttribute("aria-label", "Fullscreen");
  fullscreenButton.textContent = "\u26F6";

  const syncPlayState = () => {
    playButton.textContent = video.paused ? "Play" : "Pause";
  };

  playButton.addEventListener("click", async () => {
    try {
      if (video.paused) {
        if (video.ended) video.currentTime = 0;
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error(error);
    }
  });

  rewindButton.addEventListener("click", async () => {
    try {
      video.currentTime = 0;
      await video.play();
    } catch (error) {
      console.error(error);
    }
  });

  fullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (player.requestFullscreen) {
        await player.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  });

  video.addEventListener("play", syncPlayState);
  video.addEventListener("pause", syncPlayState);
  video.addEventListener("ended", syncPlayState);

  controls.append(rewindButton, playButton);
  player.append(video, controls, fullscreenButton);
  panel.append(heading, player);
  return { panel, video };
};

const pausePlayer = (frame) => {
  if (frame.contentWindow) {
    frame.contentWindow.postMessage({
      type: "avqtss-pause",
      playerId: frame.dataset.playerId,
    }, window.location.origin);
  }
};

const setPlayerSource = (frame, video, audio, label, initialYaw = 0) => {
  pausePlayer(frame);
  const parameters = new URLSearchParams({
    video,
    audio,
    label,
    yaw: String(initialYaw),
    playerId: frame.dataset.playerId,
    v: PLAYER_VERSION,
  });
  const source = `demo-player.html?${parameters.toString()}`;
  frame.dataset.playerSrc = source;
  if (frame.dataset.playerActive === "true") frame.src = source;
  frame.title = `${label}, interactive 360-degree video`;
};

const setFlatVideoSource = (video, source, label) => {
  video.pause();
  const playButton = video.closest(".flat-player")?.querySelector(".flat-player-play");
  if (playButton) playButton.textContent = "Play";
  video.removeAttribute("src");
  video.replaceChildren();

  const appendSource = (path, type) => {
    const url = new URL(path, window.location.href);
    url.searchParams.set("v", PLAYER_VERSION);
    const sourceElement = document.createElement("source");
    sourceElement.src = url.href;
    sourceElement.type = type;
    video.appendChild(sourceElement);
  };

  if (source.endsWith(".mp4")) {
    appendSource(source.replace(/\.mp4$/, ".webm"), "video/webm");
    appendSource(source, "video/mp4");
  } else {
    appendSource(source, "video/webm");
  }
  video.appendChild(document.createTextNode("Your browser does not support embedded video."));
  video.setAttribute("aria-label", label);
  video.load();
};

const renderScene = (scene) => {
  const article = document.createElement("article");
  article.className = "interactive-scene";
  article.id = scene.id;

  const heading = document.createElement("header");
  heading.className = "scene-heading";
  const headingTitle = document.createElement("h4");
  const sourceCount = scene.sourceCount || scene.queries.length;
  const sourceSummary = document.createElement("span");
  sourceSummary.className = "scene-source-count";
  sourceSummary.textContent = `(${sourceCount} sources)`;
  headingTitle.append(scene.title, " ", sourceSummary);
  heading.appendChild(headingTitle);

  const controls = document.createElement("div");
  controls.className = "scene-controls";

  const mixture = createPlayer("Input video and mono mixture");
  mixture.panel.classList.remove("scene-output");
  setPlayerSource(
    mixture.frame,
    scene.mixture,
    scene.mixtureAudio,
    `${scene.title}: Input video and mono mixture`,
    scene.initialYaw,
  );

  const queryPanel = document.createElement("div");
  queryPanel.className = "query-panel";

  const queryLabel = document.createElement("p");
  queryLabel.className = "query-label";
  queryLabel.textContent = "Class query:";

  const tabs = document.createElement("div");
  tabs.className = "query-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-orientation", "vertical");
  tabs.setAttribute("aria-label", `${scene.title} class queries`);

  queryPanel.append(queryLabel, tabs);
  controls.append(mixture.panel, queryPanel);

  const outputs = document.createElement("div");
  outputs.className = "scene-outputs";
  const hasGroundTruth = scene.queries.every(
    (query) => query.groundTruth && query.groundTruthAudio,
  );
  const groundTruth = hasGroundTruth ? createPlayer("Ground-truth target") : null;
  const predicted = createPlayer("Predicted target");
  const energy = createFlatVideo("Predicted target with FOA energy");
  if (groundTruth) {
    outputs.append(groundTruth.panel);
  } else {
    outputs.classList.add("scene-outputs--two");
  }
  outputs.append(predicted.panel, energy.panel);

  const selectQuery = (query, selectedButton) => {
    tabs.querySelectorAll(".query-tab").forEach((button) => {
      const selected = button === selectedButton;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    if (groundTruth) {
      setPlayerSource(
        groundTruth.frame,
        query.groundTruth,
        query.groundTruthAudio,
        `Ground-truth target: ${query.label}`,
        scene.initialYaw,
      );
    }
    setPlayerSource(
      predicted.frame,
      query.predicted,
      query.predictedAudio,
      `Predicted target: ${query.label}`,
      scene.initialYaw,
    );
    setFlatVideoSource(
      energy.video,
      query.energy,
      `Predicted target with FOA energy: ${query.label}`,
    );
  };

  scene.queries.forEach((query, index) => {
    const button = document.createElement("button");
    button.className = "query-tab";
    button.type = "button";
    button.id = `${scene.id}-${query.id}-tab`;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(index === 0));
    button.tabIndex = index === 0 ? 0 : -1;
    button.textContent = query.label;
    button.addEventListener("click", () => selectQuery(query, button));
    button.addEventListener("keydown", (event) => {
      const previousKeys = ["ArrowLeft", "ArrowUp"];
      const nextKeys = ["ArrowRight", "ArrowDown"];
      if (!previousKeys.includes(event.key) && !nextKeys.includes(event.key)) return;
      event.preventDefault();
      const buttons = [...tabs.querySelectorAll(".query-tab")];
      const offset = nextKeys.includes(event.key) ? 1 : -1;
      const nextIndex = (buttons.indexOf(button) + offset + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    });
    tabs.appendChild(button);
  });

  article.append(heading, controls, outputs);
  selectQuery(scene.queries[0], tabs.querySelector(".query-tab"));
  return article;
};

const sceneGroups = [
  ["#stairs26-scenes", stairs26Scenes],
  ["#synthetic-scenes", syntheticScenes],
];

sceneGroups.forEach(([selector, scenes]) => {
  const sceneList = document.querySelector(selector);
  if (!sceneList) return;
  scenes.forEach((scene) => sceneList.appendChild(renderScene(scene)));
});

const datasets = [
  {
    button: document.querySelector("#btn-stairs26"),
    section: document.querySelector("#section-stairs26"),
  },
  {
    button: document.querySelector("#btn-synthetic"),
    section: document.querySelector("#section-synthetic"),
  },
];

const setPlayerActive = (frame, active) => {
  frame.dataset.playerActive = String(active);
  if (active) {
    const source = frame.dataset.playerSrc;
    if (source && frame.getAttribute("src") !== source) frame.src = source;
    return;
  }

  pausePlayer(frame);
  if (frame.getAttribute("src") && frame.getAttribute("src") !== "about:blank") {
    frame.src = "about:blank";
  }
};

const setScenePlayersActive = (scene, active) => {
  scene.querySelectorAll("iframe.player-frame").forEach((frame) => {
    setPlayerActive(frame, active);
  });
  if (!active) {
    scene.querySelectorAll("video.flat-video").forEach((video) => video.pause());
  }
};

const sceneIsNearViewport = (scene) => {
  const section = scene.closest(".dataset-section");
  if (!section || section.hidden) return false;
  const margin = 200;
  const bounds = scene.getBoundingClientRect();
  return bounds.bottom >= -margin && bounds.top <= window.innerHeight + margin;
};

const refreshDatasetPlayers = (section) => {
  section.querySelectorAll(".interactive-scene").forEach((scene) => {
    setScenePlayersActive(scene, sceneIsNearViewport(scene));
  });
};

if ("IntersectionObserver" in window) {
  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target.closest(".dataset-section");
      setScenePlayersActive(entry.target, entry.isIntersecting && section && !section.hidden);
    });
  }, { rootMargin: "200px 0px" });

  document.querySelectorAll(".interactive-scene").forEach((scene) => {
    sceneObserver.observe(scene);
  });
} else {
  datasets.forEach(({ section }) => refreshDatasetPlayers(section));
}

const selectDataset = (selectedDataset, shouldScroll = true) => {
  datasets.forEach((dataset) => {
    const selected = dataset === selectedDataset;
    dataset.button.classList.toggle("active", selected);
    dataset.button.setAttribute("aria-pressed", String(selected));
    dataset.section.hidden = !selected;
    if (!selected) {
      dataset.section.querySelectorAll(".interactive-scene").forEach((scene) => {
        setScenePlayersActive(scene, false);
      });
    }
  });

  if (shouldScroll) {
    selectedDataset.section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  requestAnimationFrame(() => refreshDatasetPlayers(selectedDataset.section));
};

if (datasets.every(({ button, section }) => button && section)) {
  datasets.forEach((dataset) => {
    dataset.button.addEventListener("click", () => selectDataset(dataset));
  });
  selectDataset(datasets[0], false);
}

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;
  if (!event.data || event.data.type !== "avqtss-player-started") return;
  document.querySelectorAll("iframe.player-frame").forEach((frame) => {
    const isCurrentPlayer = event.data.playerId
      ? frame.dataset.playerId === event.data.playerId
      : frame.contentWindow === event.source;
    if (!isCurrentPlayer) pausePlayer(frame);
  });
  document.querySelectorAll("video.flat-video").forEach((video) => video.pause());
});

document.addEventListener("play", (event) => {
  if (!(event.target instanceof HTMLVideoElement) || !event.target.classList.contains("flat-video")) {
    return;
  }
  document.querySelectorAll("iframe.player-frame").forEach(pausePlayer);
  document.querySelectorAll("video.flat-video").forEach((video) => {
    if (video !== event.target) video.pause();
  });
}, true);
