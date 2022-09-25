import Image from "next/image"
import { ReactElement } from "react"

// 用途：ヘッダーに使う選挙のロゴ

export const SenkyoLogo = (): ReactElement  => {
  return(
    <Image width={80} height={80} alt="センキョロゴ" src="/センキョロゴ.png" />
  )
}
