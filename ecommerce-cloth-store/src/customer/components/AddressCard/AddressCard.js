import React from "react";

export default function AddressCard({ address }) {
  return (
    <div>
      <div className="space-y-2 md:space-y-3">
        <div className="space-y-1">
          <p className="font-semibold">
            {address?.firstName + " " + address?.lastName}{" "}
          </p>
          <p className="text-sm md:text-base">
            {address?.streetAddress}, {address?.city} {address?.zipCode}
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p className="text-sm md:text-base">{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
}
