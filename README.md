
# Realtime Text Editor

A collaborative real-time text editor built using **React**, **Yjs**, **Monaco Editor**, and **WebRTC**. This project allows users to edit code simultaneously in a shared environment, with live updates for all connected users.

---

## 🚀 How to Run the Project

Follow these steps to run the project locally:

### 1. **Clone the Repository**

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. **Install Dependencies**

Make sure you have **Node.js** installed. Then, install the project dependencies:

```bash
npm install
```

### 3. **Start the Development Server**

Run the development server to launch the project locally:

```bash
npm run dev
```

By default, the application will be accessible at `http://localhost:3000`.

---

## 📝 Project Explanation

### Overview

This project is a **real-time collaborative text editor** that allows multiple users to edit the same document simultaneously. It uses **Yjs** for real-time synchronization and **WebRTC** to manage peer-to-peer connections. The editor is powered by **Monaco Editor**, which provides an advanced and rich code editing experience similar to **Visual Studio Code**.

### Key Features

- **Real-time Collaboration**: Users can join the same room and edit the text simultaneously. Changes are reflected live for all participants.
- **Cursor Synchronization**: Each user has their cursor represented in the editor, with their name and color.
- **WebRTC-based Signaling**: Peer-to-peer connections are made via WebRTC to sync changes directly between users without needing a server-based backend.

### Technologies Used

- **React**: For building the frontend.
- **Monaco Editor**: A powerful code editor, used to provide rich editing features.
- **Yjs**: A real-time collaboration framework for syncing the document.
- **WebRTC**: For peer-to-peer communication between users.
- **Next.js**: For server-side rendering (SSR) and optimized performance.
