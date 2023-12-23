import React, { useEffect, useState } from "react";
import useDataFetcher from "../../hooks/useDataFetcher";
import { Frame } from "@shopify/polaris";
import { usePathParams, useQueryParams } from "raviger";

const FaqStoreFont = () => {
  const [shop, setShop] = useState("");
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryShop = window?.location?.pathname.split("/")[3];
      const queryGroupId = window?.location?.pathname.split("/")[4];
      setShop(queryShop);
      setGroupId(queryGroupId);
    }
  }, []);

  const [responseFaqGroup, faq] = useDataFetcher(
    "GET",
    `/api/apps/store-font/faq/general-faq?shop=${shop}&groupId=${groupId}`,
    ""
  );

  useEffect(() => {
    faq();
  }, [shop]);


  return (
    <Frame className="bg-opacity-0">
      <div className="mx-auto bg-opacity-0 px-5 py-10 max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
          <p className="text-neutral-500 text-xl mt-3">
            Frequently Asked Questions
          </p>
        </div>
        {responseFaqGroup?.result?.map((faq) => (
          <div key={faq?._id} className="py-5 max-w-full mx-4">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="text-2xl capitalize">{faq?.name}</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn text-xl capitalize">
                {faq?.description}
              </p>
            </details>
          </div>
        ))}
      </div>
    </Frame>
  );
};

export default FaqStoreFont;
