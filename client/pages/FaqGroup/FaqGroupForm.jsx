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

const FaqGroupForm = ({
  _id,
  active,
  activeId,
  Refetch,
  handleModalChange,
  group,
  isNewGroup,
}) => {
  const groupName = group.name;
  const groupDescription = group.description;

  const [title, setTitle] = useState(groupName);
  const [description, setDescription] = useState(groupDescription);

  const handleUpdateChange = useCallback((value, setData) => {
    setData(value);
  }, []);

  const handleClose = () => {
    handleModalChange(false, _id);
    Refetch();
  };

  const [responseDataPut, fetchContentPut, isLoadingUpdate] = useDataFetcher(
    "PUT",
    `/api/apps/faq-group/${_id}`,
    { name: title, description }
  );
  const [responseDataPost, fetchContentPost, isLoadingPost] = useDataFetcher(
    "POST",
    "/api/apps/faq-group",
    { name: title, description }
  );

  useEffect(() => {
    if (isNewGroup) {
      setTitle("");
      setDescription("");
    } else {
      setTitle(groupName);
      setDescription(groupDescription);
    }
  }, [isNewGroup]);
  const handlePost = (event) => {
    Refetch();
    fetchContentPost();
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
          content: isNewGroup ? "Create New Group" : "Update Group",
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

export default FaqGroupForm;
