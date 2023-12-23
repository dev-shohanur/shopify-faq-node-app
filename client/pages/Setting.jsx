import React, { useCallback, useState } from "react";
import { Button, ChoiceList } from "@shopify/polaris";
import useDataFetcher from "../hooks/useDataFetcher";
import { useMutation, gql } from "@apollo/client";

// const CREATE_SCRIPTTAG_MUTATION = gql`
//   mutation {
//     scriptTagCreate(
//       input: {
//         cache: false
//         displayScope: ALL
//         src: "https://loyal-content-kingfish.ngrok-free.app/js/script.js"
//       }
//     ) {
//       scriptTag {
//         id
//         src
//         displayScope
//       }
//     }
//   }
// `;

const Setting = () => {
  const [selectedGeneral, setSelectedGeneral] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleChange = useCallback((setValue, value) => {
    setValue(value);
  }, []);

  const sessionStorage = JSON.parse(
    window.sessionStorage.getItem("app-bridge-config")
  );

  const [responseDataPost, fetchContentPost, isLoadingPost] = useDataFetcher(
    "POST",
    "/api/apps/faq/setting",
    {
      apiKey: sessionStorage.apiKey,
      generalFaq: selectedGeneral,
      productFaq: selectedProduct,
    }
  );

  // const [createScriptTag, { loading, error }] = useMutation(
  //   CREATE_SCRIPTTAG_MUTATION,
  //   {
  //     onError: (error) => {
  //       console.error("Error creating script tag:", error.message);
  //     },
  //     onCompleted: (data) => {
  //       console.log("Script tag created:", data.scriptTagCreate.scriptTag);
  //     },
  //   }
  // );
  console.log("Md Shohanur Rahman");

  // console.log({ loading, error });

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex gap-6">
          <ChoiceList
            title="General FAQ"
            choices={[
              { label: "Enable", value: "enable" },
              { label: "Disable", value: "disable" },
            ]}
            selected={selectedGeneral}
            onChange={(e) => handleChange(setSelectedGeneral, e[0])}
          />
          <ChoiceList
            title="Product FAQ"
            choices={[
              { label: "Enable", value: "enable" },
              { label: "Disable", value: "disable" },
            ]}
            selected={selectedProduct}
            onChange={(e) => handleChange(setSelectedProduct, e[0])}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => fetchContentPost()}
          size="large"
        >
          Save
        </Button>
        <Button variant="primary" size="large">
          Create Script
        </Button>
      </div>
    </div>
  );
};

export default Setting;
