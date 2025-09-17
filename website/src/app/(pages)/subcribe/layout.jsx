import React, { Suspense } from 'react'

export default function layout() {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  )
}
