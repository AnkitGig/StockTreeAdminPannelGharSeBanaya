"use client"

import { useEffect, useRef } from "react"

const Chart = ({ type, data, options, height = "300", width }) => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const loadChart = async () => {
      // Load Chart.js
      if (!window.Chart) {
        await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://cdn.jsdelivr.net/npm/chart.js"
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Initialize Chart
      if (canvasRef.current && window.Chart && containerRef.current) {
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy()
        }

        const ctx = canvasRef.current.getContext("2d")

        // Set canvas dimensions
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = Number.parseInt(height)

        canvasRef.current.width = width || containerWidth
        canvasRef.current.height = containerHeight

        chartRef.current = new window.Chart(ctx, {
          type,
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales:
              type === "pie" || type === "doughnut"
                ? {}
                : {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: true,
                      },
                    },
                    x: {
                      grid: {
                        display: true,
                      },
                    },
                  },
            ...options,
          },
        })
      }
    }

    const timer = setTimeout(() => {
      loadChart()
    }, 500)

    return () => {
      clearTimeout(timer)
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [type, data, options, height, width])

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: `${height}px`,
        width: "100%",
        minHeight: `${height}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: "100%",
          maxHeight: `${height}px`,
          display: "block",
        }}
      />
    </div>
  )
}

export default Chart
