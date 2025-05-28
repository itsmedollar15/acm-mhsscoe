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
import Image from "next/image";

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
    <div className="pt-24 pb-10 min-h-screen">
      <div className="mx-auto mb-12 w-full max-w-5xl text-center">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          {eventId === "create" ? "Create New Event" : "Update Event"}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {eventId === "create"
            ? "Add a new event to the platform"
            : "Modify existing event details"}
        </p>
      </div>
      <Form
        className="flex flex-col gap-10"
        form={form}
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]">
          <Row gutter={[32, 24]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Event Title
                  </span>
                }
                name="title"
                rules={[
                  { required: true, message: "Please enter event title" },
                ]}
              >
                <Input
                  className="h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
                  placeholder="Enter event title"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Event Description
                  </span>
                }
                name="description"
                rules={[
                  { required: true, message: "Please enter event description" },
                ]}
              >
                <Input.TextArea
                  className="rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder="Describe your event"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Event Poster
                  </span>
                }
                name="poster"
                valuePropName="file"
                rules={[{ required: true, message: "Please Select Poster" }]}
              >
                <Upload.Dragger
                  className="!bg-white rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-300"
                  accept="image/png, image/jpeg"
                  customRequest={() => {}}
                  showUploadList={false}
                  multiple={false}
                  onChange={handlePosterChange}
                >
                  {posterData ? (
                    <div className="relative w-full aspect-video group">
                      <Image
                        className="object-contain w-full h-full"
                        src={posterData}
                        alt="Event poster"
                        width={800}
                        height={450}
                      />
                      <div className="flex absolute inset-0 justify-center items-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 bg-black/60">
                        <div className="text-center text-white transition-transform duration-300 transform scale-95 group-hover:scale-100">
                          <PlusOutlined className="mb-3 text-4xl" />
                          <p className="text-lg font-medium">Change Image</p>
                          <Button
                            className="mt-4 border-none backdrop-blur-sm bg-red-500/90 hover:bg-red-600"
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              setPosterData();
                              form.resetFields(["poster"]);
                              e.stopPropagation();
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-16 text-center group">
                      <InboxOutlined className="mb-4 text-6xl text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                      <p className="mb-2 text-xl font-medium text-gray-700">
                        Drop your event poster here
                      </p>
                      <p className="text-gray-500">or click to browse</p>
                    </div>
                  )}
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]">
          <Form.Item
            label={
              <span className="text-lg font-medium text-gray-700">
                Event Duration
              </span>
            }
            name="eventDuration"
            rules={[
              { required: true, message: "Please select event duration" },
            ]}
          >
            <DatePicker.RangePicker
              placement="topLeft"
              className="w-full h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-lg font-medium text-gray-700">
                Registration Deadline
              </span>
            }
            name="registrationEndDate"
            rules={[
              {
                required: true,
                message: "Please select registration end date",
              },
            ]}
          >
            <DatePicker
              className="w-full h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
              showTime={{ format: "hh:mm A" }}
              format="DD/MM/YY h:mm A"
            />
          </Form.Item>
          <Row gutter={[32, 24]} className="mt-8">
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Entry Fees (Members)
                  </span>
                }
                name="membersEntryFees"
                rules={[
                  {
                    required: true,
                    message: "Please enter members entry fees",
                  },
                ]}
              >
                <Input
                  type="number"
                  className="h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
                  prefix="₹"
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Entry Fees (Others)
                  </span>
                }
                name="entryFees"
                rules={[{ required: true, message: "Please enter entry fees" }]}
              >
                <Input
                  type="number"
                  className="h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
                  prefix="₹"
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={
              <span className="text-lg font-medium text-gray-700">
                Registration Link
              </span>
            }
            name="registrationLink"
          >
            <Input
              className="h-12 rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
              placeholder="https://example.com/register"
            />
          </Form.Item>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]">
          <Row gutter={[32, 24]}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item
                label={
                  <span className="text-lg font-medium text-gray-700">
                    Event Blog
                  </span>
                }
                name="blog"
                rules={[{ required: true, message: "Please write event blog" }]}
              >
                <Input.TextArea
                  className="rounded-xl border-gray-200 transition-colors hover:border-blue-400 focus:border-blue-500"
                  autoSize={{ minRows: 6, maxRows: 12 }}
                  placeholder="Write your event details in Markdown format..."
                  onChange={handleBlogEdit}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              {blogMarkdown !== "" && (
                <div className="overflow-auto p-6 h-full rounded-xl border border-gray-200 shadow-inner bg-gray-50/50">
                  <h3 className="mb-4 text-lg font-medium text-gray-700">
                    Preview
                  </h3>
                  <div className="max-w-none prose prose-blue prose-img:rounded-lg">
                    <Markdown remarkPlugins={remarkGfm}>
                      {blogMarkdown}
                    </Markdown>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>

        <div className="py-8 mx-auto w-full max-w-5xl text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="h-14 px-16 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] hover:shadow-lg"
          >
            {eventId === "create" ? "Create Event" : "Save Changes"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminEventsPageForm;
