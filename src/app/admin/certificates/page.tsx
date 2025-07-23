"use client";

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

export default function AdminSync() {
  const { isAuthenticated, user } = useKindeAuth();
  const [loading, setLoading] = useState(false);

  const syncLinkedIn = async () => {
    setLoading(true);
    const res = await fetch("/api/linkedin/sync");
    const data = await res.json();
    alert(data.message);
    setLoading(false);
  };

  if (!isAuthenticated || user?.email !== "skmohammedarshad333@gmail.com") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={syncLinkedIn} disabled={loading}>
        {loading ? "Syncing..." : "Sync LinkedIn Certifications"}
      </button>
    </div>
  );
}
