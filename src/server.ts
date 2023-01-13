import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    await AppDataSource.initialize()
        .then(() => console.log("database connected"))
        .catch((err) => console.log("database not connected", err));

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}🚀`);
    });
})();
