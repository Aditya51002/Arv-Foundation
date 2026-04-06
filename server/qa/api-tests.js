/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

const ASSETS_DIR = path.join(__dirname, "..", "tmp_test_assets");
const IMAGE_PATH = path.join(ASSETS_DIR, "test.png");
const PDF_PATH = path.join(ASSETS_DIR, "test.pdf");

const ADMIN_EMAIL = "arvcreation@gmail.com";
const ADMIN_PASSWORD = "admin123";
const USER_EMAIL = "user@example.com";
const USER_PASSWORD = "user123";

const results = [];

const longString = "a".repeat(5100);
const specialString = "!@#$%^&*()_+{}[]<>?";
const unicodeString = "\u4e2d\u6587 \u0639\u0631\u0628\u064a";
const sqlString = "' OR 1=1 --";
const xssString = "<script>alert('xss')</script>";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const summarizeBody = (body) => {
  if (body === null || body === undefined) return "(empty)";
  if (typeof body === "string") return body.slice(0, 200);
  try {
    return JSON.stringify(body).slice(0, 200);
  } catch (err) {
    return "(unserializable)";
  }
};

const record = (endpoint, method, testCase, expected, actual, pass) => {
  results.push({ endpoint, method, testCase, expected, actual, pass });
};

const request = async ({ method, path: reqPath, token, headers, body, formData }) => {
  const url = reqPath.startsWith("http") ? reqPath : `${BASE_URL}${reqPath}`;
  const init = { method, headers: { ...(headers || {}) } };

  if (token) {
    init.headers.Authorization = `Bearer ${token}`;
  }

  if (formData) {
    init.body = formData;
  } else if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const started = Date.now();
  const response = await fetch(url, init);
  const elapsedMs = Date.now() - started;
  const contentType = response.headers.get("content-type") || "";
  let parsedBody = null;

  if (contentType.includes("application/json")) {
    try {
      parsedBody = await response.json();
    } catch (err) {
      parsedBody = null;
    }
  } else {
    try {
      parsedBody = await response.text();
    } catch (err) {
      parsedBody = null;
    }
  }

  return {
    status: response.status,
    headers: response.headers,
    body: parsedBody,
    elapsedMs,
  };
};

const runTest = async ({ endpoint, method, testCase, expectedStatus, requestOptions, check }) => {
  try {
    const res = await request({ method, path: endpoint, ...requestOptions });
    const expectedStatusList = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
    const statusOk = expectedStatusList.includes(res.status);
    const checkOk = check ? check(res) : true;
    const pass = statusOk && checkOk;
    const actual = `status=${res.status} time=${res.elapsedMs}ms body=${summarizeBody(res.body)}`;
    record(endpoint, method, testCase, `${expectedStatusList.join("/")}`, actual, pass ? "PASS" : "FAIL");
    return res;
  } catch (err) {
    record(endpoint, method, testCase, `${expectedStatus}`, `error=${err.message}`, "FAIL");
    return null;
  }
};

const ensureAssetsExist = () => {
  if (!fs.existsSync(IMAGE_PATH) || !fs.existsSync(PDF_PATH)) {
    throw new Error("Missing upload assets. Ensure tmp_test_assets/test.png and test.pdf exist.");
  }
};

const makeFormData = (fields, files = []) => {
  const fd = new FormData();
  Object.entries(fields || {}).forEach(([key, value]) => {
    fd.append(key, value);
  });
  files.forEach((file) => {
    fd.append(file.field, file.blob, file.filename);
  });
  return fd;
};

const getTokens = async () => {
  const tokens = {};

  // Regular user login or signup
  let loginRes = await request({
    method: "POST",
    path: "/api/auth/login",
    body: { email: USER_EMAIL, password: USER_PASSWORD },
  });

  if (loginRes.status !== 200) {
    await request({
      method: "POST",
      path: "/api/auth/signup",
      body: {
        username: "qa-user",
        email: USER_EMAIL,
        password: USER_PASSWORD,
        phone: "9999999999",
      },
    });

    loginRes = await request({
      method: "POST",
      path: "/api/auth/login",
      body: { email: USER_EMAIL, password: USER_PASSWORD },
    });
  }

  tokens.user = loginRes.body && loginRes.body.token ? loginRes.body.token : null;

  const adminRes = await request({
    method: "POST",
    path: "/api/admin/login",
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });

  tokens.admin = adminRes.body && adminRes.body.token ? adminRes.body.token : null;

  tokens.expiredUser = jwt.sign({ user: { id: "expired-user" } }, JWT_SECRET, { expiresIn: -10 });
  tokens.expiredAdmin = jwt.sign({ id: "expired-admin", role: "admin" }, JWT_SECRET, { expiresIn: -10 });

  return tokens;
};

const authChecks = async (endpoint, method, role, tokens, requestOptions) => {
  const baseOptions = requestOptions || {};

  await runTest({
    endpoint,
    method,
    testCase: "AUTH CHECKS - no token",
    expectedStatus: 401,
    requestOptions: { ...baseOptions, token: null },
  });

  await runTest({
    endpoint,
    method,
    testCase: "AUTH CHECKS - expired token",
    expectedStatus: 401,
    requestOptions: { ...baseOptions, token: role === "admin" ? tokens.expiredAdmin : tokens.expiredUser },
  });

  await runTest({
    endpoint,
    method,
    testCase: "AUTH CHECKS - wrong role",
    expectedStatus: role === "admin" ? 403 : 401,
    requestOptions: { ...baseOptions, token: role === "admin" ? tokens.user : tokens.admin },
  });
};

const validationTests = async (endpoint, method, baseBody, requestOptions) => {
  await runTest({
    endpoint,
    method,
    testCase: "VALIDATION - missing required fields",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: {} },
  });

  await runTest({
    endpoint,
    method,
    testCase: "VALIDATION - wrong data types",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: { ...baseBody, name: 123, email: 456 } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "VALIDATION - empty strings",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: { ...baseBody, name: "", email: "", message: "" } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "VALIDATION - null values",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: { ...baseBody, name: null, email: null } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "VALIDATION - long strings",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: { ...baseBody, message: longString } },
  });
};

const edgeCaseTests = async (endpoint, method, baseBody, requestOptions) => {
  await runTest({
    endpoint,
    method,
    testCase: "EDGE - duplicate record",
    expectedStatus: 400,
    requestOptions: { ...requestOptions, body: baseBody },
  });

  await runTest({
    endpoint,
    method,
    testCase: "EDGE - special characters",
    expectedStatus: 200,
    requestOptions: { ...requestOptions, body: { ...baseBody, message: specialString } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "EDGE - unicode",
    expectedStatus: 200,
    requestOptions: { ...requestOptions, body: { ...baseBody, message: unicodeString } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "EDGE - SQL injection string",
    expectedStatus: 200,
    requestOptions: { ...requestOptions, body: { ...baseBody, message: sqlString } },
  });

  await runTest({
    endpoint,
    method,
    testCase: "EDGE - XSS payload",
    expectedStatus: 200,
    requestOptions: { ...requestOptions, body: { ...baseBody, message: xssString } },
  });
};

const paginationTests = async (endpoint, method, requestOptions) => {
  const queries = ["?page=0", "?page=-1", "?limit=0", "?limit=999999"];
  for (const query of queries) {
    await runTest({
      endpoint: `${endpoint}${query}`,
      method,
      testCase: `PAGINATION ${query}`,
      expectedStatus: 200,
      requestOptions,
    });
  }
};

const rateLimitTest = async (endpoint, method, requestOptions) => {
  const attempts = 110;
  const responses = [];
  for (let i = 0; i < attempts; i += 10) {
    const batch = Array.from({ length: Math.min(10, attempts - i) }, () =>
      request({ method, path: endpoint, ...requestOptions })
    );
    // eslint-disable-next-line no-await-in-loop
    const batchResults = await Promise.all(batch);
    responses.push(...batchResults);
    // eslint-disable-next-line no-await-in-loop
    await sleep(50);
  }

  const has429 = responses.some((res) => res.status === 429);
  const retryAfter = responses.find((res) => res.status === 429)?.headers?.get("retry-after");
  const actual = `status429=${has429} retry-after=${retryAfter || "none"}`;
  const pass = has429 && retryAfter;
  record(endpoint, method, "RATE LIMITING", "429 + retry-after", actual, pass ? "PASS" : "FAIL");
};

const main = async () => {
  ensureAssetsExist();

  const tokens = await getTokens();

  // Auth endpoints
  await runTest({
    endpoint: "/api/auth/signup",
    method: "POST",
    testCase: "HAPPY PATH - signup",
    expectedStatus: 201,
    requestOptions: {
      body: {
        username: `qa-user-${Date.now()}`,
        email: `qa-${Date.now()}@example.com`,
        password: USER_PASSWORD,
        phone: "8888888888",
      },
    },
    check: (res) => res.body && res.body.token,
  });

  await runTest({
    endpoint: "/api/auth/login",
    method: "POST",
    testCase: "HAPPY PATH - login",
    expectedStatus: 200,
    requestOptions: {
      body: { email: USER_EMAIL, password: USER_PASSWORD },
    },
    check: (res) => res.body && res.body.token,
  });

  await rateLimitTest("/api/auth/login", "POST", { body: { email: USER_EMAIL, password: USER_PASSWORD } });

  await runTest({
    endpoint: "/api/admin/login",
    method: "POST",
    testCase: "HAPPY PATH - admin login",
    expectedStatus: 200,
    requestOptions: {
      body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    },
    check: (res) => res.body && res.body.token,
  });

  // Contact
  const contactBody = {
    name: "QA Contact",
    email: "qa-contact@example.com",
    phone: "1234567890",
    message: "Hello from QA",
  };

  await runTest({
    endpoint: "/api/contact",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { body: contactBody },
  });
  await validationTests("/api/contact", "POST", contactBody, {});
  await edgeCaseTests("/api/contact", "POST", contactBody, {});
  await rateLimitTest("/api/contact", "POST", { body: {} });

  // Volunteer
  const volunteerBody = {
    name: "QA Volunteer",
    email: "qa-volunteer@example.com",
    message: "I want to help",
  };

  await runTest({
    endpoint: "/api/volunteer",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { body: volunteerBody },
  });
  await validationTests("/api/volunteer", "POST", volunteerBody, {});
  await edgeCaseTests("/api/volunteer", "POST", volunteerBody, {});
  await rateLimitTest("/api/volunteer", "POST", { body: {} });

  // Internship apply (multipart)
  const resumeBuffer = fs.readFileSync(PDF_PATH);
  const internshipForm = makeFormData(
    {
      fullName: "QA Intern",
      email: "qa-intern@example.com",
      phone: "1231231234",
      cityState: "QA City",
      college: "QA University",
      fieldOfStudy: "Computer Science",
      areasOfInterest: JSON.stringify(["Design", "Development"]),
      duration: "3 months",
      availability: "Full-time",
    },
    [{
      field: "resume",
      blob: new Blob([resumeBuffer], { type: "application/pdf" }),
      filename: "test.pdf",
    }]
  );

  await runTest({
    endpoint: "/api/internship/apply",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { formData: internshipForm },
  });
  await rateLimitTest("/api/internship/apply", "POST", { formData: internshipForm });

  // Contributions
  const contributionBody = {
    name: "QA Donor",
    email: "qa-donor@example.com",
    phone: "7777777777",
    message: "Interested in donating",
    types: ["Donation"],
  };

  await runTest({
    endpoint: "/api/contributions",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { body: contributionBody },
  });
  await validationTests("/api/contributions", "POST", contributionBody, {});
  await edgeCaseTests("/api/contributions", "POST", contributionBody, {});
  await rateLimitTest("/api/contributions", "POST", { body: {} });

  // Partnerships
  const partnershipBody = {
    organizationName: "QA Org",
    contactName: "QA Lead",
    email: "qa-partner@example.com",
    phone: "6666666666",
    location: "QA City",
    partnershipTypes: ["Sponsor"],
    offerDetails: "Offering support",
    duration: "6 months",
    capacity: "10 volunteers",
  };

  await runTest({
    endpoint: "/api/partnerships",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { body: partnershipBody },
  });
  await validationTests("/api/partnerships", "POST", partnershipBody, {});
  await edgeCaseTests("/api/partnerships", "POST", partnershipBody, {});
  await rateLimitTest("/api/partnerships", "POST", { body: {} });

  // Certificates (user)
  const certBody = {
    userName: "QA User",
    email: USER_EMAIL,
    certificateType: "Volunteer",
    description: "QA request",
  };

  const certCreateRes = await runTest({
    endpoint: "/api/certificates/request",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { body: certBody, token: tokens.user },
  });

  await authChecks("/api/certificates/request", "POST", "user", tokens, { body: certBody });
  await validationTests("/api/certificates/request", "POST", certBody, { token: tokens.user });
  await edgeCaseTests("/api/certificates/request", "POST", certBody, { token: tokens.user });

  await runTest({
    endpoint: "/api/certificates/my-requests",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.user },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/certificates/my-requests", "GET", "user", tokens, {});
  await paginationTests("/api/certificates/my-requests", "GET", { token: tokens.user });
  await rateLimitTest("/api/certificates/my-requests", "GET", { token: tokens.user });

  // Admin certificates
  await runTest({
    endpoint: "/api/admin/certificates",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/certificates", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/certificates", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/certificates", "GET", { token: tokens.admin });

  const certId = certCreateRes && certCreateRes.body && certCreateRes.body.data ? certCreateRes.body.data._id : null;

  if (certId) {
    await runTest({
      endpoint: `/api/admin/certificates/${certId}/status`,
      method: "PATCH",
      testCase: "HAPPY PATH - approve",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin, body: { status: "approved" } },
    });
    await authChecks(`/api/admin/certificates/${certId}/status`, "PATCH", "admin", tokens, {
      body: { status: "approved" },
    });

    await runTest({
      endpoint: `/api/admin/certificates/${certId}`,
      method: "DELETE",
      testCase: "HAPPY PATH - delete",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin },
    });
    await authChecks(`/api/admin/certificates/${certId}`, "DELETE", "admin", tokens, {});
  }

  // Drives
  await runTest({
    endpoint: "/api/drives/public",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
    check: (res) => Array.isArray(res.body),
  });
  await runTest({
    endpoint: "/api/drives/latest",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
  });
  await paginationTests("/api/drives/public", "GET", {});
  await rateLimitTest("/api/drives/public", "GET", {});

  await runTest({
    endpoint: "/api/admin/drives",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/drives", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/drives", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/drives", "GET", { token: tokens.admin });

  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  const driveForm = makeFormData(
    {
      category: "QA Drive",
      location: "QA City",
      description: "QA drive description",
      dateTime: new Date().toISOString(),
    },
    [{
      field: "image",
      blob: new Blob([imageBuffer], { type: "image/png" }),
      filename: "test.png",
    }]
  );

  const driveCreateRes = await runTest({
    endpoint: "/api/admin/drives",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { token: tokens.admin, formData: driveForm },
  });
  await authChecks("/api/admin/drives", "POST", "admin", tokens, { formData: driveForm });

  const driveId = driveCreateRes && driveCreateRes.body ? driveCreateRes.body._id : null;
  if (driveId) {
    await runTest({
      endpoint: `/api/admin/drives/toggle/${driveId}`,
      method: "PUT",
      testCase: "HAPPY PATH - toggle",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin },
    });
    await authChecks(`/api/admin/drives/toggle/${driveId}`, "PUT", "admin", tokens, {});

    await runTest({
      endpoint: `/api/admin/drives/${driveId}`,
      method: "DELETE",
      testCase: "HAPPY PATH - delete",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin },
    });
    await authChecks(`/api/admin/drives/${driveId}`, "DELETE", "admin", tokens, {});
  }

  // Images
  await runTest({
    endpoint: "/api/images",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
    check: (res) => Array.isArray(res.body),
  });
  await runTest({
    endpoint: "/api/images/placed",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
    check: (res) => Array.isArray(res.body),
  });
  await runTest({
    endpoint: "/api/images/placement/hero",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
    check: (res) => Array.isArray(res.body),
  });
  await paginationTests("/api/images", "GET", {});
  await rateLimitTest("/api/images", "GET", {});

  await runTest({
    endpoint: "/api/admin/images",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/images", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/images", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/images", "GET", { token: tokens.admin });

  const imageUploadForm = makeFormData({}, [
    {
      field: "images",
      blob: new Blob([imageBuffer], { type: "image/png" }),
      filename: "test.png",
    },
  ]);

  const imageUploadRes = await runTest({
    endpoint: "/api/admin/images",
    method: "POST",
    testCase: "HAPPY PATH",
    expectedStatus: 201,
    requestOptions: { token: tokens.admin, formData: imageUploadForm },
  });
  await authChecks("/api/admin/images", "POST", "admin", tokens, { formData: imageUploadForm });

  const imageId = Array.isArray(imageUploadRes?.body) ? imageUploadRes.body[0]?._id : null;
  if (imageId) {
    await runTest({
      endpoint: `/api/admin/images/${imageId}/placement`,
      method: "PATCH",
      testCase: "HAPPY PATH - placement",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin, body: { placement: "home:hero:1" } },
    });
    await authChecks(`/api/admin/images/${imageId}/placement`, "PATCH", "admin", tokens, {
      body: { placement: "home:hero:1" },
    });

    await runTest({
      endpoint: `/api/admin/images/${imageId}`,
      method: "DELETE",
      testCase: "HAPPY PATH - delete",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin },
    });
    await authChecks(`/api/admin/images/${imageId}`, "DELETE", "admin", tokens, {});
  }

  // Sections
  const sectionsRes = await runTest({
    endpoint: "/api/sections",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: {},
    check: (res) => Array.isArray(res.body),
  });
  await paginationTests("/api/sections", "GET", {});
  await rateLimitTest("/api/sections", "GET", {});

  const sectionId = Array.isArray(sectionsRes?.body) ? sectionsRes.body[0]?._id : null;
  if (sectionId) {
    await runTest({
      endpoint: `/api/sections/${sectionId}/toggle`,
      method: "PUT",
      testCase: "HAPPY PATH - toggle",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin },
    });
    await authChecks(`/api/sections/${sectionId}/toggle`, "PUT", "admin", tokens, {});

    await runTest({
      endpoint: `/api/sections/${sectionId}/move`,
      method: "PUT",
      testCase: "HAPPY PATH - move",
      expectedStatus: 200,
      requestOptions: { token: tokens.admin, body: { direction: "up" } },
    });
    await authChecks(`/api/sections/${sectionId}/move`, "PUT", "admin", tokens, {
      body: { direction: "up" },
    });
  }

  // Admin lists
  await runTest({
    endpoint: "/api/admin/internships",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/internships", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/internships", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/internships", "GET", { token: tokens.admin });

  await runTest({
    endpoint: "/api/admin/partnerships",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/partnerships", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/partnerships", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/partnerships", "GET", { token: tokens.admin });

  await runTest({
    endpoint: "/api/admin/contributions",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
    check: (res) => Array.isArray(res.body),
  });
  await authChecks("/api/admin/contributions", "GET", "admin", tokens, {});
  await paginationTests("/api/admin/contributions", "GET", { token: tokens.admin });
  await rateLimitTest("/api/admin/contributions", "GET", { token: tokens.admin });

  // Admin content
  await runTest({
    endpoint: "/api/admin/content",
    method: "GET",
    testCase: "HAPPY PATH",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
  });
  await authChecks("/api/admin/content", "GET", "admin", tokens, {});
  await rateLimitTest("/api/admin/content", "GET", { token: tokens.admin });

  await runTest({
    endpoint: "/api/admin/content/home:hero:tagline",
    method: "PUT",
    testCase: "HAPPY PATH - update",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin, body: { value: "QA update", type: "text" } },
  });
  await authChecks("/api/admin/content/home:hero:tagline", "PUT", "admin", tokens, {
    body: { value: "QA update", type: "text" },
  });

  await runTest({
    endpoint: "/api/admin/content/batch",
    method: "PUT",
    testCase: "HAPPY PATH - batch",
    expectedStatus: 200,
    requestOptions: {
      token: tokens.admin,
      body: {
        updates: [
          { contentKey: "home:hero:tagline", value: "QA batch update", type: "text" },
        ],
      },
    },
  });
  await authChecks("/api/admin/content/batch", "PUT", "admin", tokens, {
    body: { updates: [{ contentKey: "home:hero:tagline", value: "QA", type: "text" }] },
  });

  await runTest({
    endpoint: "/api/admin/content/reset",
    method: "POST",
    testCase: "HAPPY PATH - reset all",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
  });
  await authChecks("/api/admin/content/reset", "POST", "admin", tokens, {});

  await runTest({
    endpoint: "/api/admin/content/reset/home",
    method: "POST",
    testCase: "HAPPY PATH - reset page",
    expectedStatus: 200,
    requestOptions: { token: tokens.admin },
  });
  await authChecks("/api/admin/content/reset/home", "POST", "admin", tokens, {});

  // Response time flags
  for (const entry of results) {
    const match = entry.actual.match(/time=(\d+)ms/);
    if (match && Number(match[1]) > 2000) {
      entry.pass = "FAIL";
      entry.actual = `${entry.actual} (SLOW)`;
    }
  }

  const reportLines = [
    "endpoint name | method | test case | expected | actual | PASS/FAIL",
    "---|---|---|---|---|---",
    ...results.map((r) =>
      `${r.endpoint} | ${r.method} | ${r.testCase} | ${r.expected} | ${r.actual} | ${r.pass}`
    ),
  ];

  const reportPath = path.join(__dirname, "api-test-report.md");
  fs.writeFileSync(reportPath, reportLines.join("\n"));

  console.log(`Report written to ${reportPath}`);
};

main().catch((err) => {
  console.error("Test run failed:", err);
  process.exit(1);
});
