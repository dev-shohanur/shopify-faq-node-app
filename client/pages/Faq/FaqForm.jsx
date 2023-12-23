import {
  Button,
  Form,
  FormLayout,
  Frame,
  LegacyStack,
  Modal,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useDataFetcher from "../../hooks/useDataFetcher";

// const parentEl = document.getElementById("el");
// const el = document.createElement('div');
// el.innerHTML = `
// <h1>hello word</h1>
// `
// parentEl.appendChild(el)
const FaqForm = ({
  _id,
  active,
  activeId,
  Refetch,
  handleModalChange,
  group,
  groupId,
  isNewGroup,
}) => {
  const faqName = group?.name;
  const faqDescription = group?.description;


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdateChange = useCallback((value, setData) => {
    setData(value);
  }, []);

  const handleClose = () => {
    handleModalChange(false, _id);
    Refetch();
  };

  const [responseDataPut, fetchContentPut, isLoadingUpdate] = useDataFetcher(
    "PUT",
    `/api/apps/faq/${_id}`,
    { group_id: groupId, name: title, description }
  );
  const [responsePostFaq, postFaq, isLoadingPost] = useDataFetcher(
    "POST",
    "/api/apps/faq",
    { group_id: groupId, name: title, description }
  );
  const [groupData, getGroupData, isLoading] = useDataFetcher(
    "GET",
    `/api/apps/faq-group/${groupId}`,
    ""
  );

  useEffect(() => {
    if (isNewGroup) {
      setTitle("");
      setDescription("");
      getGroupData();
    } else if (faqName && faqDescription) {
      setTitle(faqName);
      setDescription(faqDescription);
    }
  }, [isNewGroup]);

  const handlePost = (event) => {
    Refetch();
    postFaq();
    setTitle("");
    setDescription("");
    handleClose();
  };
  const handlePut = (event) => {
    Refetch();
    fetchContentPut();
    handleClose();
  };

  return (
    <Frame>
      <Modal
        open={!isNewGroup ? active && activeId === _id : active}
        onClose={handleClose}
        title="Export customers"
        primaryAction={{
          content: isNewGroup ? "Create New Faq" : "Update Faq",
          onClick: isNewGroup ? handlePost : handlePut,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <Form>
              <FormLayout>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(value) => handleUpdateChange(value, setTitle)}
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(value) =>
                    handleUpdateChange(value, setDescription)
                  }
                  autoComplete="off"
                />
              </FormLayout>
            </Form>
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </Frame>
  );
};

export default FaqForm;
