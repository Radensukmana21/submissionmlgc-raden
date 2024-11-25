import { Request, Response } from "express";
import { uploadPredictionResult } from "../services/firestore.service";
import { inferImage } from "../services/model.service";
import { v4 as uuidv4 } from "uuid";

export const predict = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded!",
      });
    }

    const predictionResult = await inferImage(req.file.buffer);

    const responseId = uuidv4();
    const createdAt = new Date().toISOString();

    const responseData = {
      id: responseId,
      result: predictionResult > 0.5 ? "Cancer" : "Non-cancer",
      suggestion: predictionResult > 0.5
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.",
      createdAt,
    };

    // Save to Firestore
    await uploadPredictionResult(responseData);

    res.status(200).json({
      status: "success",
      message: "Model is predicted successfully",
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
};

export const getPredictionHistories = async (req: Request, res: Response) => {
  try {
    const histories = await getPredictionHistoriesFromFirestore();
    res.status(200).json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Gagal mendapatkan riwayat prediksi",
    });
  }
};
