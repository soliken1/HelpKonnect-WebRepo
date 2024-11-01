import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, username, email, phone } = req.body;
    const total = amount * 100;

    console.log("Received request to create checkout session:", {
      amount,
      username,
      email,
      phone,
      total,
    });

    try {
      const response = await axios.post(
        "https://api.paymongo.com/v1/checkout_sessions",
        {
          data: {
            attributes: {
              billing: { name: username, email: email, phone: phone },
              send_email_receipt: true,
              show_description: true,
              show_line_items: true,
              payment_method_types: ["gcash"],
              line_items: [
                {
                  currency: "PHP",
                  amount: total,
                  description: "test",
                  name: "test",
                  quantity: 1,
                },
              ],
              description: "test",
              success_url: "https://helpkonnect.vercel.app/status/success",
              cancel_url: "https://helpkonnect.vercel.app/status/failed",
            },
          },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.PAYMONGO_SECRET_KEY}:`
            ).toString("base64")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Checkout session created successfully:", response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
