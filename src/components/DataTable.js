"use client"

import { useEffect, useRef } from "react"

const DataTable = ({ children, id = "dataTable", className = "table table-striped" }) => {
  const tableRef = useRef(null)

  useEffect(() => {
    const loadDataTable = async () => {
      // Load jQuery first
      if (!window.$) {
        await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://code.jquery.com/jquery-3.6.0.min.js"
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Load DataTables
      if (!window.$.fn.DataTable) {
        await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://cdn.datatables.net/2.3.1/js/dataTables.js"
          script.onload = resolve
          document.head.appendChild(script)
        })

        await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://cdn.datatables.net/2.3.1/js/dataTables.bootstrap5.js"
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Initialize DataTable
      if (tableRef.current && window.$ && window.$.fn.DataTable) {
        // Destroy existing DataTable if it exists
        if (window.$.fn.DataTable.isDataTable(tableRef.current)) {
          window.$(tableRef.current).DataTable().destroy()
        }

        // Initialize new DataTable
        window.$(tableRef.current).DataTable({
          responsive: true,
          pageLength: 10,
          lengthMenu: [5, 10, 25, 50],
          language: {
            search: "Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            paginate: {
              first: "First",
              last: "Last",
              next: "Next",
              previous: "Previous",
            },
          },
        })
      }
    }

    const timer = setTimeout(() => {
      loadDataTable()
    }, 100)

    return () => {
      clearTimeout(timer)
      // Cleanup DataTable on unmount
      if (
        tableRef.current &&
        window.$ &&
        window.$.fn.DataTable &&
        window.$.fn.DataTable.isDataTable(tableRef.current)
      ) {
        window.$(tableRef.current).DataTable().destroy()
      }
    }
  }, [])

  return (
    <div className="table-responsive">
      <table ref={tableRef} id={id} className={className}>
        {children}
      </table>
    </div>
  )
}

export default DataTable
