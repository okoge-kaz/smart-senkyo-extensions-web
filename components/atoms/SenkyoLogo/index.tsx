import Image from "next/image"
import React from "react"

export const SenkyoLogo = React.memo(() => (
  <Image width={80} height={80} alt="センキョのロゴ" src="/senkyo-logo.png" />
))
