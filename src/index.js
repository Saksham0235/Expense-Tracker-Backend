const express=require("express")

const cors=require("cors")
const expensesRouter=require("./routes/expenseRoutes");



const app=express();


app.use(cors());
app.use(express.json());

app.use("/api/expenses",expensesRouter);

const PORT=8080;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})