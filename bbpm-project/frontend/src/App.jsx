import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [addr, setAddr] = useState("");
  const [password, setPassword] = useState("");
  const [stored, setStored] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    message: "",
    onConfirm: () => { },
    type: "info"
  });

  const storePassword = async () => {
    try {
      await axios.post("http://localhost:3000/store", {
        addr,
        ciphertext: btoa(password),
      });
      showDialog("Password stored securely on blockchain!", "success");
    } catch (error) {
      showDialog("Error storing password: " + error.message, "error");
    }
  };

  const getPassword = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/get/${addr}`);
      if (res.data.ciphertext) {
        setStored(atob(res.data.ciphertext));
        showDialog("Password retrieved successfully!", "success");
      } else {
        showDialog("No password found for this address", "info");
      }
    } catch (error) {
      showDialog("Error retrieving password: " + error.message, "error");
    }
  };

  const clearAll = () => {
    showDialog("Are you sure you want to clear all fields?", "confirm", () => {
      setAddr("");
      setPassword("");
      setStored("");
      setShowPassword(false);
    });
  };

  const showDialog = (message, type = "info", onConfirm = () => { }) => {
    setDialogConfig({ message, onConfirm, type });
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    dialogConfig.onConfirm();
    setShowConfirmDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBiometric = () => {
    showDialog("Biometric authentication would be implemented here", "info");
  };

  return (
    <div className="container">
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className={`dialog-header ${dialogConfig.type}`}>
              <i className={
                dialogConfig.type === "error" ? "fas fa-exclamation-triangle" :
                  dialogConfig.type === "success" ? "fas fa-check-circle" :
                    dialogConfig.type === "confirm" ? "fas fa-question-circle" :
                      "fas fa-info-circle"
              }></i>
              <h3>{
                dialogConfig.type === "error" ? "Error" :
                  dialogConfig.type === "success" ? "Success" :
                    dialogConfig.type === "confirm" ? "Confirmation" :
                      "Information"
              }</h3>
            </div>
            <div className="dialog-content">
              <p>{dialogConfig.message}</p>
            </div>
            <div className="dialog-actions">
              {dialogConfig.type === "confirm" && (
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
              )}
              <button className={`btn-confirm ${dialogConfig.type}`} onClick={handleConfirm}>
                {dialogConfig.type === "confirm" ? "Confirm" : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <div className="logo">
          <i className="fas fa-lock"></i>
          <h1>SecureVault</h1>
        </div>
        <div className="subtitle">Blockchain-Powered Password Management</div>
      </div>

      <div className="content">
        <div className="card">
          <div className="card-title">
            <i className="fas fa-key"></i>
            <span>Password Management</span>
            <button className="btn-clear" onClick={clearAll} title="Clear all">
              <i className="fas fa-broom"></i> Clear All
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="address">Wallet Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your wallet address"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn-toggle-password"
                onClick={togglePasswordVisibility}
                type="button"
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
          </div>

          <div className="btn-group">
            <button className="btn-primary" onClick={storePassword} disabled={!addr || !password}>
              <i className="fas fa-shield-alt"></i>
              Store Securely
            </button>
            <button className="btn-success" onClick={getPassword} disabled={!addr}>
              <i className="fas fa-download"></i>
              Retrieve Password
            </button>
          </div>

          <div className="password-display">
            <div className="password-label">Decrypted Password:</div>
            <div className="password-value">
              {stored || "Your password will appear here"}
              {stored && (
                <button
                  className="btn-toggle-password"
                  onClick={() => setStored("")}
                  title="Clear password"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <div className="biometric-section">
            <div className="section-title">
              <i className="fas fa-fingerprint"></i>
              <span>Biometric Authentication</span>
            </div>
            <p className="section-description">Use your fingerprint for enhanced security</p>
            <button className="btn-accent btn-biometric" onClick={handleBiometric}>
              <i className="fas fa-fingerprint"></i>
              Enable Biometric Verification
            </button>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <i className="fas fa-link-slash"></i>
            <span>Passwordless Login</span>
          </div>
          <div className="feature">
            <i className="fas fa-user-secret"></i>
            <span>Zero-Knowledge Proofs</span>
          </div>
          <div className="feature">
            <i className="fas fa-fingerprint"></i>
            <span>Biometric Authentication</span>
          </div>
          <div className="feature">
            <i className="fas fa-database"></i>
            <span>Decentralized Storage</span>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>Powered by Blockchain Technology • Your Security is Our Priority</p>
        <p>© 2023 SecureVault. All rights reserved.</p>
        <div className="credits">Sriaditya S, Sachin Kumar N, Aadil Mohamed</div>
      </div>
    </div>
  );
}

export default App;