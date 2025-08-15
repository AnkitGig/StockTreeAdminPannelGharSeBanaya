"use client";

import { useState } from "react";
import equityStocks from "../data/equityStocks.json";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createSignal } from "../api/api";

const CREATED_BY = "6826ebc6f0163a4c3c9d4f3c"; // Use backend's valid Trader ID

const AddCall = () => {
  const [strikes, setStrikes] = useState([]);
  const [loadingStrikes, setLoadingStrikes] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    segment: "",
    instrument: "",
    script: "",
    strike: "",
    expiry: "",
    positionStatus: "Fresh Entry",
    callType: "BUY",
    entryRangeFrom: "",
    entryRangeTo: "",
    stopLossFrom: "",
    stopLossTo: "",
    target1: "",
    target2: "",
    target3: "",
    subscriptionType: "all",
    customTitle: "",
    customMessage: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expiries, setExpiries] = useState([]);
  const [loadingExpiries, setLoadingExpiries] = useState(false);
  // Filtered stocks for dropdown
  const filteredStocks = equityStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    // For Equity and FUTSTK, set script to selected instrument's symbol automatically
    if (name === "instrument" && (formData.segment === "Equity" || formData.segment === "FUTSTK")) {
      const selectedStock = equityStocks.find(
        (stock) => stock.symbol === value
      );
      if (selectedStock && selectedStock.symbol) {
        newFormData.script = selectedStock.name;
      }
    }
    // If expiry changes and segment is Option Chain or FUTSTK, fetch strikes
    if (name === "expiry" && (formData.segment === "Option Chain" || formData.segment === "FUTSTK")) {
      if (formData.instrument && value) {
        setLoadingStrikes(true);
        fetch(
          `https://api.stockstree.in/api/market-data/live/strikes/${formData.instrument}/${value}`
        )
          .then((res) => res.json())
          .then((data) => {
            setStrikes(Array.isArray(data.data) ? data.data : []);
            setFormData((prev) => ({ ...prev, strike: "" }));
          })
          .catch(() => setStrikes([]))
          .finally(() => setLoadingStrikes(false));
      } else {
        setStrikes([]);
        setFormData((prev) => ({ ...prev, strike: "" }));
      }
    }
    setFormData(newFormData);
    // If instrument changes and segment is Option Chain or FUTSTK, fetch expiries
    if (name === "instrument" && (formData.segment === "Option Chain" || formData.segment === "FUTSTK")) {
      if (value) {
        setLoadingExpiries(true);
        fetch(
          `https://api.stockstree.in/api/market-data/live/expiries/${value}`
        )
          .then((res) => res.json())
          .then((data) => {
            // API returns { success, data: [ { value, label, ... } ] }
            setExpiries(Array.isArray(data.data) ? data.data : []);
            setFormData((prev) => ({ ...prev, expiry: "" }));
          })
          .catch(() => setExpiries([]))
          .finally(() => setLoadingExpiries(false));
      } else {
        setExpiries([]);
        setFormData((prev) => ({ ...prev, expiry: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Build payload for API (only required fields)
      const {
        segment,
        instrument,
        script,
        expiry,
        strike,
        positionStatus,
        callType,
        entryRangeFrom,
        entryRangeTo,
        stopLossFrom,
        stopLossTo,
        target1,
        target2,
        target3,
        subscriptionType,
        customTitle,
        customMessage,
      } = formData;
      const payload = {
        segment,
        instrument,
        script,
        expiry,
        strike: strike ? Number(strike) : undefined,
        positionStatus,
        callType,
        entryRangeFrom: entryRangeFrom ? Number(entryRangeFrom) : undefined,
        entryRangeTo: entryRangeTo ? Number(entryRangeTo) : undefined,
        stopLossFrom: stopLossFrom ? Number(stopLossFrom) : undefined,
        stopLossTo: stopLossTo ? Number(stopLossTo) : undefined,
        target1: target1 ? Number(target1) : undefined,
        target2: target2 ? Number(target2) : undefined,
        target3: target3 ? Number(target3) : undefined,
        subscriptionType,
        createdBy: CREATED_BY,
        ...(subscriptionType === "manual"
          ? { selectedUsers: ["stub-user-id"] }
          : {}),
        ...(customTitle ? { customTitle } : {}),
        ...(customMessage ? { customMessage } : {}),
      };
      // Remove undefined fields
      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );
      // Call centralized API function
      await createSignal(payload);
      navigate("/calls");
    } catch (err) {
      // SweetAlert handled in API function
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      segment: "",
      instrument: "",
      script: "",
      strike: "",
      expiry: "",
      positionStatus: "Fresh Entry",
      callType: "BUY",
      entryRangeFrom: "",
      entryRangeTo: "",
      stopLossFrom: "",
      stopLossTo: "",
      target1: "",
      target2: "",
      target3: "",
      subscriptionType: "all",
      customTitle: "",
      customMessage: "",
    });
  };

  return (
    <Layout activeMenu="calls">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>Add Call</h3>
      </div>
      <div className="wg-box">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="segment">Segment</label>
              <select
                className="form-control"
                id="segment"
                name="segment"
                value={formData.segment}
                onChange={handleChange}
              >
                <option value="">Select Segment</option>
                <option value="Equity">Equity</option>
                <option value="Option Chain">Option Chain</option>
                <option value="FUTSTK">FUTSTK</option>
              </select>
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="instrument">Instrument</label>
              {(formData.segment === "Equity") ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search stock..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="form-control"
                    id="instrument"
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleChange}
                  >
                    <option value="">Select Instrument</option>
                    {filteredStocks.map((stock) => (
                      <option key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </option>
                    ))}
                  </select>
                  {/* No expiry dropdown for Equity */}
                </>
              ) : (formData.segment === "Option Chain" || formData.segment === "FUTSTK") ? (
                <>
                  {formData.segment === "FUTSTK" ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search stock..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select
                        className="form-control"
                        id="instrument"
                        name="instrument"
                        value={formData.instrument}
                        onChange={handleChange}
                      >
                        <option value="">Select Instrument</option>
                        {filteredStocks.map((stock) => (
                          <option key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - {stock.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <select
                      className="form-control"
                      id="instrument"
                      name="instrument"
                      value={formData.instrument}
                      onChange={handleChange}
                    >
                      <option value="">Select Instrument</option>
                      <option value="NIFTY">Nifty 50</option>
                      <option value="BANKNIFTY">Nifty Bank</option>
                      <option value="BANKEX">BSE Bankex</option>
                      <option value="SENSEX">BSE Sensex</option>
                    </select>
                  )}
                  {formData.instrument && (
                    <div className="mt-2">
                      <label htmlFor="expiry">Expiry</label>
                      {loadingExpiries ? (
                        <div>Loading expiries...</div>
                      ) : (
                        <select
                          className="form-control"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                        >
                          <option value="">Select Expiry</option>
                          {expiries.slice(0, 5).map((exp) => (
                            <option key={exp.value} value={exp.value}>
                              {exp.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {/* Strike dropdown below expiry */}
                      {formData.expiry && (
                        <div className="mt-2">
                          <label htmlFor="strike">Strike</label>
                          {loadingStrikes ? (
                            <div>Loading strikes...</div>
                          ) : (
                            <select
                              className="form-control"
                              id="strike"
                              name="strike"
                              value={formData.strike}
                              onChange={handleChange}
                            >
                              <option value="">Select Strike</option>
                              {strikes.map((strike) => (
                                <option key={strike.value} value={strike.value}>
                                  {strike.label / 100}{" "}
                                  {/* 100 se divide karke display */}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  id="instrument"
                  name="instrument"
                  placeholder="e.g. NIFTY"
                  value={formData.instrument}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="script">Script</label>
              <input
                type="text"
                className="form-control"
                id="script"
                name="script"
                placeholder="e.g. SBIN"
                value={formData.script}
                onChange={handleChange}
              />
            </div>
            {formData.segment !== "Equity" && (
              <div className="form-group mb-20 col-md-6">
                <label htmlFor="expiry">Expiry</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiry"
                  name="expiry"
                  placeholder="e.g. 25-Jul-2025"
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="row">
            {formData.segment !== "Equity" && (
              <div className="form-group mb-20 col-md-6">
                <label htmlFor="strike">Strike</label>
                <input
                  type="number"
                  className="form-control"
                  id="strike"
                  name="strike"
                  placeholder="e.g. 450"
                  value={formData.strike}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="positionStatus">Position Status</label>
              <select
                className="form-control"
                id="positionStatus"
                name="positionStatus"
                value={formData.positionStatus}
                onChange={handleChange}
              >
                <option value="Fresh Entry">Fresh Entry</option>
                <option value="Partially Exit">Partially Exit</option>
                <option value="Full Exit">Full Exit</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="callType">Call Type</label>
              <select
                className="form-control"
                id="callType"
                name="callType"
                value={formData.callType}
                onChange={handleChange}
              >
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="entryRangeFrom">Entry Range From</label>
              <input
                type="number"
                className="form-control"
                id="entryRangeFrom"
                name="entryRangeFrom"
                placeholder="e.g. 100"
                value={formData.entryRangeFrom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="entryRangeTo">Entry Range To</label>
              <input
                type="number"
                className="form-control"
                id="entryRangeTo"
                name="entryRangeTo"
                placeholder="e.g. 120"
                value={formData.entryRangeTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="stopLossFrom">Stop Loss From</label>
              <input
                type="number"
                className="form-control"
                id="stopLossFrom"
                name="stopLossFrom"
                placeholder="e.g. 90"
                value={formData.stopLossFrom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="stopLossTo">Stop Loss To</label>
              <input
                type="number"
                className="form-control"
                id="stopLossTo"
                name="stopLossTo"
                placeholder="e.g. 95"
                value={formData.stopLossTo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-4">
              <label htmlFor="target1">Target 1</label>
              <input
                type="number"
                className="form-control"
                id="target1"
                name="target1"
                placeholder="e.g. 130"
                value={formData.target1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-20 col-md-4">
              <label htmlFor="target2">Target 2</label>
              <input
                type="number"
                className="form-control"
                id="target2"
                name="target2"
                placeholder="e.g. 140"
                value={formData.target2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-20 col-md-4">
              <label htmlFor="target3">Target 3</label>
              <input
                type="number"
                className="form-control"
                id="target3"
                name="target3"
                placeholder="e.g. 150"
                value={formData.target3}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="customTitle">Custom Title</label>
              <input
                type="text"
                className="form-control"
                id="customTitle"
                name="customTitle"
                placeholder="e.g. High Risk"
                value={formData.customTitle}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-20 col-md-6">
              <label htmlFor="customMessage">Custom Message</label>
              <input
                type="text"
                className="form-control"
                id="customMessage"
                name="customMessage"
                placeholder="e.g. Enter at your own risk"
                value={formData.customMessage}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group mb-20">
            <label htmlFor="subscriptionType">Subscription Type</label>
            <select
              className="form-control"
              id="subscriptionType"
              name="subscriptionType"
              value={formData.subscriptionType}
              onChange={handleChange}
            >
              <option value="all">All Users</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className="form-group mb-20">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Call"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCall;
