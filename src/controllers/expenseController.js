const db =require("../db/database")

exports.getExpenses=(req,res)=>{
    const expenses=db.prepare(
        "SELECT * From expenses ORDER BY date DESC").all()
        res.json(expenses);
}

exports.addExpense=(req,res)=>{
    const {amount,category,date,note}=req.body;
    const result=db.prepare(
        `
        INSERT INTO expenses (amount,category,date,note)
        VALUES(?,?,?,?)`
    ).run(amount,category,date,note);

    res.status(201).json({
        id:result.lastInsertRowid,
        amount: Number(amount),     // Ensuring it goes back as a number
            category,
            date,
            note
    });
};


exports.updateExpense=(req,res)=>{
    const {id}=req.params
    const {amount,category,date,note}=req.body;

    db.prepare(
        `
        UPDATE expenses
        SET amount=?,category=?,date=?,note=?
        WHERE id=?
        `
    ).run(amount,category,date,note,id);
    res.json({
        message:"Expense updated successfully",
        id: Number(id), 
        amount: Number(amount),
            category,
            date,
            note
    })
}
exports.deleteExpense = (req, res) => {
    const { id } = req.params;
  
    db.prepare(
      "DELETE FROM expenses WHERE id=?"
    ).run(id);
  
    res.json({
      message: "Deleted",
    });
  };