import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { redirect, useNavigate } from "react-router-dom";

export const useGrammar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuthStore();
  const checkGrammar = useCallback(
    async (body, signal) => {
      try {
        setLoading(true);
        const response = await fetch("/api/grammar-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: body }),
          signal,
        });
        if (response.status === 200) {
          const result = await response.json();
          setMistakes(result.mistakes ?? []);
        }
        if (response.status === 401) {
          setMistakes([]);
          logout();
          navigate("/login");
          return;
        }
        // TODO: Error handling for rate limit
      } finally {
        setLoading(false);
      }
    },
    [setLoading, token]
  );

  useEffect(() => {
    if (text.length) {
      const controller = new AbortController();
      const delayedCall = setTimeout(
        () => checkGrammar(text, controller.signal),
        500
      );

      return () => {
        controller.abort();
        clearTimeout(delayedCall);
      };
    }
  }, [text, checkGrammar]);
  return {
    text,
    setText,
    mistakes,
    loading,
  };
};
