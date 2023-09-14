import axios from "axios";

export default async function favoritesAPI(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    let data = JSON.stringify({
      id: id,
      order_id: "101",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.idpay.ir/v1.1/payment/inquiry",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "6a7f99eb-7c20-4412-a972-6dfb7cd253a4",
        "X-SANDBOX": "1",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ error });
      });
  }
}
