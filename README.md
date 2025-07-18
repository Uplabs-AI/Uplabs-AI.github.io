# UPLabs - Plataforma Unificada

Plataforma unificada para acceder a todos los productos UPLabs desde un solo lugar.

## 🏗️ Estructura del Proyecto

```
uplabs-unified/
├── container/           # Contenedor principal con menú
├── projects/           # Proyectos individuales
│   ├── design/         # Design System (Puerto 3001)
│   ├── leads/          # Lead Generation (Puerto 3002)
│   ├── nps/            # NPS VOX (Puerto 3003)
│   └── whapy/          # Whapy (Puerto 3004)
└── package.json        # Scripts unificados
```

## 🚀 Instalación

### Opción 1: Instalación completa (Recomendada)
```bash
npm run install:all
```

### Opción 2: Instalación manual
```bash
# Instalar dependencias del contenedor
cd container && npm install

# Instalar dependencias de cada proyecto
cd ../projects/design && npm install
cd ../leads && npm install
cd ../nps && npm install
cd ../whapy && npm install
```

## 🎯 Uso

### Desarrollo
Para iniciar todos los proyectos en modo desarrollo:
```bash
npm run dev
```

Esto iniciará:
- **Contenedor principal**: http://localhost:3000
- **Design System**: http://localhost:3001
- **Lead Generation**: http://localhost:3002
- **NPS VOX**: http://localhost:3003
- **Whapy**: http://localhost:3004

### Desarrollo individual
```bash
# Solo el contenedor
npm run dev:container

# Solo un proyecto específico
npm run dev:design
npm run dev:leads
npm run dev:nps
npm run dev:whapy
```

### Build
```bash
# Build de todos los proyectos
npm run build

# Build individual
npm run build:container
npm run build:design
npm run build:leads
npm run build:nps
npm run build:whapy
```

### Producción
```bash
npm run start
```

## 🎨 Acceso a los Proyectos

1. **Menú Principal**: http://localhost:3000/menuuplabs
2. **Design System**: http://localhost:3000/design → redirige a http://localhost:3001
3. **Lead Generation**: http://localhost:3000/leads → redirige a http://localhost:3002
4. **NPS VOX**: http://localhost:3000/nps → redirige a http://localhost:3003
5. **Whapy**: http://localhost:3000/whapy → redirige a http://localhost:3004

## 🔧 Configuración

### Puertos
- **Contenedor**: 3000
- **Design**: 3001
- **Leads**: 3002
- **NPS**: 3003
- **Whapy**: 3004

### Agregar Nuevos Proyectos

1. Crear el proyecto en `projects/nuevo-proyecto/`
2. Configurar el puerto en `package.json` del proyecto
3. Agregar el proyecto al menú en `container/app/menuuplabs/page.tsx`
4. Crear la página de redirección en `container/app/nuevo-proyecto/page.tsx`
5. Actualizar los scripts en el `package.json` principal

## 📁 Estructura de Archivos

### Contenedor Principal
- `container/app/menuuplabs/page.tsx` - Menú principal
- `container/app/[proyecto]/page.tsx` - Páginas de redirección
- `container/next.config.mjs` - Configuración de rewrites

### Proyectos Individuales
Cada proyecto mantiene su estructura independiente y puede desarrollarse por separado.

## 🛠️ Tecnologías

- **Contenedor**: Next.js 14, React 18, Tailwind CSS
- **Proyectos**: Next.js, React, Tailwind CSS, shadcn/ui
- **Gestión**: npm workspaces, concurrently

## 📝 Notas

- Cada proyecto puede desarrollarse independientemente
- El contenedor actúa como punto de entrada unificado
- Los proyectos mantienen sus propias dependencias y configuraciones
- Fácil escalabilidad para agregar nuevos productos

## 🐛 Solución de Problemas

### Puerto en uso
Si un puerto está ocupado, modifica el puerto en el `package.json` del proyecto correspondiente.

### Dependencias faltantes
Ejecuta `npm run install:all` para instalar todas las dependencias.

### Build fallido
Verifica que todos los proyectos tengan sus dependencias instaladas correctamente. 