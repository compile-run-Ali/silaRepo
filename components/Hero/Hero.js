import axios from "axios";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get("/api/get_products");
      const dbProducts = res.data.map((product) => ({
        ...product,
        hidden: false,
        category: product.main_cat,
      }));
      setProducts(dbProducts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Extract rank numbers
  const rankNumbers = products
    .map((product) => {
        try{
            const match = product.rank.split(" ")[0]
            return match ? parseInt(match) : null;
        }catch (error){
            return 0
        }
    })
    .filter((rank) => !isNaN(rank)); // Filter out NaN values

  // Count the number of products falling into each range
  const rankCounts = rankNumbers.reduce(
    (counts, rank) => {
      if (rank >= 0 && rank <= 5000) {
        counts["0-5000"]++;
      } else if (rank >= 5001 && rank <= 10000) {
        counts["5001-10000"]++;
      } else if (rank >= 10001 && rank <= 15000) {
        counts["10001-15000"]++;
      } else if (rank >= 15001 && rank <= 20000) {
        counts["15001-20000"]++;
      }
      return counts;
    },
    { "0-5000": 0, "5001-10000": 0, "10001-15000": 0, "15001-20000": 0 }
  );

  console.log(rankCounts)
  const data = {
    labels: ["0-5000", "5001-10000", "10001-15000", "15001-20000"],
    datasets: [
      {
        label: "Product Count",
        data: Object.values(rankCounts),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full px-10">
      <h2>Products by Rank</h2>
      {data && <Bar data={data} />}
    </div>
  );
}
