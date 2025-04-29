"use client";
import Glassmorphism from "@/components/common/glassmorphism";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Upload,
  message as showMessage,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import getBase64 from "@/utils/getBase64";
import { DeleteOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
import Markdown from "react-markdown";
import EventService from "@/services/event";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import remarkGfm from "remark-gfm";

const AdminEventsPageForm = ({ params: { eventId } }) => {
  const [form] = useForm();
  const router = useRouter();
  const [posterData, setPosterData] = useState();
  const [blogMarkdown, setBlogMarkdown] = useState("");

  useEffect(() => {
    if (eventId !== "create") {
      EventService.getEventDetails(eventId)
        .then(
          ({
            event: {
              startDate,
              endDate,
              registrationEndDate,
              poster,
              ...eventDetails
            },
          }) => {
            form.setFieldsValue(eventDetails);

            form.setFieldValue("poster", poster);
            setPosterData(`${process.env.NEXT_PUBLIC_FILE_SERVER}${poster}`);

            setBlogMarkdown(eventDetails.blog);

            form.setFieldValue("eventDuration", [
              dayjs(startDate),
              dayjs(endDate),
            ]);

            form.setFieldValue(
              "registrationEndDate",
              dayjs(registrationEndDate)
            );
          }
        )
        .catch((message) => {
          showMessage.error(message);
          router.replace("/admin/events");
        });
    }
  }, [eventId]);

  const handlePosterChange = (info) => {
    getBase64(info.file.originFileObj, (data) => setPosterData(data));
  };

  const handleBlogEdit = ({ target: { value } }) => {
    setBlogMarkdown(value);
  };

  const handleSubmit = (fields) => {
    if (fields.poster.file) {
      fields.poster = fields.poster.file.originFileObj;
    } else {
      delete fields.poster;
    }

    fields.startDate = new Date(fields.eventDuration[0]).toString();
    fields.endDate = new Date(fields.eventDuration[1]).toString();
    fields.registrationEndDate = new Date(
      fields.registrationEndDate
    ).toString();
    delete fields.eventDuration;

    if (!fields.blog || fields.blog === "") delete fields.blog;

    const req =
      eventId === "create"
        ? EventService.createNewEvent(fields)
        : EventService.updateEventDetails(eventId, fields);

    req
      .then((message) => {
        showMessage.success(message);
        router.replace("/admin/events");
      })
      .catch((message) => showMessage.error(message));
  };

  return (
    <div className="pb-10">
      <Glassmorphism className="mb-5 max-w-5xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-center my-5">
          {eventId === "create" ? "Create New" : "Update"} Event
        </h2>
      </Glassmorphism>
      <Form
        className="flex flex-col gap-5"
        form={form}
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Glassmorphism className="p-5 max-w-5xl w-full mx-auto">
          <Row gutter={[32]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label="Event Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter event title" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Event Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter event description" },
                ]}
              >
                <Input.TextArea autoSize={true} />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label="Event Poster"
                name="poster"
                valuePropName="file"
                rules={[
                  {
                    required: true,
                    message: "Please Select Poster",
                  },
                ]}
              >
                <Upload.Dragger
                  className="!bg-transparent"
                  accept="image/png, image/jpeg"
                  customRequest={() => {}}
                  showUploadList={false}
                  multiple={false}
                  onChange={handlePosterChange}
                >
                  {posterData ? (
                    <div className="w-full aspect-video relative">
                      <img
                        className="w-full h-full object-contain"
                        src={posterData}
                      />
                      <div className="absolute top-0 w-full h-full -z-[1]">
                        <img
                          className="w-full h-full object-cover blur-lg"
                          src={posterData}
                        />
                      </div>
                      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center opacity-0 text-white bg-black bg-opacity-50 hover:opacity-100">
                        <p className="ant-upload-drag-icon">
                          <PlusOutlined />
                        </p>
                        <p className="ant-upload-text !text-white">
                          Click or drag file to this area to change
                        </p>
                        <Button
                          className="my-3 !bg-red-500 hover:!bg-red-400"
                          type="primary"
                          size="middle"
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            setPosterData();
                            form.resetFields(["poster"]);
                            e.stopPropagation();
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center p-5">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Select or Drop an Image for Event Poster
                      </p>
                    </div>
                  )}
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Glassmorphism>
        <Glassmorphism className="p-5 max-w-5xl w-full mx-auto">
          <Form.Item
            label="Event Duration"
            name="eventDuration"
            rules={[
              { required: true, message: "Please select event duration" },
            ]}
          >
            <DatePicker.RangePicker
              placement="topLeft"
              className="w-full"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Form.Item
            label="Registration End Date"
            name="registrationEndDate"
            rules={[
              {
                required: true,
                message: "Please select registration end date",
              },
            ]}
          >
            <DatePicker
              className="w-full"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Row gutter={[32]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label="Entry Fees (Members)"
                name="membersEntryFees"
                rules={[
                  {
                    required: true,
                    message: "Please enter members entry fees",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label="Entry Fees (Others)"
                name="entryFees"
                rules={[{ required: true, message: "Please enter entry fees" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Registration Link (Optional)"
            name="registrationLink"
          >
            <Input />
          </Form.Item>
        </Glassmorphism>
        <Glassmorphism className="p-5 max-w-5xl w-full mx-auto">
          <Row gutter={[32]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label="Event Blog"
                name="blog"
                rules={[{ required: true, message: "Please write event blog" }]}
              >
                <Input.TextArea
                  autoSize={true}
                  placeholder="Write in Markdown"
                  onChange={handleBlogEdit}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              {blogMarkdown !== "" && (
                <Markdown className="prose pt-5" remarkPlugins={remarkGfm}>
                  {blogMarkdown}
                </Markdown>
              )}
            </Col>
          </Row>
        </Glassmorphism>
        <Glassmorphism className="p-5 text-center max-w-5xl w-full mx-auto">
          <Button type="primary" htmlType="submit" className="w-full md:w-56">
            {eventId === "create" ? "Create" : "Update"} Event
          </Button>
        </Glassmorphism>
      </Form>
    </div>
  );
};

export default AdminEventsPageForm;
