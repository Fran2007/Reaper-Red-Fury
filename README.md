# Red Fury

Red Fury es una tienda web enfocada en productos de picante extremo (Carolina Reaper).  
El proyecto implementa un flujo completo de compra: exploracion de productos, detalle por item, carrito con cantidades, y pago con Stripe Checkout.

Esta aplicacion esta construida como frontend SPA con React + Vite, e incluye un endpoint para crear sesiones de pago con Stripe (modo serverless y modo desarrollo local).

## Caracteristicas

- Catalogo y detalle de productos
- Carrito con cantidades y total
- Checkout con Stripe
- Navegacion por secciones (Inicio, Recetas, Productos)
- UI responsive para desktop y mobile

## Stack

- React 19
- React Router
- Tailwind CSS
- Framer Motion
- Stripe Checkout
- Vite

## Requisitos

- Node.js 18+

## Variables de entorno

Crea un archivo `.env` en la raiz:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
VITE_STRIPE_CHECKOUT_API_URL=/api/create-checkout-session
STRIPE_SECRET_KEY=sk_test_xxx
```

Notas:

- `VITE_STRIPE_PUBLISHABLE_KEY` se usa en el frontend.
- `STRIPE_SECRET_KEY` solo debe existir en backend/serverless.
- El endpoint serverless incluido esta en `api/create-checkout-session.js` (estilo Vercel).

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
