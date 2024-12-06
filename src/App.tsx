import React, { useEffect, useState } from "react";
import Viewer from "./components/Viewer/Viewer";
import modelPath from "./assets/out.glb";

function App() {
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    setModel(modelPath);
  }, []);

  return (
    <div>
      {model ? (
        <Viewer width="100%" height="calc(100vh - 50px)" model={model}></Viewer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
