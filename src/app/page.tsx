"use client";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import EditorNavbar from "@/components/EditorNavbar";
import { useTheme } from "next-themes";
import { useUserStore } from "@/store/UserStore";

export default function Home() {
  const { theme } = useTheme();
  // const [roomId, setRoomId] = React.useState<string | null>(null);
  // setRoomId(nanoid());

  // Editor value -> Yjs Text value (Value shared by multiple clients)
  // Any changes in the editor will be reflected in the Yjs Text value

  //Initialize Yjs document, then make it listen to monaco
  const editorRef = useRef<any>(null);
  const handleEditorDidMount = (editor: any, monaco) => {
    editorRef.current = editor;
    // Initialize Yjs document
    const doc = new Y.Doc(); // Collection of shared objects -> Text
    // Connect to peers with WebRTC
    const provider = new WebrtcProvider("my-room", doc);
    const type = doc.getText("monaco");
    const undoManager = new Y.UndoManager(type);
    const awareness = provider.awareness;

    awareness.setLocalStateField("user", {
      name: "User",
      color: "#ff0000",
    });

    // Bind Yjs to Monaco editor
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      awareness
    );

    if (provider) {
      provider.disconnect(); //We destroy doc we created and disconnect
      doc.destroy(); //the provider to stop propagting changes if user leaves editor
    }
  };

  // a file path, a language,

  const language = useUserStore((state) => state.language);

  return (
    <>
      <EditorNavbar className="mb-8" />
      <Editor
        height={"100vh"}
        width={"100vw"}
        theme={theme === "dark" ? "vs-dark" : "light"}
        defaultLanguage={language}
        onMount={handleEditorDidMount}
      />
    </>
  );
}
