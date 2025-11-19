import { useState } from 'react';
import { computeGeoArea } from './computeArea';
import './styles.css';

export const App = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  function run() {
    setErr('');
    setResult(null);

    let geo;
    try {
      geo = JSON.parse(text);
    } catch {
      setErr('Invalid JSON');
      return;
    }

    try {
      const m2 = computeGeoArea(geo);
      setResult({
        meters: m2,
        km2: m2 / 1_000_000,
        miles2: m2 / 2_589_988.110336,
      });
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="panel">
        <h2 className="title">GeoJSON Area Calculator</h2>
        <textarea
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          placeholder={`{
  "coordinates": [
    [
      [
        -115.84215021258342,
        37.261428585616315
      ],
      [
        -115.90106710461913,
        37.26237200845266
      ],
      [
        -115.86713035795815,
        37.208690132001905
      ],
      [
        -115.76011198160134,
        37.19588184209445
      ],
      [
        -115.77611079951825,
        37.25755927298789
      ],
      [
        -115.84215021258342,
        37.261428585616315
      ]
    ]
  ],
  "type": "Polygon"
}`}
        />

        <button className="btn" onClick={run}>
          Compute
        </button>

        {err && <p className="err">{err}</p>}

        {result && (
          <div className="output">
            <pre>{`square meters: ${result.meters}
square km:      ${result.km2}
square miles:   ${result.miles2}`}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
