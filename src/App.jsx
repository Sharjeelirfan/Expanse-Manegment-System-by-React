import { useState } from "react";

import "./App.css";

function App() {
  let [amount, setAmount] = useState(0);
  let [tarnsaction, setTarnsaction] = useState([]);
  let [type, setType] = useState("income");
  let [editAmount, setEditAmount] = useState(null)


  let handleAmount = (event) =>{
    if(event.key === "Enter") addText()
  }

  let addText = () => {

    if(editAmount !== null){
      let copyTran = [...tarnsaction];
      copyTran[editAmount] = {amount , type }
      setTarnsaction(copyTran)
        setEditAmount(null)
    }else{

      if (amount && type) {
        setTarnsaction([...tarnsaction, { amount, type }]);
      } else {
        alert("Please Enter Amount!");
      }
    }
  setAmount("");
  };

  let totalIncome = tarnsaction.reduce((acc, curr) => {
    return curr.type == "income" ? acc + Number(curr.amount) : acc;
  }, 0);

  let totalExpence = tarnsaction.reduce((acc, curr) => {
    return curr.type == "expence" ? acc + Number(curr.amount) : acc;
  }, 0);

  let balance = totalIncome - totalExpence;

  let deleteAmount = (index) => {
    let copytran = [...tarnsaction];
    copytran.splice(index, 1);
    setTarnsaction(copytran);
  };

  let edit = (index) => {
    setAmount(tarnsaction[index].amount)
    setType(tarnsaction[index].type)
    setEditAmount(index)
    }
  

  return (
    <>
      <div id="main">
        <h1>Expence Manegment System.</h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <p>Income</p>
            <p>{totalIncome}</p>
          </div>
          <div>
            <p>Expence</p>
            <p>{totalExpence}</p>
          </div>
          <div>
            <p>Balance</p>
            <p>{balance}</p>
          </div>
        </div>

        <div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            onKeyDown={handleAmount}
            id="amountInput"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            id="select"
          >
            <option value="income">Income</option>
            <option value="expence">Expence</option>
          </select>{" "}
          <button onClick={addText}>
            {editAmount === null ? "Add" : "Edit"}
          </button>
        </div>

        <div id="tableDiv">
          <table id="table" style={{ border: "3px solid black" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {tarnsaction.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.amount}</td>
                    <td>{data.type}</td>{" "}
                    <td>
                      <button onClick={() => deleteAmount(index)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => edit(index)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
