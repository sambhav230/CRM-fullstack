import axios from 'axios';
import { useState } from 'react';

function SegmentBuilder({ onBuild }) {
  const [rules, setRules] = useState([
    { field: 'amount', operator: '>', value: '' }
  ]);
  const [logic, setLogic] = useState('AND');

  const handleRuleChange = (idx, key, val) => {
    const newRules = [...rules];
    newRules[idx][key] = val;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { field: 'amount', operator: '>', value: '' }]);
  };

  const deleteRule = (idx) => {
    const newRules = rules.filter((_, i) => i !== idx);
    setRules(newRules.length > 0 ? newRules : [{ field: 'amount', operator: '>', value: '' }]);
  };

  const handleBuild = () => {
  axios.post('http://localhost:8080/api/customers/segment', { logic, rules })
    .then(res => {
      alert("Matching customers: " + JSON.stringify(res.data));
      // Future: Table me show karo
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
};

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", marginBottom: 30, border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
      <h2>Segment/Rule Builder</h2>
      <div>
        <label>Logic: </label>
        <select value={logic} onChange={e => setLogic(e.target.value)}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>
      {rules.map((rule, idx) => (
        <div key={idx} style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
          <select value={rule.field} onChange={e => handleRuleChange(idx, 'field', e.target.value)}>
            <option value="amount">Amount</option>
            <option value="visits">Visits</option>
            <option value="daysInactive">Days Inactive</option>
          </select>
          <select value={rule.operator} onChange={e => handleRuleChange(idx, 'operator', e.target.value)}>
            <option value=">">{'>'}</option>
            <option value="<">{'<'}</option>
            <option value="=">{'='}</option>
          </select>
          <input
            type="number"
            value={rule.value}
            onChange={e => handleRuleChange(idx, 'value', e.target.value)}
            style={{ width: 80, marginLeft: 5 }}
          />
          <button
            style={{ marginLeft: 10, color: "white", background: "#d9534f", border: "none", borderRadius: 4, padding: "0 8px", cursor: "pointer" }}
            onClick={() => deleteRule(idx)}
            title="Delete this rule"
          >X</button>
        </div>
      ))}
      <button onClick={addRule} style={{ marginTop: 10 }}>Add Rule</button>
      <button onClick={handleBuild} style={{ marginTop: 10, marginLeft: 10 }}>Build Segment</button>
    </div>
  );
}

export default SegmentBuilder;
