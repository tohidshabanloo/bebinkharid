/* eslint-disable prettier/prettier */
import axios from "axios";
import Router from "next/router";

export default async function favoritesAPI(req, res) {
  try {
    if (req.body.status === 10) {
      let params = {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "6a7f99eb-7c20-4412-a972-6dfb7cd253a4",
          "X-SANDBOX": "1",
        },
        method: "post",
        url: "https://api.idpay.ir/v1.1/payment/verify",
        data: {
          id: req.body.id,
          order_id: req.body.order_id,
        },
      };

      let verifyBuy = await axios(params);

      if (verifyBuy.data.status == 100) {
        updatePaymentService.updatePayment(currentPayment, requestBuy);
        return res.render("checkout-successful", { verifyBuy });
      }

      if (verifyBuy.data.status == 101) {
        return res.json({
          message: "تراکنش قبلا پرداخت و تایید شده است",
          peymnet: verifyBuy.data.payment,
        });
      } else {
        return res.render("checkout-unsuccessful", { verifyBuy });
      }
    } else {
      // res.json({ message: "پرداخت ناموفق", peyment: req.body });

      res.redirect(302, `/result/${req.body.id}`);
      // res.redirect(307, '/support2')
      // res.status(200);
      // res.redirect(302, "/support2")
      // res.redirect(302, "/support2/"+ req.body.id)
    }
  } catch (err) {
    if (err) {
      return res.status(400).send(err);
    }
  }
}
