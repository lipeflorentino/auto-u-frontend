export async function classifyEmail(content: string) {
  const response = await fetch("http://localhost:8000/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  return response.json();
}