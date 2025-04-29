import jwt from "jsonwebtoken";

export const uploadFile = async (file, folder, filename) => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: 60 * 5 });

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([file.arrayBuffer ? await file.arrayBuffer() : file], {
        type: file.type,
      }),
      file.name
    );
    formData.append(
      "folder",
      (process.env.ENV ? `${process.env.ENV}/` : "") + folder
    );
    if (filename) formData.append("filename", filename);

    const res = await fetch(`${process.env.FILE_SERVER}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, message, filepath } = await res.json();

    if (!success) throw message;

    return filepath;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFile = async (filePath) => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: 60 * 5 });

    const formData = new FormData();
    formData.append("filepath", filePath);

    const res = await fetch(`${process.env.FILE_SERVER}/delete`, {
      method: "DELETE",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, message } = await res.json();

    if (!success) throw message;
  } catch (error) {
    throw error;
  }
};
