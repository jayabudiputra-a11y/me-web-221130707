import React from "react";

export default function Profile({ info }) {
  return (
    <div className="card profile">
      <div className="left">
        {info.cover_url ? (
          <img className="cover" src={info.cover_url} alt="cover" />
        ) : (
          <div className="nocover">No Cover</div>
        )}
      </div>

      <div className="right">
        <h2>{info.nama}</h2>
        <p className="bio">{info.bio}</p>
        <p className="remedial">{info.remedial_text}</p>
      </div>
    </div>
  );
}
