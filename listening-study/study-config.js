(function () {
  "use strict";

  const demoVideo = "assets/video/demo-scene.mp4";

  window.STUDY_CONFIG = {
    schemaVersion: 1,
    appVersion: "2026.10.27-ethics-prototype-2",
    demoMode: true,
    studyId: "AVQTSS-MOS-01",
    institution: "University of Surrey",
    title: "AV-QTSS Binaural Listening Study",
    subtitle: "Content correctness and perceived spatial accuracy",
    ethicsReference: "To be assigned",
    researcher: {
      name: "Qingyu Luo",
      email: "Add institutional email before submission",
      supervisor: "Add supervisor name and email before submission",
    },
    estimatedMinutes: "15-30",
    minimumAge: 18,
    plannedRecruitment: {
      minimum: 12,
      maximum: 20,
    },
    breakAfterTrials: [20],
    storageKey: "avqtss-subjective-study-v1",
    plannedParticipantUrl: "https://avqtss.github.io/demos/listening-study/",
    submission: {
      mode: "local-export-prototype",
      service: "Not yet selected; an institution-approved service is required before recruitment",
      retention: "To be confirmed in the approved ethics protocol",
    },

    methods: [
      { id: "no_separator", internalName: "No-Separator" },
      { id: "uss", internalName: "USS" },
      { id: "no_binding", internalName: "No-Binding" },
      { id: "no_class", internalName: "No-Class" },
      { id: "ambi_encode", internalName: "Ambi-Encode" },
      { id: "direction_only", internalName: "Direction-Only" },
      { id: "no_joint", internalName: "Ours (No-Joint)" },
      { id: "ours", internalName: "Ours" },
    ],

    // Ethics-interface demonstration stimuli. In the formal deployment, give
    // every stimulus an audioByMethod entry for all eight method IDs and set
    // demoMode to false. The participant never sees internal method names.
    stimuli: [
      {
        id: "demo_scene_01_door",
        sceneId: "avqtss_v3_av_test_01447",
        query: "Door/Cupboard",
        video: demoVideo,
        demoAudio: "assets/audio/demo-door.wav",
        audioByMethod: {},
      },
      {
        id: "demo_scene_02_knock",
        sceneId: "avqtss_v3_av_test_01447",
        query: "Knock",
        video: demoVideo,
        demoAudio: "assets/audio/demo-knock.wav",
        audioByMethod: {},
      },
      {
        id: "demo_scene_03_bell",
        sceneId: "avqtss_v3_av_test_01447",
        query: "Bell",
        video: demoVideo,
        demoAudio: "assets/audio/demo-bell.wav",
        audioByMethod: {},
      },
      {
        id: "demo_scene_04_door_reference",
        sceneId: "avqtss_v3_av_test_01447",
        query: "Door/Cupboard",
        video: demoVideo,
        demoAudio: "assets/audio/demo-door-reference.wav",
        audioByMethod: {},
      },
      {
        id: "demo_scene_05_bell_reference",
        sceneId: "avqtss_v3_av_test_01447",
        query: "Bell",
        video: demoVideo,
        demoAudio: "assets/audio/demo-bell-reference.wav",
        audioByMethod: {},
      },
    ],

    practice: {
      id: "practice_bell",
      query: "Bell",
      video: demoVideo,
      audio: "assets/audio/demo-bell-reference.wav",
    },
    calibrationAudio: "assets/audio/demo-bell-reference.wav",
  };
})();
