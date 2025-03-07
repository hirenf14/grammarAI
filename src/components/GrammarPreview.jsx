import { useMemo } from "react";

export function GrammarPreview({ value, mistakes }) {
  const preview = useMemo(() => {
    if (!value || !mistakes?.length) return value;

    let result = value;
    // Process mistakes from end to start to avoid index shifting
    for (const mistake of [...mistakes].sort(
      (a, b) => b.startIndex - a.startIndex
    )) {
      const before = result.slice(0, mistake.startIndex);
      const highlighted = result.slice(
        mistake.startIndex,
        mistake.endIndex + 1
      );
      const after = result.slice(mistake.endIndex + 1);
      result =
        before +
        `<span class="border-b-2 border-b-red-400">${highlighted}</span>` +
        after;
    }
    return result;
  }, [value, mistakes]);
  return (
    <p
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: preview }}
    />
  );
}
