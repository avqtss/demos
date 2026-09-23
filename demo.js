const syntheticScenes = [
  {
    id: "synthetic-k2",
    title: "Example #1",
    sources: "Laughter, music",
    mixture: "assets/demos/synthetic/k2/mixture.mp4",
    queries: [
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k2/laughter-gt.mp4",
        predicted: "assets/demos/synthetic/k2/laughter-predicted.mp4",
        energy: "assets/demos/synthetic/k2/laughter-foa-energy.mp4",
      },
      {
        id: "music",
        label: "Music",
        groundTruth: "assets/demos/synthetic/k2/music-gt.mp4",
        predicted: "assets/demos/synthetic/k2/music-predicted.mp4",
        energy: "assets/demos/synthetic/k2/music-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k3",
    title: "Example #2",
    sources: "Bell, door or cupboard, water tap",
    mixture: "assets/demos/synthetic/k3/mixture.mp4",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k3/bell-gt.mp4",
        predicted: "assets/demos/synthetic/k3/bell-predicted.mp4",
        energy: "assets/demos/synthetic/k3/bell-foa-energy.mp4",
      },
      {
        id: "door-or-cupboard",
        label: "Door or cupboard",
        groundTruth: "assets/demos/synthetic/k3/door-or-cupboard-gt.mp4",
        predicted: "assets/demos/synthetic/k3/door-or-cupboard-predicted.mp4",
        energy: "assets/demos/synthetic/k3/door-or-cupboard-foa-energy.mp4",
      },
      {
        id: "water-tap",
        label: "Water tap",
        groundTruth: "assets/demos/synthetic/k3/water-tap-gt.mp4",
        predicted: "assets/demos/synthetic/k3/water-tap-predicted.mp4",
        energy: "assets/demos/synthetic/k3/water-tap-foa-energy.mp4",
      },
    ],
  },
  {
    id: "synthetic-k4",
    title: "Example #3",
    sources: "Bell, telephone, laughter, domestic sounds",
    mixture: "assets/demos/synthetic/k4/mixture.mp4",
    queries: [
      {
        id: "bell",
        label: "Bell",
        groundTruth: "assets/demos/synthetic/k4/bell-gt.mp4",
        predicted: "assets/demos/synthetic/k4/bell-predicted.mp4",
        energy: "assets/demos/synthetic/k4/bell-foa-energy.mp4",
      },
      {
        id: "telephone",
        label: "Telephone",
        groundTruth: "assets/demos/synthetic/k4/telephone-gt.mp4",
        predicted: "assets/demos/synthetic/k4/telephone-predicted.mp4",
        energy: "assets/demos/synthetic/k4/telephone-foa-energy.mp4",
      },
      {
        id: "laughter",
        label: "Laughter",
        groundTruth: "assets/demos/synthetic/k4/laughter-gt.mp4",
        predicted: "assets/demos/synthetic/k4/laughter-predicted.mp4",
        energy: "assets/demos/synthetic/k4/laughter-foa-energy.mp4",
      },
      {
        id: "domestic-sounds",
        label: "Domestic sounds",
        groundTruth: "assets/demos/synthetic/k4/domestic-sounds-gt.mp4",
        predicted: "assets/demos/synthetic/k4/domestic-sounds-predicted.mp4",
        energy: "assets/demos/synthetic/k4/domestic-sounds-foa-energy.mp4",
      },
    ],
  },
];

const createVideo = (label, className = "") => {
  const panel = document.createElement("div");
  panel.className = `media-panel scene-output ${className}`.trim();

  const heading = document.createElement("p");
  heading.className = "media-label";
  heading.textContent = label;

  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", label);
  video.appendChild(document.createTextNode("Your browser does not support embedded video."));

  panel.append(heading, video);
  return { panel, video };
};

const setVideoSource = (video, source) => {
  video.pause();
  video.src = source;
  video.load();
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

  const mixture = createVideo("Input video and mono mixture");
  mixture.panel.classList.remove("scene-output");
  setVideoSource(mixture.video, scene.mixture);

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
  const groundTruth = createVideo("Ground-truth target");
  const predicted = createVideo("Predicted target");
  const energy = createVideo("Predicted target with FOA energy", "is-spatial");
  outputs.append(groundTruth.panel, predicted.panel, energy.panel);

  const selectQuery = (query, selectedButton) => {
    tabs.querySelectorAll(".query-tab").forEach((button) => {
      const selected = button === selectedButton;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    setVideoSource(groundTruth.video, query.groundTruth);
    setVideoSource(predicted.video, query.predicted);
    setVideoSource(energy.video, query.energy);
    groundTruth.video.setAttribute("aria-label", `Ground-truth target: ${query.label}`);
    predicted.video.setAttribute("aria-label", `Predicted target: ${query.label}`);
    energy.video.setAttribute("aria-label", `Predicted target with FOA energy: ${query.label}`);
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
      dataset.section.querySelectorAll("video").forEach((video) => video.pause());
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
