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
    <div className="pb-10 min-h-screen">
      <Glassmorphism className="mx-auto mt-12 mb-8 w-full max-w-5xl shadow-lg"> {/* Added mt-24 here */}
        <h2 className="my-6 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {eventId === "create" ? "Create New" : "Update"} Event
        </h2>
      </Glassmorphism>
      <Form
        className="flex flex-col gap-6"
        form={form}
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Glassmorphism className="p-8 mx-auto w-full max-w-5xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <Row gutter={[32, 16]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={<span className="text-lg font-semibold">Event Title</span>}
                name="title"
                rules={[
                  { required: true, message: "Please enter event title" },
                ]}
              >
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item
                label={<span className="text-lg font-semibold">Event Description</span>}
                name="description"
                rules={[
                  { required: true, message: "Please enter event description" },
                ]}
              >
                <Input.TextArea 
                  className="rounded-lg" 
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={<span className="text-lg font-semibold">Event Poster</span>}
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
                  className="!bg-transparent rounded-xl overflow-hidden border-2 border-dashed hover:border-blue-500 transition-all duration-300"
                  accept="image/png, image/jpeg"
                  customRequest={() => {}}
                  showUploadList={false}
                  multiple={false}
                  onChange={handlePosterChange}
                >
                  {posterData ? (
                    <div className="relative w-full aspect-video">
                      <img
                        className="object-contain w-full h-full"
                        src={posterData}
                        alt="Event poster"
                      />
                      <div className="absolute top-0 w-full h-full -z-[1]">
                        <img
                          className="object-cover w-full h-full blur-lg"
                          src={posterData}
                          alt="Background blur"
                        />
                      </div>
                      <div className="flex absolute top-0 flex-col justify-center items-center w-full h-full text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <p className="text-4xl ant-upload-drag-icon">
                          <PlusOutlined />
                        </p>
                        <p className="ant-upload-text !text-white text-lg mt-3">
                          Click or drag file to this area to change
                        </p>
                        <Button
                          className="mt-4 !bg-red-500 hover:!bg-red-600 transition-colors duration-300"
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
                    <div className="flex flex-col justify-center items-center p-8 w-full h-full">
                      <p className="text-5xl text-blue-500 ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="mt-4 text-xl font-medium ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="mt-2 text-gray-500 ant-upload-hint">
                        Select or Drop an Image for Event Poster
                      </p>
                    </div>
                  )}
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Glassmorphism>

        <Glassmorphism className="p-8 mx-auto w-full max-w-5xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <Form.Item
            label={<span className="text-lg font-semibold">Event Duration</span>}
            name="eventDuration"
            rules={[
              { required: true, message: "Please select event duration" },
            ]}
          >
            <DatePicker.RangePicker
              placement="topLeft"
              className="w-full rounded-lg"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-lg font-semibold">Registration End Date</span>}
            name="registrationEndDate"
            rules={[
              {
                required: true,
                message: "Please select registration end date",
              },
            ]}
          >
            <DatePicker
              className="w-full rounded-lg"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Row gutter={[32, 16]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={<span className="text-lg font-semibold">Entry Fees (Members)</span>}
                name="membersEntryFees"
                rules={[
                  {
                    required: true,
                    message: "Please enter members entry fees",
                  },
                ]}
              >
                <Input type="number" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={<span className="text-lg font-semibold">Entry Fees (Others)</span>}
                name="entryFees"
                rules={[{ required: true, message: "Please enter entry fees" }]}
              >
                <Input type="number" className="rounded-lg" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={<span className="text-lg font-semibold">Registration Link (Optional)</span>}
            name="registrationLink"
          >
            <Input className="rounded-lg" />
          </Form.Item>
        </Glassmorphism>

        <Glassmorphism className="p-8 mx-auto w-full max-w-5xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <Row gutter={[32, 16]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={<span className="text-lg font-semibold">Event Blog</span>}
                name="blog"
                rules={[{ required: true, message: "Please write event blog" }]}
              >
                <Input.TextArea
                  className="rounded-lg"
                  autoSize={{ minRows: 6, maxRows: 12 }}
                  placeholder="Write in Markdown"
                  onChange={handleBlogEdit}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              {blogMarkdown !== "" && (
                <div className="p-6 bg-white rounded-lg shadow-inner">
                  <h3 className="mb-4 text-lg font-semibold">Preview</h3>
                  <Markdown className="max-w-none prose" remarkPlugins={remarkGfm}>
                    {blogMarkdown}
                  </Markdown>
                </div>
              )}
            </Col>
          </Row>
        </Glassmorphism>

        <Glassmorphism className="p-8 mx-auto w-full max-w-5xl text-center shadow-lg">
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-300 md:w-64 hover:from-blue-600 hover:to-purple-700"
          >
            {eventId === "create" ? "Create" : "Update"} Event
          </Button>
        </Glassmorphism>
      </Form>
    </div>
  );
};

export default AdminEventsPageForm;
