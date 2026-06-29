const API_URL = "http://127.0.0.1:8000";

// Chat
export async function sendMessage(message, conversationId = null) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
    }),
  });

  return await response.json();
}

// Upload File
export async function uploadFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

// Conversations
export async function getConversations() {
  const response = await fetch(`${API_URL}/conversations`);
  return await response.json();
}

export async function getMessages(id) {
  const response = await fetch(`${API_URL}/conversations/${id}`);
  return await response.json();
}