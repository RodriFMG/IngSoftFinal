-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "contactos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contactos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mensajes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contenido" TEXT NOT NULL,
    "fechaEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remitenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "mensajes_remitenteId_fkey" FOREIGN KEY ("remitenteId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mensajes_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_alias_key" ON "usuarios"("alias");
