/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import WordWheelGame from './games/word-wheel/WordWheelGame';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <WordWheelGame />
    </div>
  );
};

export default App;
