# kinship

`kinship` is a spatial computing project focused on reducing the isolation that comes with extended VR/MR use. The core idea is an AI-driven companion that shares the user's environment, understands what they are doing, and responds with natural two-way interaction.

## Problem

VR and mixed reality can feel isolating during longer sessions. Whether a user is watching, working, shopping, or playing in-headset, there is often no sense of shared presence. That lack of companionship reduces comfort and time spent in immersive environments.

## Solution

Kinship provides a virtual companion that lives inside a spatial workspace and is aware of what the user is doing inside that workspace. The companion is intended to react to on-screen context and make the experience feel shared rather than solitary.

## Product Constraint

The current product direction is to build around `WebSpatial` and `WebXR` as an all-in-one spatial workspace. This avoids the privacy and sandbox restrictions that prevent a system-wide assistant from observing native headset activity.

Because of that decision, the companion's awareness is limited to experiences rendered inside this app. Native headset games and DRM-protected streaming apps are explicitly out of scope.

## Repository Layout

```text
kinship/
├── docs/                     # PRDs, ADRs, design docs
├── apps/
│   ├── main-xr/              # Main WebSpatial/WebXR app
│   │   └── public/assets/3d/ # Shared 3D models, textures, HDRIs
│   └── companion-api/        # AI companion backend
├── infra/                    # Terraform/Pulumi, Docker, CI/CD configs
├── scripts/                  # Dev tooling, build scripts, seed data
├── Makefile
└── README.md
```

## Local Commands

```sh
make client-install
make client
```

## Local Development

1. Run `make client-install` once to install local dependencies.
2. Start the app with `make client`.
3. Open `http://localhost:5173/` in your local browser.
4. In the Pico simulator, open `http://localhost:5173/`.
