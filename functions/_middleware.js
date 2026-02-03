// functions/_middleware.js
export const onRequest = async (context) => {
  return context.env.ASSETS.fetch(context.request);
};