"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/db/mongo.ts
var mongo_exports = {};
__export(mongo_exports, {
  client: () => client,
  db: () => db
});
var import_mongodb, import_dotenv, client, db;
var init_mongo = __esm({
  "src/db/mongo.ts"() {
    "use strict";
    import_mongodb = require("mongodb");
    import_dotenv = __toESM(require("dotenv"));
    import_dotenv.default.config();
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    client = new import_mongodb.MongoClient(process.env.MONGODB_URI);
    db = client.db("path-to-peace");
  }
});

// src/db/seed.ts
var seed_exports = {};
__export(seed_exports, {
  seedDatabase: () => seedDatabase
});
var import_fs, import_path, seedDatabase;
var init_seed = __esm({
  "src/db/seed.ts"() {
    "use strict";
    init_mongo();
    import_fs = __toESM(require("fs"));
    import_path = __toESM(require("path"));
    seedDatabase = async () => {
      try {
        const webLibPath = import_path.default.join(process.cwd(), "../web/lib/data");
        const duasPath = import_path.default.join(webLibPath, "duas.json");
        const feelingsPath = import_path.default.join(webLibPath, "feelings.json");
        const duasCount = await db.collection("duas").countDocuments();
        if (duasCount === 0 && import_fs.default.existsSync(duasPath)) {
          const duasData = JSON.parse(import_fs.default.readFileSync(duasPath, "utf-8"));
          if (duasData.duas && duasData.duas.length > 0) {
            await db.collection("duas").insertMany(duasData.duas);
            console.log("Seeded Duas successfully");
          }
        }
        const feelingsCount = await db.collection("feelings").countDocuments();
        if (feelingsCount === 0 && import_fs.default.existsSync(feelingsPath)) {
          const feelingsData = JSON.parse(import_fs.default.readFileSync(feelingsPath, "utf-8"));
          if (feelingsData.feelings && feelingsData.feelings.length > 0) {
            await db.collection("feelings").insertMany(feelingsData.feelings);
            console.log("Seeded Feelings successfully");
          }
        }
        const coursesCount = await db.collection("courses").countDocuments();
        if (coursesCount === 0) {
          const defaultCourses = [
            {
              title: "Introduction to Peace",
              description: "Learn the basics of inner peace and mindfulness.",
              duration: "4 weeks",
              instructor: "Admin",
              status: "active",
              amount: 1200
            }
          ];
          await db.collection("courses").insertMany(defaultCourses);
          console.log("Seeded default courses successfully");
        }
      } catch (error) {
        console.error("Error seeding database:", error);
      }
    };
  }
});

// src/index.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv3 = __toESM(require("dotenv"));
var import_node2 = require("better-auth/node");
var import_morgan = __toESM(require("morgan"));

// src/auth.ts
var import_better_auth = require("better-auth");
var import_mongodb2 = require("better-auth/adapters/mongodb");
init_mongo();
var import_plugins = require("better-auth/plugins");
var auth = (0, import_better_auth.betterAuth)({
  database: (0, import_mongodb2.mongodbAdapter)(db),
  user: {
    modelName: "users"
  },
  session: {
    modelName: "sessions"
  },
  account: {
    modelName: "accounts"
  },
  verification: {
    modelName: "verifications"
  },
  plugins: [
    (0, import_plugins.admin)()
  ],
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ["http://localhost:3000"]
});

// src/middleware/auth.middleware.ts
var import_node = require("better-auth/node");
var getAuthSession = async (req) => {
  return await auth.api.getSession({
    headers: (0, import_node.fromNodeHeaders)(req.headers)
  });
};
var authMiddleware = async (req, res, next) => {
  try {
    const session = await getAuthSession(req);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized: Please log in to continue" });
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};
var adminMiddleware = async (req, res, next) => {
  try {
    const session = await getAuthSession(req);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized: No active session found" });
    }
    if (session.user.role !== "admin") {
      console.warn(`Admin Access Denied: User ${session.user.email} with role '${session.user.role}' attempted to access admin routes.`);
      return res.status(403).json({ message: "Forbidden: Administrator privileges required" });
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error during authorization" });
  }
};

// src/controllers/user.controller.ts
var getProfile = async (req, res) => {
  const user = req.user;
  res.json({
    message: "User profile fetched successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      image: user.image
    }
  });
};

// src/controllers/saved-items.controller.ts
init_mongo();
var import_mongodb3 = require("mongodb");
var getSavedItems = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const query = { userId };
    const { type } = req.query;
    if (type) {
      query.type = type;
    }
    const items = await db.collection("saved_items").find(query).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch saved items", error });
  }
};
var addSavedItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { type, itemId, data } = req.body;
    if (!type || itemId === void 0 || itemId === null) {
      return res.status(400).json({ message: "Missing required fields: type, itemId" });
    }
    let parsedItemId = itemId;
    if (typeof itemId === "string" && !isNaN(Number(itemId))) {
      parsedItemId = Number(itemId);
    }
    const existing = await db.collection("saved_items").findOne({
      userId,
      type,
      itemId: parsedItemId
    });
    if (existing) {
      return res.status(200).json(existing);
    }
    const newItem = {
      userId,
      type,
      itemId: parsedItemId,
      data: data || {},
      createdAt: /* @__PURE__ */ new Date()
    };
    const result = await db.collection("saved_items").insertOne(newItem);
    res.status(201).json({
      message: "Item saved successfully",
      _id: result.insertedId,
      ...newItem
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save item", error });
  }
};
var deleteSavedItemById = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing item ID" });
    }
    const result = await db.collection("saved_items").deleteOne({
      _id: new import_mongodb3.ObjectId(id),
      userId
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found or unauthorized to delete" });
    }
    res.json({ message: "Item deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};
var deleteSavedItemByItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { type, itemId } = req.params;
    if (!type || itemId === void 0 || itemId === null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const itemIdStr = itemId;
    let parsedItemId = itemIdStr;
    if (!isNaN(Number(itemIdStr))) {
      parsedItemId = Number(itemIdStr);
    }
    const result = await db.collection("saved_items").deleteOne({
      userId,
      type,
      itemId: parsedItemId
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};

// src/controllers/payment.controller.ts
init_mongo();
var import_mongodb4 = require("mongodb");
var import_crypto = __toESM(require("crypto"));
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var STORE_ID = process.env.SSL_STORE_ID;
var STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
var SESSION_API = process.env.SSL_SESSION_API;
var VALIDATION_API = process.env.SSL_VALIDATION_API;
var WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
var API_URL = process.env.BETTER_AUTH_URL;
if (!STORE_ID || !STORE_PASSWORD || !SESSION_API || !VALIDATION_API || !WEB_URL || !API_URL) {
  throw new Error("Missing critical SSLCommerz configuration in your backend environment variables (dotenv). Please configure them in apps/server/.env.");
}
var initiatePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;
    if (!courseId || !userId) {
      return res.status(400).json({ message: "Course ID and authentication are required" });
    }
    const course = await db.collection("courses").findOne({ _id: new import_mongodb4.ObjectId(courseId) });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId,
      courseId,
      paymentStatus: "paid"
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this course." });
    }
    const courseAmount = Number(course.amount) || 0;
    if (courseAmount <= 0) {
      return res.status(400).json({ message: "This course is free. Please use the free enrollment option." });
    }
    const amountInBDT = Math.round(courseAmount);
    const tranId = `TXN-${import_crypto.default.randomBytes(6).toString("hex").toUpperCase()}`;
    const pendingEnrollment = {
      userId,
      courseId,
      courseTitle: course.title,
      amount: courseAmount,
      tranId,
      status: "pending",
      paymentStatus: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    await db.collection("enrollments").insertOne(pendingEnrollment);
    const sslParams = new URLSearchParams();
    sslParams.append("store_id", STORE_ID);
    sslParams.append("store_passwd", STORE_PASSWORD);
    sslParams.append("total_amount", amountInBDT.toFixed(2));
    sslParams.append("currency", "BDT");
    sslParams.append("tran_id", tranId);
    sslParams.append("success_url", `${API_URL}/api/payment/success`);
    sslParams.append("fail_url", `${API_URL}/api/payment/fail`);
    sslParams.append("cancel_url", `${API_URL}/api/payment/cancel`);
    sslParams.append("ipn_url", `${API_URL}/api/payment/ipn`);
    sslParams.append("cus_name", req.user?.name || "Kazi Hasibul Haque Hasib");
    sslParams.append("cus_email", req.user?.email || "hasib46739@gmail.com");
    sslParams.append("cus_add1", "Khulna, Bangladesh");
    sslParams.append("cus_city", "Khulna");
    sslParams.append("cus_state", "Khulna");
    sslParams.append("cus_postcode", "9100");
    sslParams.append("cus_country", "Bangladesh");
    sslParams.append("cus_phone", req.user?.phone || "01812004315");
    sslParams.append("shipping_method", "NO");
    sslParams.append("num_of_item", "1");
    sslParams.append("product_name", course.title);
    sslParams.append("product_category", "Education");
    sslParams.append("product_profile", "non-physical-goods");
    console.log(`[Payment] Initiating SSLCommerz session for Course: "${course.title}", Amount: ${amountInBDT} BDT, TranId: ${tranId}`);
    const response = await fetch(SESSION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: sslParams.toString()
    });
    const data = await response.json();
    if (data && data.status === "SUCCESS" && data.GatewayPageURL) {
      console.log(`[Payment] Gateway Session Created. URL: ${data.GatewayPageURL}`);
      return res.json({ url: data.GatewayPageURL });
    } else {
      console.error("[Payment] SSLCommerz Initiation Failed:", data);
      await db.collection("enrollments").deleteOne({ tranId });
      return res.status(500).json({ message: "Failed to initiate payment with SSLCommerz gateway", details: data });
    }
  } catch (error) {
    console.error("[Payment] Initiate error:", error);
    res.status(500).json({ message: "Internal server error during payment initiation" });
  }
};
var paymentSuccess = async (req, res) => {
  try {
    const { val_id, tran_id, amount, card_type, bank_tran_id } = req.body;
    console.log(`[Payment] Received SUCCESS callback for TranId: ${tran_id}, ValId: ${val_id}`);
    if (!val_id) {
      console.error("[Payment] Missing validation ID (val_id) in success callback");
      return res.redirect(`${WEB_URL}/payment/fail?reason=missing_val_id`);
    }
    const valUrl = `${VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
    const response = await fetch(valUrl);
    const validationData = await response.json();
    if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
      console.log(`[Payment] Validation Successful for TranId: ${tran_id}`);
      const enrollment = await db.collection("enrollments").findOne({ tranId: tran_id });
      if (!enrollment) {
        console.error(`[Payment] Success callback: Enrollment not found for TranId ${tran_id}`);
        return res.redirect(`${WEB_URL}/payment/fail?reason=enrollment_not_found`);
      }
      await db.collection("enrollments").updateOne(
        { tranId: tran_id },
        {
          $set: {
            status: "active",
            paymentStatus: "paid",
            cardType: card_type || validationData.card_type,
            bankTranId: bank_tran_id || validationData.bank_tran_id,
            validationDetails: validationData,
            updatedAt: /* @__PURE__ */ new Date()
          }
        }
      );
      console.log(`[Payment] Enrollment activated successfully for User: ${enrollment.userId}, Course: ${enrollment.courseId}`);
      return res.redirect(`${WEB_URL}/payment/success?tran_id=${tran_id}&course_id=${enrollment.courseId}`);
    } else {
      console.error(`[Payment] Validation FAILED at SSLCommerz for TranId: ${tran_id}. Details:`, validationData);
      await db.collection("enrollments").updateOne(
        { tranId: tran_id },
        {
          $set: {
            status: "failed",
            paymentStatus: "failed",
            updatedAt: /* @__PURE__ */ new Date()
          }
        }
      );
      return res.redirect(`${WEB_URL}/payment/fail?tran_id=${tran_id}&reason=validation_failed`);
    }
  } catch (error) {
    console.error("[Payment] Success callback error:", error);
    res.redirect(`${WEB_URL}/payment/fail?reason=server_error`);
  }
};
var paymentFail = async (req, res) => {
  try {
    const { tran_id, error } = req.body;
    console.warn(`[Payment] Received FAIL callback for TranId: ${tran_id}, Error: ${error}`);
    await db.collection("enrollments").updateOne(
      { tranId: tran_id },
      {
        $set: {
          status: "failed",
          paymentStatus: "failed",
          failureReason: error,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
    res.redirect(`${WEB_URL}/payment/fail?tran_id=${tran_id}`);
  } catch (err) {
    console.error("[Payment] Fail callback error:", err);
    res.redirect(`${WEB_URL}/payment/fail`);
  }
};
var paymentCancel = async (req, res) => {
  try {
    const { tran_id } = req.body;
    console.warn(`[Payment] Received CANCEL callback for TranId: ${tran_id}`);
    await db.collection("enrollments").updateOne(
      { tranId: tran_id },
      {
        $set: {
          status: "cancelled",
          paymentStatus: "cancelled",
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
    res.redirect(`${WEB_URL}/payment/cancel`);
  } catch (err) {
    console.error("[Payment] Cancel callback error:", err);
    res.redirect(`${WEB_URL}/payment/cancel`);
  }
};
var paymentIpn = async (req, res) => {
  try {
    const { val_id, tran_id, status, amount, card_type, bank_tran_id } = req.body;
    console.log(`[Payment] Received IPN callback for TranId: ${tran_id}, Status: ${status}`);
    if (status === "VALID") {
      const valUrl = `${VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
      const response = await fetch(valUrl);
      const validationData = await response.json();
      if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
        const enrollment = await db.collection("enrollments").findOne({ tranId: tran_id });
        if (enrollment && enrollment.paymentStatus !== "paid") {
          await db.collection("enrollments").updateOne(
            { tranId: tran_id },
            {
              $set: {
                status: "active",
                paymentStatus: "paid",
                cardType: card_type,
                bankTranId: bank_tran_id,
                validationDetails: validationData,
                updatedAt: /* @__PURE__ */ new Date()
              }
            }
          );
          console.log(`[Payment IPN] Activated enrollment in background for TranId: ${tran_id}`);
        }
      }
    }
    res.status(200).json({ status: "SUCCESS", message: "IPN Received" });
  } catch (error) {
    console.error("[Payment IPN] Error:", error);
    res.status(500).json({ status: "FAILED", message: "IPN Error" });
  }
};
var enrollFreeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;
    if (!courseId || !userId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const course = await db.collection("courses").findOne({ _id: new import_mongodb4.ObjectId(courseId) });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const courseAmount = Number(course.amount) || 0;
    if (courseAmount > 0) {
      return res.status(400).json({ message: "This course is paid. Please use payment gateway." });
    }
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId,
      courseId,
      paymentStatus: "paid"
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this course." });
    }
    const tranId = `FREE-${import_crypto.default.randomBytes(6).toString("hex").toUpperCase()}`;
    const newEnrollment = {
      userId,
      courseId,
      courseTitle: course.title,
      amount: 0,
      tranId,
      status: "active",
      paymentStatus: "paid",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    await db.collection("enrollments").insertOne(newEnrollment);
    console.log(`[Payment] Enrolled in free course: "${course.title}" for User: ${userId}`);
    res.json({ message: "Enrolled in free course successfully", tranId });
  } catch (error) {
    console.error("[Payment] Free enrollment error:", error);
    res.status(500).json({ message: "Internal server error during free enrollment" });
  }
};
var getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const enrollments = await db.collection("enrollments").find({
      userId,
      paymentStatus: "paid"
    }).toArray();
    if (enrollments.length === 0) {
      return res.json([]);
    }
    const courseIds = enrollments.map((e) => new import_mongodb4.ObjectId(e.courseId));
    const courses = await db.collection("courses").find({
      _id: { $in: courseIds }
    }).toArray();
    res.json(courses);
  } catch (error) {
    console.error("[Payment] Get enrolled courses error:", error);
    res.status(500).json({ message: "Internal server error while fetching enrolled courses" });
  }
};

// src/controllers/admin.controller.ts
init_mongo();
var import_mongodb5 = require("mongodb");
var getUsers = async (req, res) => {
  try {
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};
var updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    delete updateData._id;
    const result = await db.collection("users").updateOne(
      { id },
      // Better auth uses 'id' string usually, but check if it's _id
      { $set: updateData }
    );
    res.json({ message: "User updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};
var deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("users").deleteOne({ id });
    res.json({ message: "User deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
var getCourses = async (req, res) => {
  try {
    const courses = await db.collection("courses").find({}).toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
};
var createCourse = async (req, res) => {
  try {
    const result = await db.collection("courses").insertOne(req.body);
    res.json({ message: "Course created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error });
  }
};
var updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("courses").updateOne(
      { _id: new import_mongodb5.ObjectId(id) },
      { $set: req.body }
    );
    res.json({ message: "Course updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error });
  }
};
var deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("courses").deleteOne({ _id: new import_mongodb5.ObjectId(id) });
    res.json({ message: "Course deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error });
  }
};
var getDuas = async (req, res) => {
  try {
    const duas = await db.collection("duas").find({}).toArray();
    res.json(duas);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch duas", error });
  }
};
var createDua = async (req, res) => {
  try {
    const result = await db.collection("duas").insertOne(req.body);
    res.json({ message: "Dua created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create dua", error });
  }
};
var updateDua = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("duas").updateOne(
      { _id: new import_mongodb5.ObjectId(id) },
      { $set: req.body }
    );
    res.json({ message: "Dua updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update dua", error });
  }
};
var deleteDua = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("duas").deleteOne({ _id: new import_mongodb5.ObjectId(id) });
    res.json({ message: "Dua deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dua", error });
  }
};
var getFeelings = async (req, res) => {
  try {
    const feelings = await db.collection("feelings").find({}).toArray();
    res.json(feelings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feelings", error });
  }
};
var createFeeling = async (req, res) => {
  try {
    const result = await db.collection("feelings").insertOne(req.body);
    res.json({ message: "Feeling created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to create feeling", error });
  }
};
var updateFeeling = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("feelings").updateOne(
      { _id: new import_mongodb5.ObjectId(id) },
      { $set: req.body }
    );
    res.json({ message: "Feeling updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update feeling", error });
  }
};
var deleteFeeling = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection("feelings").deleteOne({ _id: new import_mongodb5.ObjectId(id) });
    res.json({ message: "Feeling deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete feeling", error });
  }
};
var getStats = async (req, res) => {
  try {
    const [users, courses, duas, feelings] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("courses").countDocuments(),
      db.collection("duas").countDocuments(),
      db.collection("feelings").countDocuments()
    ]);
    res.json({
      users,
      courses,
      duas,
      feelings
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};

// src/index.ts
import_dotenv3.default.config();
var app = (0, import_express.default)();
var port = process.env.PORT || 3001;
app.use((0, import_morgan.default)("dev"));
app.use((0, import_cors.default)({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Path to Peace API" });
});
app.use("/api/auth", (0, import_node2.toNodeHandler)(auth));
app.get("/api/me", authMiddleware, getProfile);
app.post("/api/payment/initiate", authMiddleware, initiatePayment);
app.post("/api/payment/success", paymentSuccess);
app.post("/api/payment/fail", paymentFail);
app.post("/api/payment/cancel", paymentCancel);
app.post("/api/payment/ipn", paymentIpn);
app.post("/api/courses/enroll-free", authMiddleware, enrollFreeCourse);
app.get("/api/courses/enrolled", authMiddleware, getEnrolledCourses);
app.get("/api/saved-items", authMiddleware, getSavedItems);
app.post("/api/saved-items", authMiddleware, addSavedItem);
app.delete("/api/saved-items/:id", authMiddleware, deleteSavedItemById);
app.delete("/api/saved-items/:type/:itemId", authMiddleware, deleteSavedItemByItem);
app.get("/api/admin/stats", adminMiddleware, getStats);
app.get("/api/admin/users", adminMiddleware, getUsers);
app.patch("/api/admin/users/:id", adminMiddleware, updateUser);
app.delete("/api/admin/users/:id", adminMiddleware, deleteUser);
app.get("/api/admin/courses", adminMiddleware, getCourses);
app.post("/api/admin/courses", adminMiddleware, createCourse);
app.patch("/api/admin/courses/:id", adminMiddleware, updateCourse);
app.delete("/api/admin/courses/:id", adminMiddleware, deleteCourse);
app.get("/api/admin/duas", adminMiddleware, getDuas);
app.post("/api/admin/duas", adminMiddleware, createDua);
app.patch("/api/admin/duas/:id", adminMiddleware, updateDua);
app.delete("/api/admin/duas/:id", adminMiddleware, deleteDua);
app.get("/api/admin/feelings", adminMiddleware, getFeelings);
app.post("/api/admin/feelings", adminMiddleware, createFeeling);
app.patch("/api/admin/feelings/:id", adminMiddleware, updateFeeling);
app.delete("/api/admin/feelings/:id", adminMiddleware, deleteFeeling);
app.get("/api/courses", async (req, res) => {
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_mongo(), mongo_exports));
    const courses = await db2.collection("courses").find({ status: "active" }).toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});
app.get("/api/admin/set-me-as-admin", authMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_mongo(), mongo_exports));
    await db2.collection("users").updateOne(
      { id: user.id },
      { $set: { role: "admin" } }
    );
    res.json({ message: "You are now an admin. Please refresh the page." });
  } catch (error) {
    res.status(500).json({ message: "Failed to set admin role" });
  }
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  try {
    const { client: client2 } = await Promise.resolve().then(() => (init_mongo(), mongo_exports));
    await client2.db("admin").command({ ping: 1 });
    console.log("MongoDB connection: SUCCESSFUL (Pinged)");
    const { seedDatabase: seedDatabase2 } = await Promise.resolve().then(() => (init_seed(), seed_exports));
    await seedDatabase2();
  } catch (error) {
    console.error("MongoDB connection: FAILED", error);
  }
});
