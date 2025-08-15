"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DataTable from "../components/DataTable"
import Layout from "../components/Layout"
import { getSignals, deleteSignal } from "../api/api"

const Calls = () => {
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalSignals, setTotalSignals] = useState(0)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })

  // Fetch signals on component mount
  useEffect(() => {
    fetchSignals()
  }, [])

  const fetchSignals = async () => {
    try {
      setLoading(true)
      // Fetch more records since DataTables will handle pagination
      const response = await getSignals(1, 100)

      if (response.signals) {
        setCalls(response.signals)
        setTotalSignals(response.pagination?.totalSignals || response.signals.length)
      } else {
        setCalls([])
        setTotalSignals(0)
      }
    } catch (error) {
      setCalls([])
      setTotalSignals(0)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (signalId, customTitle) => {
    try {
      const deleted = await deleteSignal(signalId)
      if (deleted) {
        // Refresh the signals list after successful deletion
        fetchSignals()
      }
    } catch (error) {}
  }

  const handleRefresh = () => {
    fetchSignals()
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    // Optionally, sort the calls array here if you want client-side sorting
  }

  if (loading) {
    return (
      <Layout activeMenu="calls">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeMenu="calls">
      <div className="d-flex justify-content-between align-items-center mb-20">
        <div>
          <h4 className="mb-0">Calls</h4>
          <small className="text-muted">Total: {totalSignals} signals</small>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={handleRefresh} disabled={loading}>
            <i className="icon-rotate-cw"></i> Refresh
          </button>
          <Link to="/add-calls" className="btn btn-primary">
            + Add New Call
          </Link>
        </div>
      </div>
      <div className="wg-box">
        <DataTable id="callsTable" className="table align-middle table-hover">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('sno')}>{sortConfig.key === 'sno' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} S.No</th>
              <th className="sortable" onClick={() => handleSort('segment')}>{sortConfig.key === 'segment' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Segment</th>
              <th className="sortable" onClick={() => handleSort('script')}>{sortConfig.key === 'script' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Script</th>
              <th className="sortable" onClick={() => handleSort('expiry')}>{sortConfig.key === 'expiry' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Expiry</th>
              <th className="sortable" onClick={() => handleSort('strike')}>{sortConfig.key === 'strike' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Strike</th>
              <th className="sortable" onClick={() => handleSort('instrument')}>{sortConfig.key === 'instrument' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Instrument</th>
              <th className="sortable" onClick={() => handleSort('callType')}>{sortConfig.key === 'callType' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Call Type</th>
              <th className="sortable" onClick={() => handleSort('positionStatus')}>{sortConfig.key === 'positionStatus' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Position</th>
              <th className="sortable" onClick={() => handleSort('status')}>{sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Status</th>
              <th className="sortable" onClick={() => handleSort('createdBy')}>{sortConfig.key === 'createdBy' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Created By</th>
              <th className="sortable" onClick={() => handleSort('createdAt')}>{sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Created At</th>
              <th className="sortable" onClick={() => handleSort('entryRange')}>{sortConfig.key === 'entryRange' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Entry Range</th>
              <th className="sortable" onClick={() => handleSort('stopLoss')}>{sortConfig.key === 'stopLoss' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Stop Loss</th>
              <th className="sortable" onClick={() => handleSort('targets')}>{sortConfig.key === 'targets' ? (sortConfig.direction === 'asc' ? <span style={{color:'#007bff'}}>▲</span> : <span style={{color:'#007bff'}}>▼</span>) : <span style={{opacity:0.3,marginRight:4}}>⇅</span>} Targets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {calls && calls.length > 0 ? (
              calls.map((signal, idx) => (
                <tr key={signal._id}>
                  <td>{idx + 1}</td>
                  <td>{signal.segment}</td>
                  <td>{signal.script}</td>
                  <td>{signal.expiry}</td>
                  <td>{signal.strike}</td>
                  <td>{signal.instrument}</td>
                  <td>{signal.callType}</td>
                  <td>
                    <span className={`badge ${signal.positionStatus === "Fresh Entry" ? "bg-primary" : signal.positionStatus === "Partially Exit" ? "bg-warning text-dark" : signal.positionStatus === "Full Exit" ? "bg-success" : signal.positionStatus === "Open" ? "bg-info" : signal.positionStatus === "Closed" ? "bg-secondary" : "bg-secondary"}`}>{signal.positionStatus}</span>
                  </td>
                  <td>
                    <span className={`badge ${signal.status === "active" ? "bg-success" : signal.status === "inactive" ? "bg-secondary" : signal.status === "expired" ? "bg-danger" : signal.status === "pending" ? "bg-warning text-dark" : "bg-secondary"}`}>{signal.status?.charAt(0).toUpperCase() + signal.status?.slice(1)}</span>
                  </td>
                  <td>{signal.createdBy?.name || "Unknown"}</td>
                  <td>{new Date(signal.createdAt).toLocaleDateString("en-GB")}</td>
                  <td><small className="text-muted">{signal.entryRangeFrom} - {signal.entryRangeTo}</small></td>
                  <td><small className="text-danger">{signal.stopLossFrom} - {signal.stopLossTo}</small></td>
                  <td><small className="text-success">{signal.target1}, {signal.target2}, {signal.target3}</small></td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(signal._id, signal.customTitle)}
                      disabled={loading}
                      title="Delete Signal"
                    >
                      <i className="icon-trash-2"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center text-muted">
                  No signals found.
                </td>
              </tr>
            )}
          </tbody>
        </DataTable>
      </div>
    </Layout>
  )
}

export default Calls
