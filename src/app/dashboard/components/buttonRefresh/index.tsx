"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export const ButtonRefresh = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      router.refresh();
      setLoading(false);
    }, 1000);
  };

  return (
    <button 
      onClick={handleRefresh} 
      className={`btn-refresh bg-green-600 px-4 py-1 rounded flex items-center justify-center ${loading ? 'cursor-wait' : ''}`}
      disabled={loading}
    >
      <FiRefreshCcw 
        size={24} 
        color="#FFF" 
        className={`${loading ? 'animate-spin' : ''}`}
      />
    </button>
  )
}
