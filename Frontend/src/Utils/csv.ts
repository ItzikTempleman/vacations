
type Vacation = {
  id: number;
  destination: string;
};

type LikesMap = { [vacationId: number]: number };

export function downloadLikesCsv(vacations: Vacation[], likes: LikesMap) {
  const rows = vacations.map(v => `${(v.destination || "").split(",")[0].trim()},${likes[v.id] ?? 0}`);
  const csv = "\uFEFF" + ["destination,likes", ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "vacation-likes.csv";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}