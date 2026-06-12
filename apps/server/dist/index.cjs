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

// src/db/firestore.ts
var firestore_exports = {};
__export(firestore_exports, {
  db: () => db
});
var import_firebase_admin, import_dotenv, import_fs, import_path, db;
var init_firestore = __esm({
  "src/db/firestore.ts"() {
    "use strict";
    import_firebase_admin = __toESM(require("firebase-admin"), 1);
    import_dotenv = __toESM(require("dotenv"), 1);
    import_fs = __toESM(require("fs"), 1);
    import_path = __toESM(require("path"), 1);
    import_dotenv.default.config();
    if (import_firebase_admin.default.apps.length === 0) {
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
      const projectId = process.env.FIREBASE_PROJECT_ID || "path-to-peace-4cacd";
      if (serviceAccountPath && import_fs.default.existsSync(serviceAccountPath)) {
        console.log(`[Firebase] Initializing with service account from: ${serviceAccountPath}`);
        const serviceAccount = JSON.parse(import_fs.default.readFileSync(import_path.default.resolve(serviceAccountPath), "utf8"));
        import_firebase_admin.default.initializeApp({
          credential: import_firebase_admin.default.credential.cert(serviceAccount),
          projectId
        });
      } else {
        console.log(`[Firebase] Initializing default application (Emulator or Default Credentials) for project: ${projectId}`);
        import_firebase_admin.default.initializeApp({
          projectId
        });
      }
    }
    db = import_firebase_admin.default.firestore();
    db.settings({ ignoreUndefinedProperties: true });
  }
});

// src/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth
});
var import_dotenv2, import_better_auth, import_better_auth_firestore, import_plugins, auth;
var init_auth = __esm({
  "src/auth.ts"() {
    "use strict";
    import_dotenv2 = __toESM(require("dotenv"), 1);
    import_better_auth = require("better-auth");
    import_better_auth_firestore = require("better-auth-firestore");
    init_firestore();
    import_plugins = require("better-auth/plugins");
    import_dotenv2.default.config();
    if (!process.env.BETTER_AUTH_SECRET) {
      throw new Error("BETTER_AUTH_SECRET is not defined in .env file");
    }
    auth = (0, import_better_auth.betterAuth)({
      secret: process.env.BETTER_AUTH_SECRET,
      database: (0, import_better_auth_firestore.firestoreAdapter)({
        firestore: db
      }),
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
        (0, import_plugins.admin)(),
        (0, import_plugins.bearer)()
      ],
      emailAndPassword: {
        enabled: true
      },
      trustedOrigins: ["http://localhost:3000"]
    });
  }
});

// src/db/seed.ts
var seed_exports = {};
__export(seed_exports, {
  seedDatabase: () => seedDatabase
});
var import_fs2, import_path2, import_url, import_meta, seedDatabase;
var init_seed = __esm({
  "src/db/seed.ts"() {
    "use strict";
    init_firestore();
    import_fs2 = __toESM(require("fs"), 1);
    import_path2 = __toESM(require("path"), 1);
    import_url = require("url");
    import_meta = {};
    seedDatabase = async () => {
      try {
        console.log("[Seeder] Starting database seeding...");
        const __filename = (0, import_url.fileURLToPath)(import_meta.url);
        const __dirname = import_path2.default.dirname(__filename);
        const webLibPath = import_path2.default.resolve(__dirname, "../../../web/lib/data");
        const duasPath = import_path2.default.join(webLibPath, "duas.json");
        const chunkArray = (array, size) => {
          const chunked = [];
          for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
          }
          return chunked;
        };
        const duasSnapshot = await db.collection("duas").limit(1).get();
        if (duasSnapshot.empty && import_fs2.default.existsSync(duasPath)) {
          console.log("[Seeder] Seeding Duas...");
          const duasData = JSON.parse(import_fs2.default.readFileSync(duasPath, "utf-8"));
          if (duasData.duas && duasData.duas.length > 0) {
            const chunks = chunkArray(duasData.duas, 400);
            for (const chunk of chunks) {
              const batch = db.batch();
              chunk.forEach((dua) => {
                const docRef = db.collection("duas").doc();
                batch.set(docRef, {
                  ...dua,
                  createdAt: /* @__PURE__ */ new Date(),
                  updatedAt: /* @__PURE__ */ new Date()
                });
              });
              await batch.commit();
            }
            console.log("[Seeder] Seeded Duas successfully");
          }
        } else {
          console.log("[Seeder] Duas collection is not empty or JSON file missing, skipping.");
        }
        const feelingsSnapshot = await db.collection("feelings").limit(1).get();
        if (feelingsSnapshot.empty) {
          console.log("[Seeder] Seeding default feelings...");
          const defaultFeelings = [
            { label: "Sad", icon: "Frown", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() },
            { label: "Anxious", icon: "AlertCircle", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() },
            { label: "Stressed", icon: "Zap", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() },
            { label: "Grateful", icon: "Heart", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() },
            { label: "Angry", icon: "Flame", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() },
            { label: "Weak", icon: "Activity", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }
          ];
          const batch = db.batch();
          defaultFeelings.forEach((feeling) => {
            const docRef = db.collection("feelings").doc();
            batch.set(docRef, feeling);
          });
          await batch.commit();
          console.log("[Seeder] Seeded default feelings successfully");
        } else {
          console.log("[Seeder] Feelings collection is not empty, skipping feelings seeding.");
        }
        const coursesSnapshot = await db.collection("courses").limit(1).get();
        if (coursesSnapshot.empty) {
          console.log("[Seeder] Seeding default courses...");
          const defaultCourses = [
            {
              title: "Introduction to Peace",
              description: "Learn the basics of inner peace and mindfulness.",
              duration: "4 weeks",
              instructor: "Admin",
              status: "active",
              amount: 1200,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            }
          ];
          const batch = db.batch();
          defaultCourses.forEach((course) => {
            const docRef = db.collection("courses").doc();
            batch.set(docRef, course);
          });
          await batch.commit();
          console.log("[Seeder] Seeded default courses successfully");
        } else {
          console.log("[Seeder] Courses collection is not empty, skipping.");
        }
        const usersSnapshot = await db.collection("users").limit(1).get();
        if (usersSnapshot.empty) {
          console.log("[Seeder] Seeding default users...");
          const { auth: auth2 } = await Promise.resolve().then(() => (init_auth(), auth_exports));
          try {
            const adminUser = await auth2.api.signUpEmail({
              body: {
                name: "Admin Sanctuary",
                email: "admin@pathtopeace.com",
                password: "AdminPassword123"
              }
            });
            if (adminUser) {
              await db.collection("users").doc(adminUser.user.id).update({
                role: "admin"
              });
              console.log("[Seeder] Seeded admin user (admin@pathtopeace.com) successfully");
            }
          } catch (authError) {
            console.error("[Seeder] Failed to seed admin user:", authError);
          }
          try {
            await auth2.api.signUpEmail({
              body: {
                name: "John Seeker",
                email: "user@pathtopeace.com",
                password: "UserPassword123"
              }
            });
            console.log("[Seeder] Seeded regular user (user@pathtopeace.com) successfully");
          } catch (authError) {
            console.error("[Seeder] Failed to seed regular user:", authError);
          }
        } else {
          console.log("[Seeder] Users collection is not empty, skipping user seeding.");
        }
      } catch (error) {
        console.error("[Seeder] Error seeding database:", error);
      }
    };
  }
});

// src/index.ts
var import_express8 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_dotenv5 = __toESM(require("dotenv"), 1);
var import_morgan = __toESM(require("morgan"), 1);

// src/routes/index.ts
var import_express7 = require("express");
var import_node2 = require("better-auth/node");
init_auth();

// src/routes/user.routes.ts
var import_express = require("express");

// src/middleware/auth.middleware.ts
init_auth();
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
init_firestore();
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
var setMeAsAdmin = async (req, res) => {
  const user = req.user;
  try {
    await db.collection("users").doc(user.id).update({
      role: "admin"
    });
    res.json({ message: "You are now an admin. Please refresh the page." });
  } catch (error) {
    console.error("Failed to set admin role:", error);
    res.status(500).json({ message: "Failed to set admin role" });
  }
};

// src/routes/user.routes.ts
var router = (0, import_express.Router)();
router.get("/me", authMiddleware, getProfile);
router.get("/admin/set-me-as-admin", authMiddleware, setMeAsAdmin);
var user_routes_default = router;

// src/routes/course.routes.ts
var import_express2 = require("express");

// src/controllers/course.controller.ts
init_firestore();
var getPublicCourses = async (req, res) => {
  try {
    const snapshot = await db.collection("courses").where("status", "==", "active").get();
    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      _id: doc.id,
      ...doc.data()
    }));
    res.json(courses);
  } catch (error) {
    console.error("Failed to fetch public courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// src/controllers/payment.controller.ts
var import_crypto = __toESM(require("crypto"), 1);
var import_dotenv4 = __toESM(require("dotenv"), 1);
var import_firestore4 = require("firebase-admin/firestore");
init_firestore();

// src/utils/sslcommerz.ts
var import_dotenv3 = __toESM(require("dotenv"), 1);
import_dotenv3.default.config();
var STORE_ID = process.env.SSL_STORE_ID;
var STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
var SESSION_API = process.env.SSL_SESSION_API;
var VALIDATION_API = process.env.SSL_VALIDATION_API;
var API_URL = process.env.BETTER_AUTH_URL;
var validateConfig = () => {
  if (!STORE_ID || !STORE_PASSWORD || !SESSION_API || !VALIDATION_API || !API_URL) {
    throw new Error(
      "Missing critical SSLCommerz configuration in backend environment variables. Please configure SSL_STORE_ID, SSL_STORE_PASSWORD, SSL_SESSION_API, SSL_VALIDATION_API, and BETTER_AUTH_URL in your apps/server/.env file."
    );
  }
};
var initiateSSLSession = async (params) => {
  validateConfig();
  const amountInBDT = Math.round(params.amount);
  const sslParams = new URLSearchParams();
  sslParams.append("store_id", STORE_ID);
  sslParams.append("store_passwd", STORE_PASSWORD);
  sslParams.append("total_amount", amountInBDT.toFixed(2));
  sslParams.append("currency", "BDT");
  sslParams.append("tran_id", params.tranId);
  sslParams.append("success_url", `${API_URL}/api/payment/success`);
  sslParams.append("fail_url", `${API_URL}/api/payment/fail`);
  sslParams.append("cancel_url", `${API_URL}/api/payment/cancel`);
  sslParams.append("ipn_url", `${API_URL}/api/payment/ipn`);
  sslParams.append("cus_name", params.customerName || "Kazi Hasibul Haque Hasib");
  sslParams.append("cus_email", params.customerEmail || "hasib46739@gmail.com");
  sslParams.append("cus_add1", "Khulna, Bangladesh");
  sslParams.append("cus_city", "Khulna");
  sslParams.append("cus_state", "Khulna");
  sslParams.append("cus_postcode", "9100");
  sslParams.append("cus_country", "Bangladesh");
  sslParams.append("cus_phone", params.customerPhone || "01812004315");
  sslParams.append("shipping_method", "NO");
  sslParams.append("num_of_item", "1");
  sslParams.append("product_name", params.productName);
  sslParams.append("product_category", "Education");
  sslParams.append("product_profile", "non-physical-goods");
  const response = await fetch(SESSION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: sslParams.toString()
  });
  return await response.json();
};
var validateSSLTransaction = async (valId) => {
  validateConfig();
  const valUrl = `${VALIDATION_API}?val_id=${valId}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
  const response = await fetch(valUrl);
  return await response.json();
};

// src/controllers/payment.controller.ts
import_dotenv4.default.config();
var WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
if (!WEB_URL) {
  throw new Error("Missing NEXT_PUBLIC_WEB_URL environment variable. Please check your backend environment configuration.");
}
var initiatePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;
    if (!courseId || !userId) {
      return res.status(400).json({ message: "Course ID and authentication are required" });
    }
    if (req.user?.role === "admin") {
      return res.status(403).json({ message: "Administrators cannot purchase courses." });
    }
    const courseDoc = await db.collection("courses").doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).json({ message: "Course not found" });
    }
    const course = courseDoc.data();
    const existingEnrollmentSnapshot = await db.collection("enrollments").where("userId", "==", userId).where("courseId", "==", courseId).where("paymentStatus", "==", "paid").limit(1).get();
    if (!existingEnrollmentSnapshot.empty) {
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
    await db.collection("enrollments").add(pendingEnrollment);
    console.log(`[Payment] Initiating SSLCommerz session for Course: "${course.title}", Amount: ${amountInBDT} BDT, TranId: ${tranId}`);
    const data = await initiateSSLSession({
      amount: courseAmount,
      tranId,
      productName: course.title,
      customerName: req.user?.name,
      customerEmail: req.user?.email,
      customerPhone: req.user?.phone
    });
    if (data && data.status === "SUCCESS" && data.GatewayPageURL) {
      console.log(`[Payment] Gateway Session Created successfully. URL: ${data.GatewayPageURL}`);
      return res.json({ url: data.GatewayPageURL });
    } else {
      console.error("[Payment] SSLCommerz Initiation Failed:", data);
      const rollbackSnapshot = await db.collection("enrollments").where("tranId", "==", tranId).get();
      const batch = db.batch();
      rollbackSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      return res.status(500).json({ message: "Failed to initiate payment with SSLCommerz gateway", details: data });
    }
  } catch (error) {
    console.error("[Payment] Initiate error:", error);
    res.status(500).json({ message: "Internal server error during payment initiation" });
  }
};
var paymentSuccess = async (req, res) => {
  try {
    const { val_id, tran_id, card_type, bank_tran_id } = req.body;
    console.log(`[Payment] Received SUCCESS callback for TranId: ${tran_id}, ValId: ${val_id}`);
    if (!val_id) {
      console.error("[Payment] Missing validation ID (val_id) in success callback");
      return res.redirect(`${WEB_URL}/payment/fail?reason=missing_val_id`);
    }
    const validationData = await validateSSLTransaction(val_id);
    if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
      console.log(`[Payment] Validation Successful for TranId: ${tran_id}`);
      const enrollmentSnapshot = await db.collection("enrollments").where("tranId", "==", tran_id).limit(1).get();
      if (enrollmentSnapshot.empty) {
        console.error(`[Payment] Success callback: Enrollment not found for TranId ${tran_id}`);
        return res.redirect(`${WEB_URL}/payment/fail?reason=enrollment_not_found`);
      }
      const enrollmentDoc = enrollmentSnapshot.docs[0];
      const enrollment = enrollmentDoc.data();
      await enrollmentDoc.ref.update({
        status: "active",
        paymentStatus: "paid",
        cardType: card_type || validationData.card_type,
        bankTranId: bank_tran_id || validationData.bank_tran_id,
        validationDetails: validationData,
        updatedAt: /* @__PURE__ */ new Date()
      });
      console.log(`[Payment] Enrollment activated successfully for User: ${enrollment.userId}, Course: ${enrollment.courseId}`);
      return res.redirect(`${WEB_URL}/payment/success?tran_id=${tran_id}&course_id=${enrollment.courseId}`);
    } else {
      console.error(`[Payment] Validation FAILED at SSLCommerz for TranId: ${tran_id}. Details:`, validationData);
      const enrollmentSnapshot = await db.collection("enrollments").where("tranId", "==", tran_id).limit(1).get();
      if (!enrollmentSnapshot.empty) {
        await enrollmentSnapshot.docs[0].ref.update({
          status: "failed",
          paymentStatus: "failed",
          updatedAt: /* @__PURE__ */ new Date()
        });
      }
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
    const enrollmentSnapshot = await db.collection("enrollments").where("tranId", "==", tran_id).limit(1).get();
    if (!enrollmentSnapshot.empty) {
      await enrollmentSnapshot.docs[0].ref.update({
        status: "failed",
        paymentStatus: "failed",
        failureReason: error,
        updatedAt: /* @__PURE__ */ new Date()
      });
    }
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
    const enrollmentSnapshot = await db.collection("enrollments").where("tranId", "==", tran_id).limit(1).get();
    if (!enrollmentSnapshot.empty) {
      await enrollmentSnapshot.docs[0].ref.update({
        status: "cancelled",
        paymentStatus: "cancelled",
        updatedAt: /* @__PURE__ */ new Date()
      });
    }
    res.redirect(`${WEB_URL}/payment/cancel`);
  } catch (err) {
    console.error("[Payment] Cancel callback error:", err);
    res.redirect(`${WEB_URL}/payment/cancel`);
  }
};
var paymentIpn = async (req, res) => {
  try {
    const { val_id, tran_id, status, card_type, bank_tran_id } = req.body;
    console.log(`[Payment] Received IPN callback for TranId: ${tran_id}, Status: ${status}`);
    if (status === "VALID") {
      const validationData = await validateSSLTransaction(val_id);
      if (validationData && (validationData.status === "VALID" || validationData.status === "VALIDATED")) {
        const enrollmentSnapshot = await db.collection("enrollments").where("tranId", "==", tran_id).limit(1).get();
        if (!enrollmentSnapshot.empty) {
          const doc = enrollmentSnapshot.docs[0];
          const enrollment = doc.data();
          if (enrollment.paymentStatus !== "paid") {
            await doc.ref.update({
              status: "active",
              paymentStatus: "paid",
              cardType: card_type,
              bankTranId: bank_tran_id,
              validationDetails: validationData,
              updatedAt: /* @__PURE__ */ new Date()
            });
            console.log(`[Payment IPN] Activated enrollment in background for TranId: ${tran_id}`);
          }
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
    if (req.user?.role === "admin") {
      return res.status(403).json({ message: "Administrators cannot enroll in courses." });
    }
    const courseDoc = await db.collection("courses").doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).json({ message: "Course not found" });
    }
    const course = courseDoc.data();
    const courseAmount = Number(course.amount) || 0;
    if (courseAmount > 0) {
      return res.status(400).json({ message: "This course is paid. Please use payment gateway." });
    }
    const existingEnrollmentSnapshot = await db.collection("enrollments").where("userId", "==", userId).where("courseId", "==", courseId).where("paymentStatus", "==", "paid").limit(1).get();
    if (!existingEnrollmentSnapshot.empty) {
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
    await db.collection("enrollments").add(newEnrollment);
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
    const enrollmentsSnapshot = await db.collection("enrollments").where("userId", "==", userId).where("paymentStatus", "==", "paid").get();
    if (enrollmentsSnapshot.empty) {
      return res.json([]);
    }
    const courseIds = enrollmentsSnapshot.docs.map((doc) => doc.data().courseId);
    if (courseIds.length === 0) {
      return res.json([]);
    }
    const slicedCourseIds = courseIds.slice(0, 30);
    const coursesSnapshot = await db.collection("courses").where(import_firestore4.FieldPath.documentId(), "in", slicedCourseIds).get();
    const courses = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(courses);
  } catch (error) {
    console.error("[Payment] Get enrolled courses error:", error);
    res.status(500).json({ message: "Internal server error while fetching enrolled courses" });
  }
};

// src/routes/course.routes.ts
var router2 = (0, import_express2.Router)();
router2.get("/courses", getPublicCourses);
router2.post("/courses/enroll-free", authMiddleware, enrollFreeCourse);
router2.get("/courses/enrolled", authMiddleware, getEnrolledCourses);
var course_routes_default = router2;

// src/routes/payment.routes.ts
var import_express3 = require("express");
var router3 = (0, import_express3.Router)();
router3.post("/payment/initiate", authMiddleware, initiatePayment);
router3.post("/payment/success", paymentSuccess);
router3.post("/payment/fail", paymentFail);
router3.post("/payment/cancel", paymentCancel);
router3.post("/payment/ipn", paymentIpn);
var payment_routes_default = router3;

// src/routes/saved-items.routes.ts
var import_express4 = require("express");

// src/controllers/saved-items.controller.ts
init_firestore();
var getSavedItems = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let queryRef = db.collection("saved_items").where("userId", "==", userId);
    const { type } = req.query;
    if (type) {
      queryRef = queryRef.where("type", "==", type);
    }
    const snapshot = await queryRef.get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
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
    const existingSnapshot = await db.collection("saved_items").where("userId", "==", userId).where("type", "==", type).where("itemId", "==", parsedItemId).limit(1).get();
    if (!existingSnapshot.empty) {
      const doc = existingSnapshot.docs[0];
      return res.status(200).json({
        id: doc.id,
        ...doc.data()
      });
    }
    const newItem = {
      userId,
      type,
      itemId: parsedItemId,
      data: data || {},
      createdAt: /* @__PURE__ */ new Date()
    };
    const docRef = await db.collection("saved_items").add(newItem);
    res.status(201).json({
      message: "Item saved successfully",
      id: docRef.id,
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
    const docRef = db.collection("saved_items").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Item not found or unauthorized to delete" });
    }
    if (doc.data()?.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this item" });
    }
    await docRef.delete();
    res.json({ message: "Item deleted successfully" });
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
    const snapshot = await db.collection("saved_items").where("userId", "==", userId).where("type", "==", type).where("itemId", "==", parsedItemId).get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "Item not found" });
    }
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};

// src/routes/saved-items.routes.ts
var router4 = (0, import_express4.Router)();
router4.get("/saved-items", authMiddleware, getSavedItems);
router4.post("/saved-items", authMiddleware, addSavedItem);
router4.delete("/saved-items/:id", authMiddleware, deleteSavedItemById);
router4.delete("/saved-items/:type/:itemId", authMiddleware, deleteSavedItemByItem);
var saved_items_routes_default = router4;

// src/routes/feeling.routes.ts
var import_express5 = require("express");
init_firestore();
var router5 = (0, import_express5.Router)();
router5.get("/duas", async (req, res) => {
  try {
    const snapshot = await db.collection("duas").get();
    const mappedDuas = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        ...d,
        id: doc.id
      };
    });
    res.json(mappedDuas);
  } catch (error) {
    console.error("Failed to fetch public duas:", error);
    res.status(500).json({ message: "Failed to fetch duas" });
  }
});
var feeling_routes_default = router5;

// src/routes/admin.routes.ts
var import_express6 = require("express");

// src/controllers/admin.controller.ts
init_firestore();
var getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const mappedUsers = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      _id: doc.id
    }));
    res.json(mappedUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
var updateUser = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const updateData = { ...req.body };
  delete updateData._id;
  delete updateData.id;
  try {
    const docRef = db.collection("users").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    await docRef.update(updateData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};
var deleteUser = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const userDocRef = db.collection("users").doc(id);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    const batch = db.batch();
    batch.delete(userDocRef);
    const collections = ["accounts", "sessions", "enrollments", "saved_items"];
    const deletedCounts = {
      userDeleted: 1,
      accountsDeleted: 0,
      sessionsDeleted: 0,
      enrollmentsDeleted: 0,
      savedItemsDeleted: 0
    };
    for (const col of collections) {
      const snap = await db.collection(col).where("userId", "==", id).get();
      snap.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      if (col === "accounts") deletedCounts.accountsDeleted = snap.size;
      if (col === "sessions") deletedCounts.sessionsDeleted = snap.size;
      if (col === "enrollments") deletedCounts.enrollmentsDeleted = snap.size;
      if (col === "saved_items") deletedCounts.savedItemsDeleted = snap.size;
    }
    await batch.commit();
    res.json({
      message: "User and all associated data deleted successfully",
      details: deletedCounts
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
var getCourses = async (req, res) => {
  try {
    const snapshot = await db.collection("courses").get();
    const courses = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      _id: doc.id
    }));
    res.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};
var createCourse = async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Course title is required and must be a non-empty string" });
    }
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({ message: "Course amount is required and must be a valid non-negative number" });
    }
    const courseData = {
      ...req.body,
      amount: parsedAmount,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    delete courseData._id;
    delete courseData.id;
    const docRef = await db.collection("courses").add(courseData);
    res.status(201).json({ message: "Course created successfully", id: docRef.id, _id: docRef.id });
  } catch (error) {
    console.error("Failed to create course:", error);
    res.status(500).json({ message: "Failed to create course" });
  }
};
var updateCourse = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const updateData = { ...req.body };
  delete updateData._id;
  delete updateData.id;
  if (updateData.amount !== void 0) {
    const parsedAmount = Number(updateData.amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({ message: "Course amount must be a valid non-negative number" });
    }
    updateData.amount = parsedAmount;
  }
  try {
    const docRef = db.collection("courses").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Course not found" });
    }
    await docRef.update(updateData);
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Failed to update course:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};
var deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const docRef = db.collection("courses").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Course not found" });
    }
    await docRef.delete();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Failed to delete course:", error);
    res.status(500).json({ message: "Failed to delete course" });
  }
};
var getDuas = async (req, res) => {
  try {
    const snapshot = await db.collection("duas").get();
    const duas = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      _id: doc.id
    }));
    res.json(duas);
  } catch (error) {
    console.error("Failed to fetch duas:", error);
    res.status(500).json({ message: "Failed to fetch duas" });
  }
};
var createDua = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Dua title is required and must be a non-empty string" });
    }
    const duaData = {
      ...req.body,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    delete duaData._id;
    delete duaData.id;
    const docRef = await db.collection("duas").add(duaData);
    res.status(201).json({ message: "Dua created successfully", id: docRef.id, _id: docRef.id });
  } catch (error) {
    console.error("Failed to create dua:", error);
    res.status(500).json({ message: "Failed to create dua" });
  }
};
var updateDua = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const updateData = { ...req.body };
  delete updateData._id;
  delete updateData.id;
  try {
    const docRef = db.collection("duas").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Dua not found" });
    }
    await docRef.update(updateData);
    res.json({ message: "Dua updated successfully" });
  } catch (error) {
    console.error("Failed to update dua:", error);
    res.status(500).json({ message: "Failed to update dua" });
  }
};
var deleteDua = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const docRef = db.collection("duas").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Dua not found" });
    }
    await docRef.delete();
    res.json({ message: "Dua deleted successfully" });
  } catch (error) {
    console.error("Failed to delete dua:", error);
    res.status(500).json({ message: "Failed to delete dua" });
  }
};
var getFeelings = async (req, res) => {
  try {
    const snapshot = await db.collection("feelings").get();
    const feelings = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      _id: doc.id
    }));
    res.json(feelings);
  } catch (error) {
    console.error("Failed to fetch feelings:", error);
    res.status(500).json({ message: "Failed to fetch feelings" });
  }
};
var createFeeling = async (req, res) => {
  try {
    const { label, icon } = req.body;
    if (!label || typeof label !== "string" || label.trim() === "") {
      return res.status(400).json({ message: "Feeling label is required and must be a non-empty string" });
    }
    if (!icon || typeof icon !== "string" || icon.trim() === "") {
      return res.status(400).json({ message: "Feeling icon is required and must be a non-empty string" });
    }
    const feelingData = {
      ...req.body,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    delete feelingData._id;
    delete feelingData.id;
    const docRef = await db.collection("feelings").add(feelingData);
    res.status(201).json({ message: "Feeling created successfully", id: docRef.id, _id: docRef.id });
  } catch (error) {
    console.error("Failed to create feeling:", error);
    res.status(500).json({ message: "Failed to create feeling" });
  }
};
var updateFeeling = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const updateData = { ...req.body };
  delete updateData._id;
  delete updateData.id;
  try {
    const docRef = db.collection("feelings").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Feeling not found" });
    }
    await docRef.update(updateData);
    res.json({ message: "Feeling updated successfully" });
  } catch (error) {
    console.error("Failed to update feeling:", error);
    res.status(500).json({ message: "Failed to update feeling" });
  }
};
var deleteFeeling = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const docRef = db.collection("feelings").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Feeling not found" });
    }
    await docRef.delete();
    res.json({ message: "Feeling deleted successfully" });
  } catch (error) {
    console.error("Failed to delete feeling:", error);
    res.status(500).json({ message: "Failed to delete feeling" });
  }
};
var getStats = async (req, res) => {
  try {
    const [usersSnap, coursesSnap, duasSnap, feelingsSnap] = await Promise.all([
      db.collection("users").count().get(),
      db.collection("courses").count().get(),
      db.collection("duas").count().get(),
      db.collection("feelings").count().get()
    ]);
    res.json({
      users: usersSnap.data().count,
      courses: coursesSnap.data().count,
      duas: duasSnap.data().count,
      feelings: feelingsSnap.data().count
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// src/routes/admin.routes.ts
var router6 = (0, import_express6.Router)();
router6.use(adminMiddleware);
router6.get("/stats", getStats);
router6.get("/users", getUsers);
router6.patch("/users/:id", updateUser);
router6.delete("/users/:id", deleteUser);
router6.get("/courses", getCourses);
router6.post("/courses", createCourse);
router6.patch("/courses/:id", updateCourse);
router6.delete("/courses/:id", deleteCourse);
router6.get("/duas", getDuas);
router6.post("/duas", createDua);
router6.patch("/duas/:id", updateDua);
router6.delete("/duas/:id", deleteDua);
router6.get("/feelings", getFeelings);
router6.post("/feelings", createFeeling);
router6.patch("/feelings/:id", updateFeeling);
router6.delete("/feelings/:id", deleteFeeling);
var admin_routes_default = router6;

// src/routes/index.ts
var router7 = (0, import_express7.Router)();
router7.use("/auth", (0, import_node2.toNodeHandler)(auth));
router7.use("/", user_routes_default);
router7.use("/", course_routes_default);
router7.use("/", payment_routes_default);
router7.use("/", saved_items_routes_default);
router7.use("/", feeling_routes_default);
router7.use("/admin", admin_routes_default);
var routes_default = router7;

// src/index.ts
import_dotenv5.default.config();
var app = (0, import_express8.default)();
var port = process.env.PORT || 3001;
app.use((0, import_morgan.default)("dev"));
app.use((0, import_cors.default)({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(import_express8.default.json());
app.use(import_express8.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Path to Peace API" });
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api", routes_default);
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_firestore(), firestore_exports));
    await db2.collection("health").limit(1).get();
    console.log("Firestore connection: SUCCESSFUL (Pinged)");
    const { seedDatabase: seedDatabase2 } = await Promise.resolve().then(() => (init_seed(), seed_exports));
    await seedDatabase2();
  } catch (error) {
    console.error("Firestore connection: FAILED", error);
  }
});
