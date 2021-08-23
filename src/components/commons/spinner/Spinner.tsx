import React from 'react';
import Card from '../Card';

import './spinner.css';

function Spinner() {
  return (
    <Card className=" col-start-2 col-span-2">
      <div className="spinner mx-auto"></div>
    </Card>
  );
}

export default Spinner;
