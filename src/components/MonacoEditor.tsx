"use client";

import React, { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { useTheme } from "next-themes";
import { useUserStore } from "@/store/UserStore";
import * as monaco from "monaco-editor";

export default function MonacoEditor() {
  const { theme } = useTheme();
  const language = useUserStore((state) => state.language);
  const username = useUserStore((state) => state.username);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const ydoc = useRef(new Y.Doc()).current;
  const decorationsRef = useRef<string[]>([]);
  const awarenessRef = useRef<WebrtcProvider | null>(null);

  useEffect(() => {
    return () => {
      if (awarenessRef.current) {
        awarenessRef.current.destroy();
      }
    };
  }, []);

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) {
    editorRef.current = editor;

    const provider = new WebrtcProvider("my-room-name", ydoc, {
      signaling: [
        "wss://signaling.yjs.dev",
        "wss://y-webrtc-signaling-eu.herokuapp.com",
        "wss://y-webrtc-signaling-us.herokuapp.com",
      ],
    });
    awarenessRef.current = provider;

    const type = ydoc.getText("monaco");
    const model = editor.getModel();

    if (model) {
      new MonacoBinding(type, model, new Set([editor]), provider.awareness);
    } else {
      console.error("Editor model is null. MonacoBinding not initialized.");
    }

    const userColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

    provider.awareness.setLocalStateField("user", {
      name: username || "Anonymous",
      color: userColor,
    });

    editor.onDidChangeCursorSelection((e) => {
      provider.awareness.setLocalStateField("cursor", {
        position: e.selection.getPosition(),
        selection: {
          start: e.selection.getStartPosition(),
          end: e.selection.getEndPosition(),
        },
      });
    });

    provider.awareness.on("change", () => {
      const states = provider.awareness.getStates();
      const currentDecorations: monaco.editor.IModelDeltaDecoration[] = [];

      states.forEach((state, clientID) => {
        if (clientID === provider.awareness.clientID) return;
        const { cursor, user } = state;
        if (!cursor?.position) return;

        const className = `remote-cursor-${clientID}`;
        if (!document.querySelector(`style[data-client="${className}"]`)) {
          const style = document.createElement("style");
          style.dataset.client = className;
          style.innerHTML = `
            .${className} {
              border-left: 2px solid ${user.color};
              position: relative;
            }
            .${className}::after {
              content: "${user.name}";
              background: ${user.color};
              color: white;
              padding: 2px 4px;
              font-size: 10px;
              position: absolute;
              transform: translateY(-100%);
              z-index: 100;
              white-space: nowrap;
            }
          `;
          document.head.appendChild(style);
        }

        currentDecorations.push({
          range: new monacoInstance.Range(
            cursor.position.lineNumber,
            cursor.position.column,
            cursor.position.lineNumber,
            cursor.position.column
          ),
          options: {
            className,
            stickiness:
              monacoInstance.editor.TrackedRangeStickiness
                .NeverGrowsWhenTypingAtEdges,
          },
        });
      });

      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        currentDecorations
      );
    });
  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme={theme === "dark" ? "vs-dark" : "light"}
      defaultLanguage={language}
      onMount={handleEditorDidMount}
    />
  );
}
