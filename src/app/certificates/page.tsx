"use client";
import { useEffect, useState } from "react";

interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate?: string;
  credentialUrl?: string;
  logoUrl?: string;
}

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    fetch("/api/certifications")
      .then((res) => res.json())
      .then(setCerts);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">My Certifications</h2>
      <div className="grid gap-4">
        {certs.map(cert => (
          <div key={cert.id} className="p-4 border rounded-lg">
            {cert.logoUrl && <img src={cert.logoUrl} alt={cert.organization} width={50} />}
            <h3>{cert.title}</h3>
            <p>{cert.organization}</p>
            {cert.issueDate && <p>Issued: {new Date(cert.issueDate).toDateString()}</p>}
            {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">View Certificate</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
