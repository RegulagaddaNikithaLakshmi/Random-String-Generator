import React, { useState, useEffect, useCallback } from "react";

export default function App() {
  const [length, setLength] = useState(10);
  const [characters, setCharacters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  );
  const [result, setResult] = useState("");
  const [recent, setRecent] = useState([]);
  
  // State for the custom modal message
  const [modalMessage, setModalMessage] = useState("");

  /**
   * Generates a random string based on the current length and character set.
   * Uses useCallback to memoize the function, preventing unnecessary re-creations
   * on re-renders unless 'length' or 'characters' change.
   */
  const generateRandomString = useCallback(() => {
    // Basic validation to check for empty or invalid input.
    if (!characters.trim()) {
      setModalMessage("Please enter at least one character to use!");
      return;
    }
    if (length <= 0) {
      setModalMessage("Please enter a valid length (greater than 0).");
      return;
    }

    let generated = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      generated += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setResult(generated);

    // Store recent searches (max 5) in the 'recent' state.
    setRecent((prev) => {
      const updated = [generated, ...prev];
      return updated.slice(0, 5);
    });
  }, [length, characters]);

  /**
   * Copies the generated string to the user's clipboard using the modern
   * Clipboard API. A custom modal is used for a user-friendly message.
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setModalMessage("Copied to clipboard!");
    } catch (err) {
      setModalMessage("Failed to copy. Clipboard API not supported.");
    }
  };

  /**
   * useEffect hook to trigger initial string generation when the component mounts.
   * The dependency array includes 'generateRandomString' to satisfy ESLint,
   * as the function is a dependency of the effect.
   */
  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  // A custom modal component to display messages
  const Modal = ({ message, onClose }) => {
    if (!message) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
        animation: 'fadeIn 0.3s'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          border: '2px solid #6366f1'
        }}>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>{message}</p>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: '700',
              transition: 'background-color 0.3s, transform 0.3s',
              cursor: 'pointer',
              border: 'none',
              transform: 'scale(1)',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#1f2937',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif',
      color: '#e5e7eb',
    }}>
      {/* Main container with a new, dark theme */}
      <div style={{
        backgroundColor: '#111827',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '42rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        border: '2px solid #4f46e5',
      }}>
        
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'white',
          lineHeight: '1.25',
        }}>
          Random String Generator
        </h1>

        {/* Generated String Display */}
        <div style={{
          backgroundColor: 'rgba(55, 65, 81, 0.4)',
          backdropFilter: 'blur(5px)',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '2px solid #4f46e5',
          wordBreak: 'break-all',
          fontSize: '1.5rem',
          fontFamily: 'monospace',
          color: '#c7d2fe',
          transition: 'transform 0.3s',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          {result}
        </div>

        {/* Controls Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#9ca3af',
              marginBottom: '0.5rem',
            }}>
              String Length:
            </label>
            <input
              type="number"
              value={length}
              min="1"
              onChange={(e) => setLength(parseInt(e.target.value))}
              style={{
                padding: '0.75rem',
                width: '100%',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#4299e1'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}>
            <label style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#9ca3af',
              marginBottom: '0.5rem',
            }}>
              Characters to use:
            </label>
            <input
              type="text"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              style={{
                padding: '0.75rem',
                width: '100%',
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#4299e1'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <button
            onClick={generateRandomString}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundImage: 'linear-gradient(to right, #4f46e5, #9333ea)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              border: 'none',
              transform: 'scale(1)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)'; }}
          >
            Generate
          </button>
          <button
            onClick={copyToClipboard}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              border: 'none',
              transform: 'scale(1)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)'; }}
          >
            Copy
          </button>
        </div>

        {/* Recent Searches Section */}
        {recent.length > 0 && (
          <div style={{
            marginTop: '2rem',
            textAlign: 'left',
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#9ca3af',
              marginBottom: '0.75rem',
            }}>Recent Searches:</h3>
            <ul style={{
              backgroundColor: '#374151',
              padding: '1rem',
              borderRadius: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
            }}>
              {recent.map((item, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: '#1f2937',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    fontFamily: 'monospace',
                    color: '#e5e7eb',
                    wordBreak: 'break-word',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(0.25rem)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Modal for alerts */}
      <Modal message={modalMessage} onClose={() => setModalMessage("")} />
    </div>
  );
}
