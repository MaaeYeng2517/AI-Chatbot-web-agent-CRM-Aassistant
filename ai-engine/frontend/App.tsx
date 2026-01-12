// frontend/src/App.jsx
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("image");
  const [jobId, setJobId] = useState(null);

  const handleGenerate = async () => {
    const res = await axios.post("http://localhost:8000/generate/", { prompt, type });
    setJobId(res.data.job_id);
    alert(`Job queued: ${res.data.job_id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Text2Media AI Engine</h1>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="border p-2 w-full" />
      <select value={type} onChange={e => setType(e.target.value)} className="border p-2 mt-2">
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 mt-2">Generate</button>
      {jobId && <p>Job ID: {jobId}</p>}
    </div>
  );
}
