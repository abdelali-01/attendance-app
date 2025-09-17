import React, { Suspense } from "react";

export default function layout({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
