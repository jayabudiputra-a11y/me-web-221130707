import React from "react";

export default function InfoSection({ title, children }) {
  return (
    <section className="card card-float">
      <h3 className="section-title">{title}</h3>
      <div className="section-sub">{children}</div>
    </section>
  );
}
