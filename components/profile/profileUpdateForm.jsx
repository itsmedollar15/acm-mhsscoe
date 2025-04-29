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
    if (value.includes("linkedin.com")) {
      form.setFieldValue(["links", index, "label"], "Linkedin");
    } else if (value.includes("github.com")) {
      form.setFieldValue(["links", index, "label"], "Github");
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
          <Form.Item
            className="!hidden !w-0 !h-0 !mb-0"
            name="profilePicture"
          >
            <Input className="!hidden !w-0 !h-0" />
          </Form.Item>
          {isEditorOpen && (
            <ImageEditor
              originalImageUrl={pictureData.url}
              closeEditor={() => setEditorOpen(false)}
              onSaveImage={changePicture}
            />
          )}
          <div className="relative w-32 h-32 mb-4">
            {pictureData.url ? (
              <div className="relative w-full h-full group">
                <img
                  src={pictureData.url}
                  alt="Profile Picture"
                  className="object-cover w-full h-full rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white transition-all duration-300 bg-black/60 rounded-full opacity-0 group-hover:opacity-100">
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
                    Edit
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
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full transition-all duration-300 border-2 border-dashed border-gray-300 rounded-full hover:border-primary hover:bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <Button
                  type="primary"
                  size="small"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditorOpen(true);
                  }}
                  className="!bg-primary/80 hover:!bg-primary/90"
                >
                  Upload
                </Button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">Upload a profile picture</p>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
              <Input className="rounded-lg" placeholder="Enter your full name" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <Select options={BRANCHES} className="rounded-lg" placeholder="Select branch" />
            </Form.Item>
            <Form.Item 
              name="year" 
              label="Year" 
              rules={[{ required: true }]}
            >
              <Select options={YEARS} className="rounded-lg" placeholder="Select year" />
            </Form.Item>
          </div>
        </div>

        {/* Social Links Section */}
        {userDetails?.membershipId && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
              <Button
                type="dashed"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => form.getFieldValue('links')?.length === 0 && form.getFieldValue('links')?.push({})}
                className="!border-primary !text-primary hover:!bg-primary/10"
              >
                Add Link
              </Button>
            </div>

            <Form.List name="links">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, ...field }) => (
                    <div
                      key={key}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 space-y-4">
                        <Form.Item
                          {...field}
                          label="Link Type"
                          name={[field.name, "label"]}
                          rules={[{ required: true }]}
                          className="!mb-0"
                        >
                          <Input className="rounded-lg" placeholder="e.g., GitHub" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="URL"
                          name={[field.name, "url"]}
                          rules={[{ required: true }]}
                          className="!mb-0"
                        >
                          <Input
                            onChange={({ target: { value } }) =>
                              handleLinkChange(field.name, value)
                            }
                            className="rounded-lg"
                            placeholder="https://"
                          />
                        </Form.Item>
                      </div>
                      <div className="flex gap-2 pt-6">
                        <Button
                          type="text"
                          icon={<Trash2 className="w-4 h-4 text-red-500" />}
                          onClick={() => remove(field.name)}
                          className="hover:!bg-red-50"
                        />
                        <Button
                          type="text"
                          icon={<Plus className="w-4 h-4 text-primary" />}
                          onClick={() => add(null, field.name + 1)}
                          className="hover:!bg-primary/10"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
          </div>
        )}

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
