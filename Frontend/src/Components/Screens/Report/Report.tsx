import "./Report.css";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AppState } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import FavoriteIcon from "@mui/icons-material/Favorite";



type ChartRow = { name: string; likes: number };

export function Report() {
  const vacations = useSelector((s: AppState) => s.vacation);

  const [data, setData] = useState<ChartRow[]>([]);


  useEffect(() => {
    if (!vacations || vacations.length === 0) {
      setData([]);
      return;
    }


    (async () => {
 
     const rows: ChartRow[] = [];




      for (const v of vacations) {
        const id = v?.id;
        const cleanName = String(v?.destination ?? "").split(",")[0].trim();
        let likes = 0;
        if (typeof id === "number") {
          try {
            likes = await vacationService.getLikesCount(id);
          } catch {
            likes = 0;
          }
        }
        rows.push({ name: cleanName, likes });
      }

      rows.sort((a, b) => b.likes - a.likes);
      setData(rows);
    })();
  }, [vacations]);

  return (
    <div className="Report">
      <h2>Reports</h2>

      <div className="likes-icon">
        <FavoriteIcon />
        <div className="likes-text">Amount of likes</div>
      </div>

      <div className="graph">
        <div className="report-chart">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" name="Likes" fill="#42a5f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}