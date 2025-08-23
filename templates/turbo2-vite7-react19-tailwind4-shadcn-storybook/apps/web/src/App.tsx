import { useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import { ModeToggle } from '@workspace/ui/components/mode-toggle';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <nav className="flex items-center justify-end p-4">
        <ModeToggle />
      </nav>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Count is {count}</h1>
          <Button size="sm" onClick={() => setCount((count) => count + 1)}>
            button
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
