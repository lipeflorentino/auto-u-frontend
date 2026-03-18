import { useState } from "react";
import { classifyEmail } from "./services/api";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await classifyEmail(text);
    setResult(res);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Email Classifier</h1>

      <textarea
        rows={10}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <button onClick={handleSubmit}>Classificar</button>

      {loading && <p>Processando...</p>}

      {result && (
        <div>
          <h3>Categoria: {result.category}</h3>
          <p>Resposta: {result.suggested_response}</p>
        </div>
      )}
    </div>
  );
}

export default App;