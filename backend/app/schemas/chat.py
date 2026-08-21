from typing import List, Optional
from pydantic import BaseModel, Field

class MessageItem(BaseModel):
    role: str = Field(..., description="Rol del emisor: 'user' o 'model'.")
    content: str = Field(..., description="Contenido del mensaje.")

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="El mensaje de texto enviado por el usuario.")
    history: Optional[List[MessageItem]] = Field(default=[], description="Historial de mensajes anteriores de la conversación.")

class ChatResponse(BaseModel):
    response: str = Field(..., description="La respuesta de texto generada por Aventura AI.")
    status: str = Field("success", description="El estado del procesamiento de la solicitud.")
