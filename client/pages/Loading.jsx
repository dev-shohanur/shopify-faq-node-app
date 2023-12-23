import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
} from "@shopify/polaris";
import React from "react";

export default function Loading() {
  return (
    <SkeletonPage fullWidth={true} title="The All Groups">
      <Layout>
        <Layout.Section>
          <div className="container mx-auto">
            <LegacyCard sectioned>
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
            </LegacyCard>
          </div>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
