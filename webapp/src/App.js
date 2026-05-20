import React, { useState, useRef } from "react";

const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
};

export default function App() {
  const [text, setText] = useState("");
  const [sequence, setSequence] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const streamRef = useRef(null);
  const stopRef = useRef(false);
  const scrollRef = useRef(null);

  const [dot, setDot] = useState(300);
  const [dash, setDash] = useState(900);
  const [gap, setGap] = useState(300);
  const [letterGap, setLetterGap] = useState(900);
  const [wordGap, setWordGap] = useState(2000);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const initFlash = async () => {
    if (streamRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    streamRef.current = stream;
  };

  const torch = async (state) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;

    try {
      await track.applyConstraints({
        advanced: [{ torch: state }],
      });
    } catch {}
  };

  const buildSequence = () => {
    let seq = [];

    text
      .toUpperCase()
      .split("")
      .forEach((char, index) => {
        if (char === " ") {
          seq.push({ type: "word-gap" });
        } else if (morseCode[char]) {
          morseCode[char].split("").forEach((s) => {
            seq.push({
              type: s === "." ? "dot" : "dash",
              charIndex: index,
            });
            seq.push({ type: "gap" });
          });

          seq.push({ type: "letter-gap" });
        }
      });

    setSequence(seq);
    return seq;
  };

  const play = async () => {
    stopRef.current = false;
    setPlaying(true);

    const seq = buildSequence();
    await initFlash();

    for (let i = 0; i < seq.length; i++) {
      if (stopRef.current) break;

      const item = seq[i];

      setActiveIndex(i);

      if (item.charIndex !== undefined) {
        setCurrentCharIndex(item.charIndex);
      }

      setTimeout(() => {
        scrollRef.current?.children[i]?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }, 50);

      if (item.type === "dot") {
        await torch(true);
        navigator.vibrate?.(50);
        await sleep(dot);
        await torch(false);
        await sleep(50);
      } else if (item.type === "dash") {
        await torch(true);
        navigator.vibrate?.(150);
        await sleep(dash);
        await torch(false);
        await sleep(50);
      } else if (item.type === "gap") {
        await sleep(gap);
      } else if (item.type === "letter-gap") {
        await sleep(letterGap);
      } else if (item.type === "word-gap") {
        await sleep(wordGap);
      }
    }

    await torch(false);
    setPlaying(false);
    setActiveIndex(-1);
  };

  const stop = async () => {
    stopRef.current = true;
    await torch(false);
    setPlaying(false);
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-3 py-2">
        <h1 className="text-lg font-bold">⚡ Morse Torch</h1>

        <button onClick={() => setShowSettings(true)}>⚙️</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-evenly">
        <div className="text-5xl font-bold">
          {text[currentCharIndex] || "_"}
        </div>

        <div className="flex items-center justify-center h-32">
          {sequence[activeIndex]?.type === "dot" && (
            <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_30px_white] animate-pulse"></div>
          )}

          {sequence[activeIndex]?.type === "dash" && (
            <div className="w-32 h-16 bg-white rounded-lg shadow-[0_0_30px_white] animate-pulse"></div>
          )}

          {sequence[activeIndex]?.type?.includes("gap") && (
            <div className="w-10 h-10 bg-gray-700 rounded-full opacity-40"></div>
          )}
        </div>

        <div ref={scrollRef} className="flex gap-2 overflow-x-auto w-full px-2">
          {sequence.map((item, i) => (
            <div
              key={i}
              className={`
                ${item.type === "dot" ? "w-3 h-3 bg-white rounded-full" : ""}
                ${item.type === "dash" ? "w-6 h-3 bg-white rounded" : ""}
                ${
                  item.type.includes("gap") ? "w-2 h-2 bg-gray-600 rounded" : ""
                }
                ${
                  i === activeIndex
                    ? "scale-150 bg-red-400 shadow-[0_0_20px_red]"
                    : ""
                }
              `}
            />
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-800">
        <input
          className="w-full p-3 rounded bg-gray-800 mb-3"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={play} className="bg-green-500 flex-1 p-3 rounded">
            Send
          </button>

          <button onClick={stop} className="bg-red-500 flex-1 p-3 rounded">
            🛑 Stop
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-95 p-6 flex flex-col gap-3 overflow-auto">
          <h2 className="text-xl mb-2">⚙️ Settings</h2>

          <input
            className="p-2 bg-gray-800"
            type="number"
            value={dot}
            onChange={(e) => setDot(+e.target.value)}
            placeholder="Dot (ms)"
          />

          <input
            className="p-2 bg-gray-800"
            type="number"
            value={dash}
            onChange={(e) => setDash(+e.target.value)}
            placeholder="Dash (ms)"
          />

          <input
            className="p-2 bg-gray-800"
            type="number"
            value={gap}
            onChange={(e) => setGap(+e.target.value)}
            placeholder="Gap"
          />

          <input
            className="p-2 bg-gray-800"
            type="number"
            value={letterGap}
            onChange={(e) => setLetterGap(+e.target.value)}
            placeholder="Letter Gap"
          />

          <input
            className="p-2 bg-gray-800"
            type="number"
            value={wordGap}
            onChange={(e) => setWordGap(+e.target.value)}
            placeholder="Word Gap"
          />

          <button
            className="bg-red-500 mt-4 p-3 rounded"
            onClick={() => setShowSettings(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
