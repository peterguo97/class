import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';

function Home() {
    return (
      <div style={{ margin: 100 }}>
        <h1>Hello world</h1>
        <hr /><br />
        <DatePicker />
      </div>
    );
}

export default Home;