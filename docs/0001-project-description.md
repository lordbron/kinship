The Problem: The VR/MR Isolation Factor
Pain Point: Spending extended time in Virtual or Mixed Reality environments is inherently isolating. When users watch play games, movies, shopping, or work within a headset, they lack a shared social experience. This absence of social presence leads to feelings of loneliness and reduces the amount of time users want to spend in the headset.

Solution: A virtual, AI-driven companion that coexists in the user's spatial environment. It has "screen awareness" (it knows what the user is watching, playing, or working on) and provides a sense of shared experience through natural, two-way interaction.

Primary User Story:
As a VR/MR user, I want a virtual companion present in my immersive environment that understands what I am doing, so that I feel less lonely and can share my experiences while working or playing.

ADR Decision Summary: 
To bypass strict OS-level privacy locks and browser sandboxing on headsets like Apple Vision Pro and Pico, we will build the AI companion using WebSpatial and WebXR as a centralized, "All-in-One Spatial Workspace" rather than a system-wide background utility. By rendering supported web tools and media (such as YouTube or custom document editors) directly within our application's DOM, the AI successfully gains the context needed to interact with the user's current task. Consequently, engineering and stakeholders must align on the strict limitation that the companion's awareness is confined entirely to our web app, explicitly excluding native headset games and DRM-locked streaming services like Netflix.

