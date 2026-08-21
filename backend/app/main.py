import logging
import sys
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.gemini_service import GeminiService
from app.config import settings

# Configurar logs
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("aventura_global")

app = FastAPI(
    title="Aventura Global API",
    description="API backend para el asistente de viajes Aventura AI y gestión de la agencia de viajes.",
    version="1.0.0"
)

# Configurar CORS controlado para desarrollo local
# Incluye los puertos comunes usados por extensiones de VS Code (Live Server: 5500) y frameworks de frontend
origins = [
    "*",
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "null"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar servicios de forma segura
gemini_service = None
try:
    gemini_service = GeminiService()
    logger.info("Servicio GeminiService inicializado con éxito.")
except Exception as e:
    logger.error(f"Fallo al inicializar el servicio de Gemini: {e}")

@app.get("/api/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Verifica el estado de salud de la API y si el servicio de IA está listo.
    """
    return {
        "status": "healthy",
        "detail": "El backend de Aventura Global está funcionando correctamente.",
        "ai_service_available": gemini_service is not None
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_with_assistant(request: ChatRequest):
    """
    Endpoint que recibe el mensaje de un usuario, valida el contenido,
    lo procesa con Google Gemini a través del servicio dedicado y
    retorna una respuesta JSON estructurada.
    """
    # 1. Validar que el mensaje no esté vacío o solo contenga espacios
    message_text = request.message.strip()
    if not message_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El mensaje no puede estar vacío ni contener únicamente espacios en blanco."
        )

    # 2. Verificar disponibilidad de la clave e inicialización del servicio
    if not gemini_service:
        logger.error("Se intentó realizar una consulta al chat pero el servicio de Gemini no está disponible.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="El asistente virtual Aventura AI no se encuentra disponible temporalmente debido a un problema de configuración."
        )

    # 3. Comunicarse con el servicio de Gemini y retornar la respuesta
    try:
        logger.info(f"Procesando mensaje de usuario: '{message_text[:30]}...'")
        response_text = gemini_service.generate_chat_response(message_text, request.history)
        return ChatResponse(response=response_text, status="success")
    except Exception as e:
        logger.error(f"Error inesperado al comunicarse con la API de Gemini: {e}")
        # Evitamos exponer información sensible del sistema al cliente
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Lo sentimos, ocurrió un error interno en el asistente al procesar tu solicitud."
        )
