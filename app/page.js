
"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("discover");
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const dragPosition = useRef({ x: 0, y: 0 });

  const currentProfile = profiles[0];

  // Load profiles from backend
  useEffect(() => {
    async function loadFeed() {
      try {
        const response = await fetch("/api/feed");

        if (!response.ok) {
          throw new Error("Could not load profiles");
        }

        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  // Load matches when Matches tab opens
  useEffect(() => {
    if (activeTab !== "matches") return;

    async function loadMatches() {
      try {
        const response = await fetch("/api/matches");

        if (!response.ok) {
          throw new Error("Could not load matches");
        }

        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadMatches();
  }, [activeTab]);

  // Save Like or Pass in database
  async function handleSwipe(action) {
    if (!currentProfile || isSwiping) return;

    setIsSwiping(true);
    setError("");

    try {
      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: currentProfile.id,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Swipe failed");
      }

      setFeedback(
        data.matched
          ? "It's a match! ❤️"
          : action === "like"
          ? "❤️ Liked!"
          : "Passed"
      );

      setDragOffset({
        x: action === "like" ? 600 : -600,
        y: 0,
      });

      // Show feedback, then remove current profile
      setTimeout(() => {
        setProfiles((previous) => previous.slice(1));
        setDragOffset({ x: 0, y: 0 });
        setFeedback("");
        setIsSwiping(false);
      }, 1000);

    } catch (err) {
      setError(err.message);
      setDragOffset({ x: 0, y: 0 });
      setIsSwiping(false);
    }
  }

  function handlePointerDown(event) {
    if (event.target.closest("button") || isSwiping) return;

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
    };

    dragPosition.current = { x: 0, y: 0 };

    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  
function handlePointerMove(event) {
  if (!isDragging || isSwiping) return;

  const x = event.clientX - dragStart.current.x;
  const y = event.clientY - dragStart.current.y;

  // Actual distance is used to detect swipe
  dragPosition.current = { x, y };

  // Limit visual movement while dragging
  const limitedX = Math.max(-120, Math.min(120, x));
  const limitedY = Math.max(-40, Math.min(40, y));

  setDragOffset({
    x: limitedX,
    y: limitedY,
  });
}


  function handlePointerUp() {
    if (!isDragging) return;

    setIsDragging(false);

    const distance = dragPosition.current.x;

    if (distance > 100) {
      handleSwipe("like");
    } else if (distance < -100) {
      handleSwipe("pass");
    } else {
      setDragOffset({ x: 0, y: 0 });
      dragPosition.current = { x: 0, y: 0 };
    }
  }

  function handlePointerCancel() {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    dragPosition.current = { x: 0, y: 0 };
  }

  return (
    <main className="app-container">
      <header className="header">
        <h1>
          coy<span>.</span>
        </h1>
        <p>Find your connection</p>
      </header>

      <section className="content">
        {activeTab === "home" && (
          <div className="placeholder">
            <h2>Home</h2>
            <p>Welcome to Coy!</p>
          </div>
        )}

        {activeTab === "discover" && (
          <div className="discover-section">
            <div className="section-heading">
              <h2>Discover</h2>
              <p>Find someone interesting.</p>
            </div>

            {loading ? (
              <p>Loading profiles...</p>
            ) : error ? (
              <p>{error}</p>
            ) : currentProfile ? (
              <div
                className="profile-card"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                style={{
                  transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
                  transition: isDragging
                    ? "none"
                    : "transform 300ms ease",
                }}
              >
                <div className="profile-image-wrapper">
                  <img
                    src={currentProfile.photo}
                    alt={currentProfile.name}
                    className="profile-image"
                  />

                  <div className="profile-overlay">
                    <h2>
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                    <p>📍 {currentProfile.city}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <p className="profile-bio">
                    {currentProfile.bio}
                  </p>

                  <div className="interests">
                    {currentProfile.interests.map((interest) => (
                      <span key={interest} className="interest-tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {feedback && (
                  <div className="feedback">{feedback}</div>
                )}

                <div className="swipe-buttons">
                  <button
                    className="pass-button"
                    onClick={() => handleSwipe("pass")}
                    disabled={isSwiping}
                    aria-label="Pass profile"
                  >
                    ✕
                  </button>

                  <button
                    className="like-button"
                    onClick={() => handleSwipe("like")}
                    disabled={isSwiping}
                    aria-label="Like profile"
                  >
                    ♥
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <h2>You're all caught up! 🎉</h2>
                <p>There are no more profiles to discover.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "matches" && (
          <div className="matches-section">
            <h2>Matches</h2>

            {matches.length === 0 ? (
              <p>Your mutual matches will appear here.</p>
            ) : (
              <div className="matches-list">
                {matches.map((match) => (
                  <div className="match-card" key={match.id}>
                    <img
                      src={match.photo}
                      alt={match.name}
                      width="70"
                    />
                    <div>
                      <h3>{match.name}, {match.age}</h3>
                      <p>{match.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <nav className="bottom-nav">
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          <span>⌂</span>
          Home
        </button>

        <button
          className={activeTab === "discover" ? "active" : ""}
          onClick={() => setActiveTab("discover")}
        >
          <span>♡</span>
          Discover
        </button>

        <button
          className={activeTab === "matches" ? "active" : ""}
          onClick={() => setActiveTab("matches")}
        >
          <span>♥</span>
          Matches
        </button>
      </nav>
    </main>
  );
}
