import express from "express";
import cors from "cors";
import prorationRoutes from "./routes/proration.routes";

const app = express();

// allow frontend access
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
}));

app.use(express.json());

app.use("/api", prorationRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
