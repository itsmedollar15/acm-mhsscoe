"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Input, Button, Select, Row, Col, Checkbox, Space } from "antd";
import { Plus, X, Edit2, Camera, Trash2 } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import { BRANCHES } from "@/constants/branches";
import { YEARS } from "@/constants/years";
import ImageEditor from "../common/imageEditor";

const UserProfileUpdateForm = ({ userDetails, updateUserDetails }) => {
  const [form] = useForm();
  const [pictureData, setPictureData] = useState({ file: null, url: null });
  const [isEditorOpen, setEditorOpen] = useState(false);

  const resetPicture = () => {
    setPictureData({
      url: userDetails?.profilePicture
        ? `${process.env.NEXT_PUBLIC_FILE_SERVER}${userDetails?.profilePicture}`
        : null,
      file: null,
    });
    form.setFieldValue("profilePicture", 0);
  };

  const changePicture = (newPicture) => {
    setPictureData({
      file: newPicture,
      url: URL.createObjectURL(newPicture),
    });
    form.setFieldValue("profilePicture", newPicture);
    setEditorOpen(false);
  };

  useEffect(() => {
    if (userDetails) {
      const { profilePicture, ...details } = userDetails;
      setPictureData({
        url: profilePicture
          ? `${process.env.NEXT_PUBLIC_FILE_SERVER}${profilePicture}`
          : null,
        file: null,
      });
      form.setFieldsValue({ ...details, profilePicture: 0 });
    } else {
      setPictureData({ file: null, url: null });
      form.resetFields();
      form.setFieldValue("sendVerification", false);
    }
  }, [userDetails]);

  const handleLinkChange = (index, value) => {
    const links = form.getFieldValue("links") || [];
    // Keep existing label if already set
    const existingLabel = links[index]?.label;
    if (existingLabel) return;

    // Only set label for new links
    if (value.includes("linkedin.com")) {
      form.setFieldValue(["links", index, "label"], "LinkedIn");
    } else if (value.includes("github.com")) {
      form.setFieldValue(["links", index, "label"], "GitHub");
    } else if (value.includes("x.com") || value.includes("twitter.com")) {
      form.setFieldValue(["links", index, "label"], "X");
    }
  };

  const handleSubmit = (fields) => {
    if (!fields.profilePicture) {
      delete fields.profilePicture;
    }

    updateUserDetails(fields);
  };

  return (
    <Form
      className="w-full"
      layout="vertical"
      size="large"
      requiredMark={false}
      form={form}
      onFinish={handleSubmit}
    >
      <div className="space-y-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <Form.Item className="!hidden !w-0 !h-0 !mb-0" name="profilePicture">
            <Input className="!hidden !w-0 !h-0" />
          </Form.Item>
          {isEditorOpen && (
            <ImageEditor
              originalImageUrl={pictureData.url}
              closeEditor={() => setEditorOpen(false)}
              onSaveImage={changePicture}
            />
          )}
          <div className="relative mb-4 w-32 h-32 cursor-pointer group">
            {pictureData.url ? (
              <div className="relative w-full h-full">
                <img
                  src={pictureData.url}
                  alt="Profile Picture"
                  className="object-cover w-full h-full rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex absolute inset-0 flex-col gap-2 justify-center items-center text-white rounded-full opacity-0 transition-all duration-300 bg-black/60 group-hover:opacity-100">
                  <Button
                    type="primary"
                    size="small"
                    icon={<Edit2 className="w-4 h-4" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditorOpen(true);
                    }}
                    className="!bg-white/20 hover:!bg-white/30 backdrop-blur-sm"
                  >
                    Edit Photo
                  </Button>
                  <Button
                    className="!bg-red-500/80 hover:!bg-red-500/90 backdrop-blur-sm"
                    type="primary"
                    size="small"
                    icon={<X className="w-4 h-4" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      resetPicture();
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setEditorOpen(true)}
                className="flex flex-col justify-center items-center w-full h-full rounded-full border-2 border-gray-300 border-dashed transition-all duration-300 cursor-pointer hover:border-primary hover:bg-gray-50 group"
              >
                <Camera className="mb-2 w-8 h-8 text-gray-400 transition-colors group-hover:text-primary" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-primary">
                  Click to Upload
                </span>
                <span className="mt-1 text-xs text-gray-400">
                  or drag and drop
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-medium text-gray-700">Profile Picture</p>
            <p className="text-xs text-gray-500">
              Upload a professional photo for your profile
            </p>
            <p className="text-xs text-gray-400">
              Recommended: Square image, max 1MB
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true }]}
            >
              <Input
                className="rounded-lg"
                placeholder="Enter your full name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) return Promise.reject("Email required");
                    if (!value.endsWith("@mhssce.ac.in"))
                      return Promise.reject(
                        "Please enter a valid college domain email"
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                disabled={userDetails ? true : false}
                className="rounded-lg"
                placeholder="Enter your email"
              />
            </Form.Item>
          </div>

          {!userDetails && (
            <Form.Item
              className="!-mt-6 !mb-4"
              name="sendVerification"
              valuePropName="checked"
            >
              <Checkbox>Send Verification Mail</Checkbox>
            </Form.Item>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Form.Item
              name="rollno"
              label="Roll Number"
              rules={[{ required: true }]}
            >
              <Input className="rounded-lg" placeholder="Enter roll number" />
            </Form.Item>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true }]}
            >
              <Select
                options={BRANCHES}
                className="rounded-lg"
                placeholder="Select branch"
              />
            </Form.Item>
            <Form.Item name="year" label="Year" rules={[{ required: true }]}>
              <Select
                options={YEARS}
                className="rounded-lg"
                placeholder="Select year"
              />
            </Form.Item>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          <Form.List name="links">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="relative group">
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-gray-200">
                      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-start">
                        <div className="flex-1">
                          <label className="block mb-1 text-sm font-medium text-gray-500">Link Label</label>
                          <Form.Item
                            {...restField}
                            name={[name, "label"]}
                            className="mb-0"
                          >
                            <Input
                              placeholder="e.g. LinkedIn, GitHub"
                              className="rounded-lg"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex-[2]">
                          <label className="block mb-1 text-sm font-medium text-gray-500">URL</label>
                          <Form.Item
                            {...restField}
                            name={[name, "url"]}
                            className="mb-0"
                          >
                            <Input
                              placeholder="https://..."
                              onChange={({ target: { value } }) =>
                                handleLinkChange(index, value)
                              }
                              className="rounded-lg"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex items-start sm:items-center sm:pt-6">
                          <Button
                            type="text"
                            className="!text-gray-400 hover:!text-red-500 hover:!bg-red-50 transition-colors rounded-lg w-10 h-10 flex items-center justify-center"
                            icon={<Trash2 className="w-5 h-5" />}
                            onClick={() => remove(name)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<Plus className="w-4 h-4" />}
                  className="hover:!border-primary hover:!text-primary"
                >
                  Add Social Link
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-primary hover:!bg-primary/90 !h-11 !text-base !px-8"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default UserProfileUpdateForm;
