// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

import DbCon from "./db/db.js";
import TiktokImporterRoutes from "./routes/TiktockImporter.js";
import {TiktokImport} from "./controllers/TiktockImporter.js";

import TiktokModel from "./model/Tiktok.js";
import StoreModel from "./model/Store.js";
import BillingModel from "./model/BillingModel.js";

import BillingRoutes from "./routes/BillingRoutes.js";




const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

DbCon()


// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.use('/api',TiktokImporterRoutes)
app.use('/api/billing',BillingRoutes)







app.get("/api/products/count", async (_req, res) => {
  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  const countData = await client.request(`
    query shopifyProductCount {
      productsCount {
        count
      }
    }
  `);

  res.status(200).send({ count: countData.data.productsCount.count });
});

app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

// store info api 
app.get('/api/store/info', async (req, res) => {
  try {
    const Store = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    // console.log("Storename",Store.data[0].domain)
      // console.log('Store Information',Store)
    if (Store && Store.data && Store.data.length > 0) {
      const storeName = Store.data[0].name;
      const domain = Store.data[0].domain;
      const country=Store.data[0].country;
      const Store_Id=Store.data[0].id
     

      // Check if storeName exists in the database
      const existingStore = await StoreModel.findOne({ storeName });

      if (!existingStore) {
        // If it doesn't exist, save it
        const newStore = new StoreModel({ storeName,domain,country,Store_Id });
        await newStore.save();
      }

      // Send response with existingStore only
      res.status(200).json(existingStore); // Send existingStore directly in the response
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});
// store info api end


//product Insert Api mm 

app.post("/api/prdIns", async (req, res) => {
  try {

    
    const {title , description, image}=req.body;

    

    const product =  new shopify.api.rest.Product({session: res.locals.shopify.session});
    product.title = title;
    product.body_html =description;
    
    product.images=image.map(url =>({src:url}))

    // product.vendor = "Burton";
    // product.product_type = "Snowboard";
    // product.status = "draft";
    

    await product.save({
      update: true,
    });


    res.status(200).json({success:true,message:"third task api working form backgend",product})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"internal sever eroro"})
    
  }
});

//api end


//getting products mmk 
app.get("/api/testprd", async (_req, res) => {
  try {
   const prd =  await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
    });
    res.status(200).json({success:true,message:"second task api working form backgend",prd})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"internal sever eroro"})
    
  }
});






// product update api starts 
// app.put("/api/prdUpd/:productId", async (req, res) => {
//   try {

    
//     const {title , body_html}=req.body;

    

//     const product =  new shopify.api.rest.Product({session: res.locals.shopify.session});
//     product.title = title;
//     product.body_html = body_html;
    
//     product.id = productId;
    
    

//     await product.save({
//       update: true,
//     });


//     res.status(200).json({ success: true, message: "Product updated successfully",product});
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({success:false,message:"internal sever eroro"})
    
//   }
// });

// end

app.put("/api/prdUpd/:productId", async (req, res) => {
  try {
    // Extract the productId from req.params and the updated fields from req.body
    const { productId } = req.params;
    const { title, body_html } = req.body;

    // Create a new product instance using the Shopify API, set its fields, and assign the product ID
    const product = new shopify.api.rest.Product({ session: res.locals.shopify.session });
    product.id = productId;  // Assign the ID from the route parameter
    product.title = title;
    product.body_html = `<iframe 
        src="${body_html}" 
        width="100%" 
        height="600" 
        frameborder="0" 
        scrolling="no" 
        allow="autoplay; encrypted-media" 
        allowfullscreen></iframe>`;

    // Save the product update
    await product.save({
      update: true,
    });

    // Send success response
    res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT);
