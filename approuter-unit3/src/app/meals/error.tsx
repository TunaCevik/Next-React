"use client";
import React from "react";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
