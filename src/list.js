import { useEffect, useState } from "react";

function List() {
  const [expenses, setExpenses] = useState([]);
  const [method, setMethod] = useState("All");
  const [word, setWord] = useState("");

  const styles = {
    container: {
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      margin: "16px",
      minWidth: "200px",
    },
    header: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    content: {
      fontSize: "16px",
    },
  };

  const fetchingData = async () => {
    const url =
      "https://api.jsonsilo.com/demo/2dd2a832-f6d3-4f98-ab86-581824e8787f";
    const response = await fetch(url);
    const json = await response.json();
    const data = json["data"];

    return data;
  };

  useEffect(() => {
    const fetchHelp = async () => {
      const response = await fetchingData();
      setExpenses(response);
    };

    fetchHelp();
  }, []);

  return (
    <div className='animate__animated animate__fadeInLeft'>
      <h1>Expenses</h1>
      <input
        type='text'
        name='word'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button
        onClick={() => {
          setMethod("credit");
        }}
      >
        Credit
      </button>
      <button
        onClick={() => {
          setMethod("debit");
        }}
      >
        Debit
      </button>
      <button onClick={() => setMethod("All")}>All</button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {expenses &&
          expenses
            .filter((e) => {
              if (method === "All") return true;
              return e.type === method;
            })
            .filter((e) => {
              if (word.length === 0) return true;
              const descInLowerCase = e.description.toLowerCase();
              const wordInLowerCase = word.toLowerCase();
              return descInLowerCase.includes(wordInLowerCase);
            })
            .map((e) => {
              const transactionType = e.type;
              return (
                <div key={e.id} style={styles.container}>
                  <h4 style={styles.header}>
                    {e.id} | {e.description}
                  </h4>
                  <div style={styles.content}>
                    <h3
                      style={{
                        color: transactionType === "debit" ? "red" : "green",
                      }}
                    >
                      {transactionType === "debit" ? "-" : ""} $ {e.amount}
                    </h3>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default List;

// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const x = a
//   .filter((e) => {
//     return e % 2 == 0;
//   })
//   .map((e) => {
//     return e * e;
//   });
