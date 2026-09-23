const PLAYER_VERSION = "20260923-visual-2";

const syntheticScenes = [
  {
    id: "synthetic-k2",
    title: "Example #1",
    sources: "Laughter, music",
    initialYaw: 180,
    mixture: "assets/demos/synthetic/k2/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k2/audio/mixture-w.wav",
    queries: [
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k2/laughter-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k2/audio/laughter-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2/laughter-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k2/audio/laughter-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2/laughter-foa-energy.webm",
      },
      {
        id: "music",
        label: "Music",
        groundTruth: "assets/demos/synthetic/k2/music-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k2/audio/music-gt-foa.wav",
        predicted: "assets/demos/synthetic/k2/music-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k2/audio/music-predicted-foa.wav",
        energy: "assets/demos/synthetic/k2/music-foa-energy.webm",
      },
    ],
  },
  {
    id: "synthetic-k3",
    title: "Example #2",
    sources: "Bell, door or cupboard, water tap",
    mixture: "assets/demos/synthetic/k3/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k3/audio/mixture-w.wav",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k3/bell-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/bell-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/bell-foa-energy.webm",
      },
      {
        id: "door-or-cupboard",
        label: "Door or cupboard",
        groundTruth: "assets/demos/synthetic/k3/door-or-cupboard-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/door-or-cupboard-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/door-or-cupboard-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/door-or-cupboard-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/door-or-cupboard-foa-energy.webm",
      },
      {
        id: "water-tap",
        label: "Water tap",
        groundTruth: "assets/demos/synthetic/k3/water-tap-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k3/audio/water-tap-gt-foa.wav",
        predicted: "assets/demos/synthetic/k3/water-tap-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k3/audio/water-tap-predicted-foa.wav",
        energy: "assets/demos/synthetic/k3/water-tap-foa-energy.webm",
      },
    ],
  },
  {
    id: "synthetic-k4",
    title: "Example #3",
    sources: "Bell, telephone, laughter, domestic sounds",
    initialYaw: 180,
    mixture: "assets/demos/synthetic/k4/mixture.webm",
    mixtureAudio: "assets/demos/synthetic/k4/audio/mixture-w.wav",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k4/bell-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/bell-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/bell-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/bell-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/bell-foa-energy.webm",
      },
      {
        id: "telephone",
        label: "Telephone",
        groundTruth: "assets/demos/synthetic/k4/telephone-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/telephone-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/telephone-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/telephone-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/telephone-foa-energy.webm",
      },
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k4/laughter-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/laughter-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/laughter-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/laughter-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/laughter-foa-energy.webm",
      },
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        groundTruth: "assets/demos/synthetic/k4/domestic-sounds-gt.webm",
        groundTruthAudio: "assets/demos/synthetic/k4/audio/domestic-sounds-gt-foa.wav",
        predicted: "assets/demos/synthetic/k4/domestic-sounds-predicted.webm",
        predictedAudio: "assets/demos/synthetic/k4/audio/domestic-sounds-predicted-foa.wav",
        energy: "assets/demos/synthetic/k4/domestic-sounds-foa-energy.webm",
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
  frame.loading = "lazy";
  frame.allow = "autoplay; fullscreen";
  frame.setAttribute("allowfullscreen", "");
  frame.title = label;

  panel.append(heading, frame);
  return { panel, frame };
};

const pausePlayer = (frame) => {
  if (frame.contentWindow) {
    frame.contentWindow.postMessage({ type: "avqtss-pause" }, window.location.origin);
  }
};

const setPlayerSource = (frame, video, audio, label, initialYaw = 0) => {
  pausePlayer(frame);
  const parameters = new URLSearchParams({
    video,
    audio,
    label,
    yaw: String(initialYaw),
    v: PLAYER_VERSION,
  });
  frame.src = `demo-player.html?${parameters.toString()}`;
  frame.title = `${label}, interactive 360-degree video`;
};

const renderScene = (scene) => {
  const article = document.createElement("article");
  article.className = "interactive-scene";
  article.id = scene.id;

  const heading = document.createElement("header");
  heading.className = "scene-heading";
  heading.innerHTML = `
    <h4>${scene.title}</h4>
    <p class="scene-sources"><strong>Sources:</strong> ${scene.sources}</p>
  `;

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
  queryLabel.textContent = "Class query";

  const tabs = document.createElement("div");
  tabs.className = "query-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", `${scene.title} class queries`);

  queryPanel.append(queryLabel, tabs);
  controls.append(mixture.panel, queryPanel);

  const outputs = document.createElement("div");
  outputs.className = "scene-outputs";
  const groundTruth = createPlayer("Ground-truth target");
  const predicted = createPlayer("Predicted target");
  const energy = createPlayer("Predicted target with FOA energy");
  outputs.append(groundTruth.panel, predicted.panel, energy.panel);

  const selectQuery = (query, selectedButton) => {
    tabs.querySelectorAll(".query-tab").forEach((button) => {
      const selected = button === selectedButton;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    setPlayerSource(
      groundTruth.frame,
      query.groundTruth,
      query.groundTruthAudio,
      `Ground-truth target: ${query.label}`,
      scene.initialYaw,
    );
    setPlayerSource(
      predicted.frame,
      query.predicted,
      query.predictedAudio,
      `Predicted target: ${query.label}`,
      scene.initialYaw,
    );
    setPlayerSource(
      energy.frame,
      query.energy,
      query.predictedAudio,
      `Predicted target with FOA energy: ${query.label}`,
      scene.initialYaw,
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
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const buttons = [...tabs.querySelectorAll(".query-tab")];
      const offset = event.key === "ArrowRight" ? 1 : -1;
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

const sceneList = document.querySelector("#synthetic-scenes");
if (sceneList) {
  syntheticScenes.forEach((scene) => sceneList.appendChild(renderScene(scene)));
}

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

const selectDataset = (selectedDataset, shouldScroll = true) => {
  datasets.forEach((dataset) => {
    const selected = dataset === selectedDataset;
    dataset.button.classList.toggle("active", selected);
    dataset.button.setAttribute("aria-pressed", String(selected));
    dataset.section.hidden = !selected;
    if (!selected) {
      dataset.section.querySelectorAll("iframe.player-frame").forEach(pausePlayer);
    }
  });

  if (shouldScroll) {
    selectedDataset.section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
    if (frame.contentWindow !== event.source) pausePlayer(frame);
  });
});
