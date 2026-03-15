import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents-realtime";
import SheepCompanion from "./SheepCompanion";

const SHEEP_MODEL_SRC = "/Meshy_AI_model_Animation_Walking_withSkin.glb";
const REALTIME_SESSION_URL = "/api/realtime/session";

type CompanionState = "idle" | "connecting" | "listening" | "thinking" | "speaking";
type CompanionPageProps = {
  embedded?: boolean;
};

const COMPANION_INSTRUCTIONS = `
You are Kinship, a warm walking companion in a spatial scene.
You are a VR virtual companion who gives guidance, answers questions, offers quick tips, and bounces thoughts in a brief, delightful way while the user is in VR.
The user wakes you with a pinch, gives one spoken command, and expects one concise spoken reply.
The user speaks English.
The user is currently watching the movie "Windtalkers".
To the user's right, they are browsing Amazon for books about Monument Valley.
In front of the user, there is a 3D racing car game set in Monument Valley, and you are playing the game with the user.
Do not greet unless the user greets you first.
Keep the reply to one or two short sentences.
Keep your tone warm, playful, calm, and companion-like.
Reference the current VR environment when it is helpful, but do not be intrusive.
Do not ask a follow-up question unless the user's request is ambiguous enough that you cannot act safely.
Once you finish answering the first command, the conversation will end.
`.trim();

export default function CompanionPage({ embedded = false }: CompanionPageProps) {
  const sessionRef = useRef<RealtimeSession | null>(null);
  const heardAssistantAudioRef = useRef(false);
  const [state, setState] = useState<CompanionState>("idle");
  const [error, setError] = useState<string | null>(null);

  const agent = useMemo(
    () =>
      new RealtimeAgent({
        name: "Kinship",
        voice: "marin",
        instructions: COMPANION_INSTRUCTIONS,
      }),
    [],
  );

  const closeSession = useCallback(
    (nextState: CompanionState = "idle") => {
      heardAssistantAudioRef.current = false;

      const currentSession = sessionRef.current;
      sessionRef.current = null;

      if (currentSession) {
        try {
          currentSession.mute(true);
        } catch {}
        currentSession.close();
      }

      setState(nextState);
    },
    [],
  );

  const fetchRealtimeClientSecret = useCallback(async () => {
    const response = await fetch(REALTIME_SESSION_URL, { method: "POST" });
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      value?: string;
      client_secret?: { value?: string };
    };

    if (!response.ok) {
      throw new Error(payload.error || "Failed to create OpenAI realtime session");
    }

    const clientSecret = payload.value || payload.client_secret?.value;
    if (!clientSecret) {
      throw new Error("Realtime session response did not include a client secret");
    }

    return clientSecret;
  }, []);

  const wakeCompanion = useCallback(async () => {
    if (sessionRef.current) {
      closeSession("idle");
      return;
    }

    setError(null);
    setState("connecting");
    heardAssistantAudioRef.current = false;

    const session = new RealtimeSession(agent, {
      transport: "webrtc",
      model: "gpt-realtime",
      config: {
        outputModalities: ["audio"],
        audio: {
          input: {
            noiseReduction: { type: "near_field" },
            transcription: { model: "gpt-4o-mini-transcribe", language: "en" },
            turnDetection: {
              type: "server_vad",
              silenceDurationMs: 650,
              prefixPaddingMs: 300,
              interruptResponse: true,
            },
          },
          output: {
            voice: "marin",
          },
        },
      },
    });

    session.on("agent_start", () => {
      setState("thinking");
    });

    session.on("audio_start", () => {
      heardAssistantAudioRef.current = true;
      setState("speaking");
    });

    session.on("audio_stopped", () => {
      if (heardAssistantAudioRef.current) {
        closeSession("idle");
      }
    });

    session.on("error", ({ error: sessionError }) => {
      const message =
        sessionError instanceof Error ? sessionError.message : "OpenAI realtime session failed";
      setError(message);
      closeSession("idle");
    });

    sessionRef.current = session;

    try {
      await session.connect({
        model: "gpt-realtime",
        apiKey: fetchRealtimeClientSecret,
      });
      setState("listening");
    } catch (connectError) {
      const message =
        connectError instanceof Error ? connectError.message : "Failed to start OpenAI realtime session";
      setError(message);
      closeSession("idle");
    }
  }, [agent, closeSession, fetchRealtimeClientSecret]);

  useEffect(() => {
    return () => {
      closeSession("idle");
    };
  }, [closeSession]);

  const statusText =
    state === "connecting"
      ? "Waking up..."
      : state === "listening"
        ? "Listening... say one command"
        : state === "thinking"
          ? "Thinking..."
          : state === "speaking"
            ? "Speaking..."
            : "Tap or pinch the companion to wake it";

  return (
    <div className={`companion-page-root ${embedded ? "companion-page-root--embedded" : ""}`}>
      <div className={`companion-volume ${embedded ? "companion-volume--embedded" : ""}`}>
        <div className="companion-title-wrap">
          <p className="companion-eyebrow">Voice Companion</p>
          <h2 className="companion-title">Walking Companion</h2>
          <p className="companion-status-text">{statusText}</p>
          {error && <p className="companion-error-text">{error}</p>}
        </div>
        <SheepCompanion
          src={SHEEP_MODEL_SRC}
          onActivate={wakeCompanion}
          label={state === "idle" ? "Wake walking companion" : "Stop walking companion session"}
        />
      </div>
    </div>
  );
}
