const { useState, useEffect } = React;

function Wallet() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);

    function handleDeposit() {
        const num = Number(amount);
        if (num === 0) 
            return alert("Enter amount");
        setBalance(balance + num);
        setTransactions([...transactions, 
            {
                id: Date.now(), 
                type: "Inflow", 
                amount: num, 
                date: new Date().toLocaleString(), 
            }]);
        setAmount("");
    }

    function handleWithdrawal() {
        const num = Number(amount);
        if (num === 0) 
            return alert("Enter amount");
        if (num > balance)
            return alert("Insufficient Funds");
        setBalance(balance - num);
        setTransactions([...transactions, 
            {
                id: Date.now(), 
                type: "Outflow", 
                amount: num, 
                date: new Date().toLocaleString(), 
            }]);
        setAmount("");
    }

    useEffect(() => {
        const savedBalance = localStorage.getItem("myWalletBalance");
        const savedHistory = localStorage.getItem("myWalletHistory");

        if (savedBalance !== null) {
            setBalance(Number(savedBalance));
        }

        if (savedHistory !== null) {
            setTransactions(JSON.parse(savedHistory));
        }
    }, 
    []);

    useEffect(() => {
        localStorage.setItem("myWalletBalance", balance);
        localStorage.setItem("myWalletHistory", JSON.stringify(transactions));
    },
    [balance, transactions]);

    return (
        <div className="container">
            <h1>${balance.toFixed(2)}</h1>

            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

            <div class="buttons">
                <button onClick={handleDeposit}>Add Funds</button>
                <button onClick={handleWithdrawal}>Withdraw Funds</button>
            </div>

            <h2>Wallet History</h2>
            <ul>
                {transactions.slice().reverse().map((transaction) => (
                    <li key={transaction.id} style={{ color: transaction.type === "Inflow" ? "green" : "red" }}>
                        {transaction.type}: ${transaction.amount}, {transaction.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.render(<Wallet />, document.getElementById("root"));


/*const balanceDisplay = document.getElementById("account-balance");
const amountInput = document.getElementById("amount-input");
const depositBtn = document.getElementById("deposit");
const withdrawalBtn = document.getElementById("withdrawal");
const transactionHistory = document.getElementById("transaction-history");

let currentBalance = 0;

let transactions = [];

function walletUpdate(isAddition){

    let amount = Number(amountInput.value);

    if (amount === 0){
        window.alert("Please enter a number greater than 0")
        return;
    }
    
    if (isAddition === false && amount > currentBalance) {
        window.alert("Insufficient Funds");
        return;
    }

    if (isAddition){
        currentBalance = currentBalance + amount;
    } 
    else {
        currentBalance = currentBalance - amount;
    }

    balanceDisplay.innerText = currentBalance;

    const transactionDetails = {
        id: Date.now(),
        amount: amount,
        type: isAddition ? "Inflow" : "Outflow",
        date: new Date().toLocaleString()
        
    };
    transactions.push(transactionDetails);
    renderTransactionHistory();
    saveWalletData();
    
    amountInput.value = '';
}

depositBtn.addEventListener("click", () => walletUpdate(true));
withdrawalBtn.addEventListener("click", () => walletUpdate(false));

function renderTransactionHistory(){
    transactionHistory.innerHTML = '';
    let reversedTransactions = transactions.slice().reverse();

    reversedTransactions.forEach(function(transaction) {
        const li = document.createElement("li")
        if (transaction.type === "Inflow"){
            li.style.color = "green";
        }else{
            li.style.color = "red";
        }
        li.innerText = `${transaction.type}: $${transaction.amount}, ${transaction.date}`;
        transactionHistory.appendChild(li);
    });
}


function saveWalletData(){
    localStorage.setItem("myWalletBalance", currentBalance);
    localStorage.setItem("myWalletHistory", JSON.stringify(transactions));
}


function loadWalletData(){
    const savedBalance = localStorage.getItem("myWalletBalance");
    const savedHistory = localStorage.getItem("myWalletHistory");

    if (savedBalance !== null) {
        currentBalance = Number(savedBalance);
        balanceDisplay.innerText = currentBalance;
    }

    if (savedHistory !== null) {
        transactions = JSON.parse(savedHistory);
        renderTransactionHistory();
    }
}

loadWalletData();*/