import React from 'react';

import Results from './components/results';
import Search from './components/search';

class App extends React.Component {
  render() {
    return (
      <div className="mx-auto my-6 flex flex-col items-center p-4">
        <h1>Rick & Morty</h1>
        <Search />
        <Results />
      </div>
    );
  }
}

export default App;
