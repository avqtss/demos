(function () {
  "use strict";

  const demoVideo = "assets/video/demo-scene.mp4";

  window.STUDY_CONFIG = {
    schemaVersion: 2,
    appVersion: "2026.10.27-ethics-prototype-3",
    demoMode: true,
    studyId: "AVQTSS-MOS-01",
    institution: "University of Surrey",
    projectTitle: "Listening Studies of Spatial Audio Generation for Audiovisual and Immersive Media",
    title: "AV-QTSS Binaural Listening Study",
    subtitle: "Content correctness and perceived spatial accuracy",
    ethicsReference: "Pending approval",
    funding: "No dedicated funding",
    researcher: {
      name: "Qingyu Luo",
      email: "qingyu.luo@surrey.ac.uk",
      supervisor: "Professor Philip Jackson",
      supervisorEmail: "p.jackson@surrey.ac.uk",
    },
    estimatedMinutes: "15-30",
    minimumAge: 18,
    plannedRecruitment: {
      minimum: 12,
      maximum: 20,
    },
    breakAfterTrials: [20],
    storageKey: "avqtss-subjective-study-v2",
    plannedParticipantUrl: "https://avqtss.github.io/demos/listening-study/",
    participantInformation: {
      version: "AVQTSS-PIS-v0.2-pre-approval",
      date: "27 October 2026",
    },
    consentForm: {
      version: "AVQTSS-CF-v0.2-pre-approval",
      date: "27 October 2026",
      statements: [
        {
          id: "information",
          text: "I confirm that I have read and understood the participant information sheet dated 27 October 2026, version AVQTSS-PIS-v0.2-pre-approval, for the above study. I have had the opportunity to consider the information and ask questions, which have been answered satisfactorily.",
        },
        {
          id: "voluntary-withdrawal",
          text: "I understand that my participation is voluntary and that I am free to withdraw at any time during the study without giving any reason. I understand that the deadline and procedure for withdrawing data after submission are pending ethics approval and will be stated here before recruitment.",
        },
        {
          id: "monitoring-audit",
          text: "I understand that information I provide may be subject to review by responsible individuals from the University of Surrey and/or regulators for monitoring and audit purposes.",
        },
        {
          id: "anonymised-outputs",
          text: "I understand that information I provide may be used in anonymised research reports, publications, presentations, and research websites.",
        },
        {
          id: "secure-access",
          text: "I understand that my participant code and consent record, which link me to the research data, will be kept securely in accordance with data protection guidelines, and only be accessible to the immediate research team or responsible persons at the University.",
        },
        {
          id: "contact-details",
          text: "I understand that personal contact details used for recruitment will not be collected by this webpage and will not be shared beyond the study team.",
        },
        {
          id: "agree",
          text: "I agree to take part in this study.",
        },
      ],
    },
    submission: {
      enabled: false,
      mode: "qualtrics-parent-bridge",
      status: "Pending University account configuration, technical validation, and ethics approval",
      service: "University of Surrey Qualtrics (proposed)",
      serviceProvider: "Qualtrics, LLC, under the University of Surrey tenancy (proposed)",
      receivingProject: "Not yet created",
      allowedParentOrigin: "",
      primaryStorage: "University of Surrey Qualtrics tenancy (proposed; not configured)",
      archiveStorage: "Restricted University of Surrey SharePoint or OneDrive (proposed)",
      serverRegion: "To be confirmed by the University Qualtrics administrator",
      authorisedAccess: "Qingyu Luo and Professor Philip Jackson; any additional access requires approval",
      backup: "To be confirmed with the University service owner before recruitment",
      retention: "To be confirmed in the approved Ethics RM application and data management plan",
    },
    withdrawal: {
      status: "Pending an approved deadline and confirmation of primary-storage and backup deletion procedures",
      participantRoute: "Email qingyu.luo@surrey.ac.uk and provide the assigned participant code",
      deadline: "Not yet approved",
      lookupKey: "participantCode",
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
