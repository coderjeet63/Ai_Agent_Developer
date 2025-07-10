import { io } from 'socket.io-client'; // ✅ correct import

let socketInstance = null;

export const initializeSocket = (projectId) => {
  socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
    auth: {
      token: localStorage.getItem('token'),
    },
    query: {
      projectId,
    },
  });

  // ✅ Moved inside initializeSocket
  socketInstance.on("connect", () => {
    console.log("✅ Connected to socket:", socketInstance.id);
  });

  socketInstance.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
  });

  return socketInstance;
};

export const receiveMessage = (eventName, cb) => {
  if (socketInstance) {
    socketInstance.on(eventName, cb);
  } else {
    console.warn("⚠️ Socket not initialized");
  }
};

export const sendMessage = (eventName, data) => {
  if (socketInstance) {
    socketInstance.emit(eventName, data);
  } else {
    console.warn("⚠️ Socket not initialized");
  }
};


