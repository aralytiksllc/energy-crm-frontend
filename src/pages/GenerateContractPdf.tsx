import * as React from "react";
import { useParams, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export function GenerateContractPdf() {
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.open(`${API_URL}/contracts/${id}/generate-pdf`, "_blank");
    navigate(-1);
  }, [id, navigate]);

  return null;
}
