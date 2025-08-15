"use client"

import { useEffect } from "react"

const useScript = (src, onLoad) => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = src
    script.async = true

    const handleLoad = () => {
      if (onLoad) onLoad()
    }

    script.addEventListener("load", handleLoad)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      script.removeEventListener("load", handleLoad)
    }
  }, [src, onLoad])
}

export default useScript
