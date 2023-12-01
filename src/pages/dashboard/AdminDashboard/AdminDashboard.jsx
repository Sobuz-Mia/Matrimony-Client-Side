import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { BiGroup } from "react-icons/bi";
import { GiMale, GiFemale } from "react-icons/gi";
import { IoMdStar } from "react-icons/io";
import { PieChart, Pie, Cell, Legend } from "recharts";
const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: allCountData = {}, isPending } = useQuery({
    queryKey: ["allDataCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/count-data");
      return res?.data;
    },
  });
  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }
  const data = [
    { name: "All Biodata", value: allCountData?.totalBio },
    { name: "Male ", value: allCountData?.maleData },
    { name: "Female ", value: allCountData?.femaleData },
    { name: "Premium", value: allCountData?.premiumData },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#32822E"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      {user && (
        <Paper
          elevation={2}
          sx={{
            maxWidth: "fit-Content",
            my: "5px",
            padding: "5px",
            fontWeight: "bold",
          }}
        >
          <Typography sx={{ fontSize: "25px" }}>
            Hi, Welcome Back{" "}
            <span style={{ color: "#E33183" }}>{user?.displayName}</span>
          </Typography>
        </Paper>
      )}
      <Card
        sx={{
          background: "#E33183",
          width: "25%",
          ml: 2,
          mt: 2,
          color: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h4">${allCountData?.totalRevenue}</Typography>
        </CardContent>
      </Card>
      <Grid
        container
        spacing={2}
        sx={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "8px",
          mt: 2,
          ml: 2,
        }}
      >
        <Grid item xs={3} sx={{ textAlign: "center" }}>
          <Typography color={"secondary"} sx={{ fontSize: "30px" }}>
            <BiGroup />
          </Typography>
          <Typography variant="h6" className="stat-title">
            Total Biodata
          </Typography>
          <Typography variant="h5" className="stat-value">
            {allCountData?.totalBio}
          </Typography>
        </Grid>

        <Grid item xs={3} sx={{ textAlign: "center" }}>
          <Typography color={"secondary"} sx={{ fontSize: "30px" }}>
            <GiMale />
          </Typography>
          <Typography variant="h6" className="stat-title">
            Male Biodata
          </Typography>
          <Typography variant="h5" className="stat-value">
            {allCountData?.maleData}
          </Typography>
        </Grid>

        <Grid item xs={3} sx={{ textAlign: "center" }}>
          <Typography color={"secondary"} sx={{ fontSize: "30px" }}>
            <GiFemale />
          </Typography>
          <Typography variant="h6" className="stat-title">
            Female Biodata
          </Typography>
          <Typography variant="h5" className="stat-value">
            {allCountData?.femaleData}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "center" }}>
          <Typography color={"secondary"} sx={{ fontSize: "30px" }}>
            <IoMdStar />
          </Typography>
          <Typography variant="h6" className="stat-title">
            Premium Biodata
          </Typography>
          <Typography variant="h5" className="stat-value">
            {allCountData?.premiumData}
          </Typography>
        </Grid>

        
      </Grid>
      <PieChart width={400} height={200} style={{ mx: "auto" }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend></Legend>
      </PieChart>
    </>
  );
};

export default AdminDashboard;
