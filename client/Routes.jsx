import React from "react";

import ExitFrame from "./ExitFrame";
import Index from "./pages/Index";
import BillingAPI from "./pages/debug/Billing";
import GetData from "./pages/debug/Data";
import DebugIndex from "./pages/debug/Index";
import ActiveWebhooks from "./pages/debug/Webhooks";
import LayOut from "./pages/FaqGroup/LayOut";
import FaqGroups from "./pages/FaqGroup/FaqGroups";
import Faq from "./pages/Faq/Faq";
import Setting from "./pages/Setting";
import FaqStoreFont from "./pages/StoreFont/FaqStoreFont";



const routes = {
  "/": () => <FaqGroups />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  "/debug": () => <DebugIndex />,
  "/debug/webhooks": () => <ActiveWebhooks />,
  "/debug/billing": () => <BillingAPI />,
  "/faq-group": () => <FaqGroups />,
  "/setting": () => <Setting />,
  "/faq-group/faq/:groupId": ({ groupId }) => <Faq groupId={groupId} />,
  "/layout": () => <LayOut />,
  "/debug/data": () => <GetData />,

  //Add your routes here
};

export default routes;
