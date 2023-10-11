import React from "react";

const Certificate = ({ recipientName, courseName, issueDate }) => {
  return (
    <div
      style={{
        width: " 600px",
        padding: "20px",
        border: "2px solid #333",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ backgroundColor: "#333", color: "#fff", padding: "10px" }}>
        <h2>Certificate of Completion</h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>This is to certify that</p>
        <h3>{recipientName}</h3>
        <p>has successfully completed the course</p>
        <h4>{courseName}</h4>
        <p>awarded on</p>
        <p>{issueDate}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Signature</p>
        <p>John Doe</p>
        <p>CEO, ABC Learning</p>
      </div>
    </div>
  );
};

export default Certificate;
