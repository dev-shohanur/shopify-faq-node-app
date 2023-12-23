import {
  Layout,
  Card,
  Page,
  Text,
  BlockStack,
  InlineCode,
  InlineStack,
  Button,
} from "@shopify/polaris";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";

const useDataFetcher = (initialState, url, options) => {
  const [data, setData] = useState(initialState);
  const fetch = useFetch();

  const fetchData = async () => {
    setData("loading...");
    const result = await (await fetch(url, options)).json();
    setData(result.text);
  };

  return [data, fetchData];
};

const DataCard = ({ method, url, data, onRefetch }) => (
  <Layout.Section>
    <Card>
      <BlockStack gap="200">
        <Text>
          {method} <code>{url}</code>: {data}
        </Text>
        <InlineStack gap="200" align="end">
          <Button variant="primary" onClick={onRefetch}>
            Refetch
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  </Layout.Section>
);

const GetData = () => {
  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ text: "Body of POST request" }),
  };
  const [responseDataGQL, fetchContentGQL] = useDataFetcher(
    "",
    "/api/apps/debug/gql"
  );
  const [responseData, fetchContent] = useDataFetcher(
    "",
    `https://${responseDataGQL}.com/admin/api/2023-10/shop.json`
  );
  const [responseDataPost, fetchContentPost] = useDataFetcher(
    "",
    "/api/apps",
    postOptions
  );

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
  }, []);

  return (
    <Page
      title="Data Fetching"
      backAction={{ content: "Home", onAction: () => navigate("/debug") }}
    >
      <Layout>
        <DataCard
          method="GET"
          url="/api/apps"
          data={responseData}
          onRefetch={fetchContent}
        />
        <DataCard
          method="POST"
          url="/api/apps"
          data={responseDataPost}
          onRefetch={fetchContentPost}
        />
        <DataCard
          method="GET"
          url="/api/apps/debug/gql"
          data={responseDataGQL}
          onRefetch={fetchContentGQL}
        />
      </Layout>
    </Page>
  );
};

export default GetData;
