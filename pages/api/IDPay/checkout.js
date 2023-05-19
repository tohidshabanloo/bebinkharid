import axios from 'axios'
import Router from 'next/router'

export default async function favoritesAPI(req, res) {
  if (req.method === 'POST') {
    const { order_id, amount, name, phone, mail, desc } = req.body
    let data = JSON.stringify({
      order_id: 101,
      amount,
      name: 'قاسم رادمان',
      phone: '09382198592',
      mail: 'my@site.com',
      desc: 'توضیحات پرداخت کننده',
      callback: 'http://localhost:3000/payment/callback',
    })

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '6a7f99eb-7c20-4412-a972-6dfb7cd253a4',
        'X-SANDBOX': '1',
      },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        res.status(200).json(response.data)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json(JSON.stringify(error))
      })
  }
}
