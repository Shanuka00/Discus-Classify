import io
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import torch
import torchvision.transforms as transforms
import torchvision.models as models
import torch.nn.functional as F
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Class labels for 21 Discus types — replace with your actual names
class_names = ['Albino_Golden', 'Blue_Diamond', 'Brilliant_Turquoise', 'Brown', 'Checkerboard', 'Cobalt', 'Ghost', 'Heckel', 'Marlboro', 'Millennium_Golden', 'Panda', 'Pigeon_Blood', 'Red_Melon', 'Red_Spotted_Green', 'Red_Turquoise', 'Ring_Leopard', 'Snakeskin', 'Tangerine', 'Tiger_Turkish', 'White_Butterfly', 'Wild']


# Load model (pretrained ResNet50 with modified output layer)
model = models.resnet50()
model.fc = torch.nn.Linear(model.fc.in_features, len(class_names))
model.load_state_dict(torch.load('vit_discus_model.pth', map_location='cpu'))
model.eval()  # set model to evaluation mode

# Image preprocessing
def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return transform(image).unsqueeze(0)

@app.get('/')
async def info():
    return JSONResponse({"state": "Back end runs properly"})

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        tensor = transform_image(image_bytes)
        with torch.no_grad():
            outputs = model(tensor)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        predicted_class = class_names[predicted.item()]
        confidence_score = confidence.item() * 100

        return JSONResponse({
            "predicted_class": predicted_class,
            "confidence": f"{confidence_score:.2f}%"
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
