import Image from "next/image"
import { ReactElement } from "react"

export const SenkyoLogo = (): ReactElement  => {
  return(
    <Image width={80} height={80} alt="センキョロゴ" src="/センキョロゴ.png" />
  )
}
