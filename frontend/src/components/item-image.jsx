import React from "react";

export default function ItemImage({ src, alt }) {
  return (
    <div className="item-image-wrapper">
      <img src={src} alt={alt} className="item-details-image" />
    </div>
  );
}
