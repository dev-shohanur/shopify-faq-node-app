import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import "./App.css";
import routes from "./Routes";
import FaqStoreFont from "./pages/StoreFont/FaqStoreFont";
import AppBridgeProvider from "./providers/AppBridgeProvider";
import { useEffect } from "react";

export default function App() {
  const RouteComponents = useRoutes(routes);
  const PublicRouteComponents = useRoutes({
    "/store-font/general-faq/:shop/:groupId": ({ shop, groupId }) => (
      <FaqStoreFont shop={shop} groupId={groupId} />
    ),
  });

  return (
    <PolarisProvider i18n={translations}>
      {PublicRouteComponents}
      <AppBridgeProvider>
        {/* <ui-nav-menu>
          <a href="/debug/data">Fetch Data</a>
          <a href="/debug/billing">Billing API</a>
          <a href="/faq-group">FAQ Group</a>
          <a href="/setting">Settings</a>
        </ui-nav-menu> */}
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
