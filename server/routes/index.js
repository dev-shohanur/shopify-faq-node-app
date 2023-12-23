import { Router, json } from "express";
import clientProvider from "../../utils/clientProvider.js";
// import verifyRequest from "../middleware/verifyRequest.js";
import GroupModel from "../../utils/models/GroupModel.js";
import { ObjectId } from "mongodb";
import FaqModel from "../../utils/models/FaqModel.js";
import MetaFiledModel from "../../utils/models/MetaFiled.js";
import shopify from "../../utils/shopify.js";
import axios from "axios";
import verifyRequest from "../middleware/verifyRequest.js";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  return res.status(200).json(sendData);
});

userRoutes.post("/", (req, res) => {
  return res.status(200).json(req.body);
});

userRoutes.post("/faq-group", verifyRequest, async (req, res) => {

  const { name, description } = req.body;

  const { id, shop } = res.locals.user_session

  const result = await GroupModel.insertMany({ name, description, status: true, id: id, shop_name: shop })


  return res.status(200).json({ result, success: true });
});
userRoutes.get("/faq-group", verifyRequest, async (req, res) => {
  const shop = res.locals.user_session.shop;
  try {
    const result = await GroupModel.find({ shop_name: shop });


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
userRoutes.get("/faq-group/:id", async (req, res) => {
  const { id } = req.params
  try {
    const result = await GroupModel.find({ _id: new ObjectId(id) });


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
userRoutes.put("/faq-group/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const result = await GroupModel.updateOne({ _id: new ObjectId(id) }, { $set: { name: name, description: description } })


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
userRoutes.delete("/faq-group/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GroupModel.findByIdAndDelete({ _id: new ObjectId(id) })


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRoutes.post("/faq", verifyRequest, async (req, res) => {
  req.accepts(console.log("shohan"));

  const { group_id, name, description } = req.body;

  const { id, shop } = res.locals.user_session;

  const result = await FaqModel.insertMany({ group_id, name, description, status: true, id: id, shop_name: shop })


  return res.status(200).json({ result, success: true });
});
userRoutes.get("/faq/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result = await FaqModel.find({ group_id: id });
    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRoutes.put("/faq/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const result = await FaqModel.updateOne({ _id: new ObjectId(id) }, { $set: { name: name, description: description } })


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
userRoutes.delete("/faq/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FaqModel.findByIdAndDelete({ _id: new ObjectId(id) })


    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


userRoutes.post("/faq/setting", verifyRequest, async (req, res) => {
  req.accepts();


  const { generalFaq, productFaq } = req.body;

  const { id, shop } = res.locals.user_session;


  const result = await MetaFiledModel.insertMany({ id: id, shop_name: shop, general: { generalFaq: generalFaq, productFaq: productFaq } })

  return res.status(200).json({ result, success: true });
});

userRoutes.get("/store-font/faq/general-faq", async (req, res) => {
  const shop = req.query.shop;
  const groupId = req.query.groupId

  console.log(groupId)
  try {
    const group = await GroupModel.find({ shop_name: shop }).sort();
    console.log(group)
    const result = await FaqModel.find({ group_id: group[Number(groupId) - 1]?._id });
    return res.status(200).json({ result, success: true });
  } catch (error) {
    console.error("Error handling FAQ API request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

userRoutes.get("/debug/gql", async (req, res) => {
  //false for offline session, true for online session
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: false,
  });

  const shop = await client.query({
    data: `{
      shop {
        name
      }
    }`,
  });

  return res.status(200).json({ text: shop.body.data.shop.name });
});

userRoutes.get("/debug/activeWebhooks", async (req, res) => {
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const activeWebhooks = await client.query({
    data: `{
      webhookSubscriptions(first: 25) {
        edges {
          node {
            topic
            endpoint {
              __typename
              ... on WebhookHttpEndpoint {
                callbackUrl
              }
            }
          }
        }
      }
    }`,
  });
  return res.status(200).json(activeWebhooks);
});

userRoutes.get("/debug/getActiveSubscriptions", async (req, res) => {
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const response = await client.query({
    data: `{
      appInstallation {
        activeSubscriptions {
          name
          status
          lineItems {
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  __typename
                  price {
                    amount
                    currencyCode
                  }
                  interval
                }
              }
            }
          }
          test
        }
      }
    }`,
  });

  res.status(200).send(response);
});

userRoutes.get("/debug/createNewSubscription", async (req, res) => {
  const { client, shop } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const returnUrl = `${process.env.SHOPIFY_APP_URL}/api/auth?shop=${shop}`;

  const planName = "$10.25 plan";
  const planPrice = 10.25; //Always a decimal

  const response = await client.query({
    data: `mutation CreateSubscription{
    appSubscriptionCreate(
      name: "${planName}"
      returnUrl: "${returnUrl}"
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${planPrice}, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`,
  });

  if (response.body.data.appSubscriptionCreate.userErrors.length > 0) {
    console.log(
      `--> Error subscribing ${shop} to plan:`,
      response.body.data.appSubscriptionCreate.userErrors
    );
    res.status(400).send({ error: "An error occured." });
    return;
  }

  return res.status(200).send({
    confirmationUrl: `${response.body.data.appSubscriptionCreate.confirmationUrl}`,
  });
});

export default userRoutes;
