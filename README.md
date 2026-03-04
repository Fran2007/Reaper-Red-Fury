# Red Fury

Ecommerce frontend en React + Vite para vender productos de Carolina Reaper, con:

- Catalogo y detalle de productos
- Carrito con cantidades y total
- Checkout con Stripe

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
