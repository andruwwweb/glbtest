import React, { useEffect, useState } from "react";
import Viewer from "./Viewer";
import modelPath from "./assets/out.glb";

function App() {
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    setFile(modelPath);
  }, []);

  return (
    <div>
      {file ? (
        <Viewer width="800px" height="800px" file={file}></Viewer>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default App;
