import { useState } from "react";
import { computeGeoArea } from './computeArea';
import './styles.css';


export const App = () => {
const [text, setText] = useState("");
const [result, setResult] = useState(null);
const [err, setErr] = useState("");


function run() {
setErr("");
setResult(null);


let geo;
try {
geo = JSON.parse(text);
} catch {
setErr("Invalid JSON");
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
<h2>GeoJSON Area Calculator</h2>


<textarea
className="input"
value={text}
onChange={(e) => setText(e.target.value)}
rows={18}
/>


<button className="btn" onClick={run}>Compute</button>


{err && <p className="err">{err}</p>}


{result && (
<div className="output">
<pre>{`square meters: ${result.meters}
square km: ${result.km2}
square miles: ${result.miles2}`}</pre>
</div>
)}
</div>
</div>
);
};