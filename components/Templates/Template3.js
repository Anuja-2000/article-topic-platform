import React from 'react';

const Template3 = ({ onSelect }) => {
  const templateContent = `
    <div style="text-align: center;">
      <p>This is paragraph 1.</p>
   
      <p>This is paragraph 2.</p>
    </div>
  `;

  const handleSelect = () => {
    // Assuming onSelect is a function passed from parent to set content in Quill
    onSelect(templateContent);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ border: '1px solid #ccc', padding: '10px', width: '300px', minHeight: '200px' }}>
        <h3 style={{ textAlign: 'center' }}>Template 3</h3>
        <p>This is paragraph 1.</p>
        <div contentEditable="false" style={{ fontSize: '20px', textAlign: 'center', marginBottom: '10px' }}>&hellip;</div>
        <p>This is paragraph 2.</p>
      </div>
      <button onClick={handleSelect} style={{ marginTop: '10px' }}>Select Template</button>
    </div>
  );
};

export default Template3;
