import os
from pathlib import Path
from dotenv import load_dotenv

# Obtener la ruta al directorio raíz del backend donde reside .env
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"

load_dotenv(dotenv_path=env_path)

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")

    def validate(self):
        if not self.GEMINI_API_KEY or self.GEMINI_API_KEY.strip() == "":
            raise ValueError("Falta la configuración de la clave de API para Gemini (GEMINI_API_KEY).")

settings = Settings()

try:
    settings.validate()
except ValueError as e:
    # Mostramos un mensaje claro en consola sin revelar secretos
    import sys
    print(f"\n[CRITICAL] Error de configuración: {e}\n", file=sys.stderr)
    # No bloqueamos el import para permitir que las herramientas carguen el módulo si es necesario, 
    # pero podemos lanzar el error para que la app falle al iniciar de forma controlada.
    raise e
