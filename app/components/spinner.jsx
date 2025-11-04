"use client";
import "../components/spinner.css";

export default function Spinner() {
  const files = Array.from({ length: 6 });

  return (
    <div className="loader-wrapper">
      <div className="loader-con">
        {files.map((_, i) => (
          <div key={i} style={{ "--i": i }} className="pfile"></div>
        ))}
      </div>
    </div>
  );
}
