import * as tf from "@tensorflow/tfjs-node";
import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage();
const bucketName = "submissionmlgc-raden-models";
const modelFileName = "model.json";
let model: tf.GraphModel | null = null;

const loadModel = async () => {
    const localModelPath = path.resolve(__dirname, "../../temp/model");
    await storage.bucket(bucketName).file(modelFileName).download({
        destination: localModelPath,
    });
    model = await tf.loadGraphModel(`file://${localModelPath}`);
    };

export const inferImage = async (imageBuffer: Buffer) => {
    if (!model) {
        await loadModel();
    }

const tensor = tf.node.decodeImage(imageBuffer)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();

    const predictions = (await model!.predict(tensor)) as tf.Tensor;
    const [result] = await predictions.array() as number[];
    return result;
};
