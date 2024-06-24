import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { Card, Divider, Page, Text } from "@shopify/polaris";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import shopify from "./shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin, session, sessionToken, billing } =
    await shopify.authenticate.admin(request);

  const { shop } = session;

  const themesResponse = await admin.rest.resources.Theme.all({
    session: session,
  });

  // Extract the themes from the response
  const themes = themesResponse.data || [];
  const publishedTheme = themes.find(theme => theme.role === 'main');
  console.log(publishedTheme)


  return json({
    apiKey: process.env.SHOPIFY_API_KEY,
    shop: shop,
    publishedThemeId: publishedTheme ? publishedTheme.id : null,
  });
}

export default function App() {
  let { apiKey, shop } = useLoaderData<typeof loader>();
 const { publishedThemeId } = useLoaderData<typeof loader>();

 const handleOpenCustomizer = () => {
  if (publishedThemeId) {
    const customizerUrl = `https://${shop}/admin/themes/${publishedThemeId}/editor?context=apps`;
    window.open(customizerUrl, '_blank');
  } else {
    console.error('Published theme ID not found');
  }
};

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider apiKey={apiKey ? apiKey : ""} isEmbeddedApp={false}>
          <Page>
            <Card>
              <Text fontWeight="semibold" as="h1">
                Urbanchat.ai Info
              </Text>
              <Divider />
              <div style={{ margin: "1rem 0" }}>
                <p>
                  Welcome to Urbanchat.ai on Shopify! <br /> We're excited to
                  help you enhance your customer experience. Our AI chatbot is
                  designed to streamline your operations and drive sales by
                  providing instant support, personalized product
                  recommendations, and 24/7 customer support. With Urbanchat.ai,
                  you can also capture leads, train from various sources,
                  customize your chatbot's appearance and responses, test and
                  refine its interactions, and embed and connect it with popular
                  platforms like Facebook, WhatsApp, and WordPress. Let's get
                  started and discover the power of Urbanchat.ai! <br /> <br />{" "}
                  To learn how to integrate please refer to this documentation{" "}
                  <a
                    style={{ color: "black", textDecoration: "underline" }}
                    href="https://www.urbanchat.ai/integration/shopify"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </p>
                <button style={{marginTop:"20px",background:"black",color:"white",padding:"10px 20px",border:"none",cursor:"pointer"}} onClick={handleOpenCustomizer}>Enable App</button>
              </div>
            </Card>
          </Page>
        </AppProvider>
        <Scripts />
      </body>
    </html>
  );
}
