var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/_utils/auth.ts
async function verifyJWT(token, secret) {
  try {
    const [header, body, signature] = token.split(".");
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signatureBuffer = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      encoder.encode(`${header}.${body}`)
    );
    if (!isValid) {
      throw new Error("Invalid signature");
    }
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) {
      throw new Error("Token expired");
    }
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
__name(verifyJWT, "verifyJWT");
async function verifyAuth(request, env) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        error: "Authorization token required"
      };
    }
    const token = authHeader.substring(7);
    const payload = await verifyJWT(token, env.JWT_SECRET);
    const user = await env.DB.prepare(
      "SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?"
    ).bind(payload.userId).first();
    if (!user) {
      return {
        success: false,
        error: "User not found"
      };
    }
    return {
      success: true,
      user
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid or expired token"
    };
  }
}
__name(verifyAuth, "verifyAuth");

// api/images/admin/slideshow/all.ts
async function onRequestGet(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const images = await db.prepare(`
      SELECT * FROM slideshow_images
      ORDER BY sort_order, created_at
    `).all();
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get slideshow error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch slideshow images"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet, "onRequestGet");
async function onRequestPost(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const {
      title,
      desktop_url,
      mobile_url,
      cloudinary_public_id,
      sort_order = 0,
      is_active = true
    } = await request.json();
    if (!desktop_url || !mobile_url) {
      return new Response(JSON.stringify({
        success: false,
        error: "Desktop and mobile URLs are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await db.prepare(`
      INSERT INTO slideshow_images (
        title, desktop_url, mobile_url, cloudinary_public_id, sort_order, is_active
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      title || null,
      desktop_url,
      mobile_url,
      cloudinary_public_id || null,
      sort_order,
      is_active
    ).run();
    if (!result.success) {
      throw new Error("Failed to create slideshow image");
    }
    const image = await db.prepare("SELECT * FROM slideshow_images WHERE id = ?").bind(result.meta.last_row_id).first();
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Create slideshow image error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to create slideshow image"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");
async function onRequestPut(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(request.url);
    const imageId = url.pathname.split("/").pop();
    if (!imageId) {
      return new Response(JSON.stringify({
        success: false,
        error: "Image ID required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const updates = await request.json();
    const allowedFields = ["title", "desktop_url", "mobile_url", "sort_order", "is_active"];
    const updateFields = Object.keys(updates).filter((key) => allowedFields.includes(key));
    if (updateFields.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: "No valid fields to update"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const setClause = updateFields.map((field) => `${field} = ?`).join(", ");
    const values = updateFields.map((field) => updates[field]);
    values.push(imageId);
    const result = await db.prepare(`
      UPDATE slideshow_images 
      SET ${setClause}
      WHERE id = ?
    `).bind(...values).run();
    if (!result.success) {
      throw new Error("Failed to update slideshow image");
    }
    const image = await db.prepare("SELECT * FROM slideshow_images WHERE id = ?").bind(imageId).first();
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Update slideshow image error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to update slideshow image"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPut, "onRequestPut");
async function onRequestDelete(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(request.url);
    const imageId = url.pathname.split("/").pop();
    if (!imageId) {
      return new Response(JSON.stringify({
        success: false,
        error: "Image ID required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await db.prepare("DELETE FROM slideshow_images WHERE id = ?").bind(imageId).run();
    if (!result.success) {
      throw new Error("Failed to delete slideshow image");
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Slideshow image deleted successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Delete slideshow image error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to delete slideshow image"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestDelete, "onRequestDelete");

// api/albums/admin/all.ts
async function onRequestGet2(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const albums = await db.prepare(`
      SELECT a.*, COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id
      GROUP BY a.id
      ORDER BY a.region, a.sort_order, a.country
    `).all();
    return new Response(JSON.stringify({
      success: true,
      albums: albums.results || []
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get albums error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch albums"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet2, "onRequestGet");
async function onRequestPost2(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { region, country, slug, description, is_published = true, sort_order = 0 } = await request.json();
    if (!region || !country || !slug) {
      return new Response(JSON.stringify({
        success: false,
        error: "Region, country, and slug are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await db.prepare(`
      INSERT INTO albums (region, country, slug, description, is_published, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(region, country, slug, description || null, is_published, sort_order).run();
    if (!result.success) {
      throw new Error("Failed to create album");
    }
    const album = await db.prepare("SELECT * FROM albums WHERE id = ?").bind(result.meta.last_row_id).first();
    return new Response(JSON.stringify({
      success: true,
      album
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Create album error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to create album"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost2, "onRequestPost");

// api/images/admin/all.ts
async function onRequestGet3(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(request.url);
    const albumId = url.searchParams.get("album_id");
    let query = `
      SELECT i.*, a.country, a.region 
      FROM images i
      LEFT JOIN albums a ON i.album_id = a.id
    `;
    const params = [];
    if (albumId) {
      query += " WHERE i.album_id = ?";
      params.push(albumId);
    }
    query += " ORDER BY i.sort_order, i.created_at DESC";
    const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query);
    const images = await stmt.all();
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Get images error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch images"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet3, "onRequestGet");
async function onRequestPost3(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const {
      album_id,
      title,
      description,
      desktop_url,
      mobile_url,
      cloudinary_public_id,
      is_published = true,
      sort_order = 0
    } = await request.json();
    if (!desktop_url || !mobile_url) {
      return new Response(JSON.stringify({
        success: false,
        error: "Desktop and mobile URLs are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const result = await db.prepare(`
      INSERT INTO images (
        album_id, title, description, desktop_url, mobile_url, 
        cloudinary_public_id, is_published, sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      album_id || null,
      title || null,
      description || null,
      desktop_url,
      mobile_url,
      cloudinary_public_id || null,
      is_published,
      sort_order
    ).run();
    if (!result.success) {
      throw new Error("Failed to create image record");
    }
    const image = await db.prepare("SELECT * FROM images WHERE id = ?").bind(result.meta.last_row_id).first();
    return new Response(JSON.stringify({
      success: true,
      image
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Create image error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to create image"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost3, "onRequestPost");

// api/public/albums/[slug].ts
async function onRequestGet4(context) {
  const { params, env } = context;
  const db = env.DB;
  const slug = params.slug;
  try {
    const album = await db.prepare(`
      SELECT a.*, COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id AND i.is_published = 1
      WHERE a.slug = ? AND a.is_published = 1
      GROUP BY a.id
    `).bind(slug).first();
    if (!album) {
      return new Response(JSON.stringify({
        success: false,
        error: "Album not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const images = await db.prepare(`
      SELECT id, title, description, desktop_url, mobile_url, sort_order
      FROM images 
      WHERE album_id = ? AND is_published = 1
      ORDER BY sort_order, created_at
    `).bind(album.id).all();
    return new Response(JSON.stringify({
      success: true,
      album: {
        ...album,
        images: images.results || []
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Get album by slug error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch album"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet4, "onRequestGet");

// ../src/lib/database.ts
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hashPassword, "hashPassword");

// api/auth/change-password.ts
async function onRequestPost4(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({
        success: false,
        error: "Current password and new password are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (newPassword.length < 8) {
      return new Response(JSON.stringify({
        success: false,
        error: "New password must be at least 8 characters long"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await db.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).bind(authResult.user.id).first();
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: "User not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const currentPasswordHash = await hashPassword(currentPassword);
    if (currentPasswordHash !== user.password_hash) {
      return new Response(JSON.stringify({
        success: false,
        error: "Current password is incorrect"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const newPasswordHash = await hashPassword(newPassword);
    const result = await db.prepare(
      "UPDATE users SET password_hash = ? WHERE id = ?"
    ).bind(newPasswordHash, authResult.user.id).run();
    if (!result.success) {
      throw new Error("Failed to update password");
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Password changed successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Change password error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to change password"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost4, "onRequestPost");

// api/auth/login.ts
async function signJWT(payload, secret) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1e3 }));
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${header}.${body}`));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${header}.${body}.${signatureB64}`;
}
__name(signJWT, "signJWT");
async function onRequestPost5(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: "Username and password are required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await db.prepare(
      "SELECT * FROM users WHERE username = ? OR email = ?"
    ).bind(username, username).first();
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid credentials"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const hashedInput = await hashPassword(password);
    if (hashedInput !== user.password_hash) {
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid credentials"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = await signJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    }, env.JWT_SECRET);
    const { password_hash, ...userData } = user;
    return new Response(JSON.stringify({
      success: true,
      token,
      user: userData
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost5, "onRequestPost");

// api/auth/verify.ts
async function verifyJWT2(token, secret) {
  try {
    const [header, body, signature] = token.split(".");
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signatureBuffer = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      encoder.encode(`${header}.${body}`)
    );
    if (!isValid) {
      throw new Error("Invalid signature");
    }
    const payload = JSON.parse(atob(body));
    if (payload.exp < Date.now()) {
      throw new Error("Token expired");
    }
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
__name(verifyJWT2, "verifyJWT");
async function onRequestPost6(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({
        success: false,
        error: "Authorization token required"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = authHeader.substring(7);
    const payload = await verifyJWT2(token, env.JWT_SECRET);
    const user = await db.prepare(
      "SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?"
    ).bind(payload.userId).first();
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: "User not found"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      user
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Invalid or expired token"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost6, "onRequestPost");

// api/images/upload.ts
async function generateSignature(params, apiSecret) {
  const sortedParams = Object.keys(params).sort().map((key) => `${key}=${params[key]}`).join("&");
  const stringToSign = sortedParams + apiSecret;
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateSignature, "generateSignature");
async function onRequestPost7(context) {
  const { request, env } = context;
  const db = env.DB;
  try {
    const authResult = await verifyAuth(request, env);
    if (!authResult.success) {
      return new Response(JSON.stringify(authResult), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const formData = await request.formData();
    const file = formData.get("file");
    const albumId = formData.get("album_id");
    const title = formData.get("title");
    const description = formData.get("description");
    const folder = formData.get("folder") || "portfolio";
    if (!file) {
      return new Response(JSON.stringify({
        success: false,
        error: "No file provided"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!file.type.startsWith("image/")) {
      return new Response(JSON.stringify({
        success: false,
        error: "File must be an image"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataURI = `data:${file.type};base64,${base64String}`;
    const timestamp = Math.floor(Date.now() / 1e3);
    const params = {
      timestamp,
      folder,
      transformation: "c_limit,w_2000,h_2000,q_auto:good"
    };
    const signature = await generateSignature(params, env.CLOUDINARY_API_SECRET);
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", dataURI);
    cloudinaryFormData.append("api_key", env.CLOUDINARY_API_KEY);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("folder", folder);
    cloudinaryFormData.append("transformation", "c_limit,w_2000,h_2000,q_auto:good");
    cloudinaryFormData.append("signature", signature);
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData
      }
    );
    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.text();
      console.error("Cloudinary upload failed:", errorData);
      throw new Error("Failed to upload image to Cloudinary");
    }
    const cloudinaryResult = await cloudinaryResponse.json();
    const desktopUrl = cloudinaryResult.secure_url;
    const mobileUrl = desktopUrl.replace("/upload/", "/upload/c_limit,w_800,h_800,q_auto:good/");
    const imageResult = await db.prepare(`
      INSERT INTO images (
        album_id, title, description, desktop_url, mobile_url, 
        cloudinary_public_id, is_published, sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      albumId || null,
      title || file.name,
      description || null,
      desktopUrl,
      mobileUrl,
      cloudinaryResult.public_id,
      true,
      0
    ).run();
    if (!imageResult.success) {
      throw new Error("Failed to save image to database");
    }
    const image = await db.prepare("SELECT * FROM images WHERE id = ?").bind(imageResult.meta.last_row_id).first();
    return new Response(JSON.stringify({
      success: true,
      image,
      cloudinary: cloudinaryResult
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to upload image"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost7, "onRequestPost");

// api/public/albums.ts
async function onRequestGet5(context) {
  const { env } = context;
  const db = env.DB;
  try {
    const albums = await db.prepare(`
      SELECT 
        a.id, a.region, a.country, a.slug, a.description, a.sort_order,
        COUNT(i.id) as image_count
      FROM albums a
      LEFT JOIN images i ON a.id = i.album_id AND i.is_published = 1
      WHERE a.is_published = 1
      GROUP BY a.id
      ORDER BY a.region, a.sort_order, a.country
    `).all();
    return new Response(JSON.stringify({
      success: true,
      albums: albums.results || []
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Get public albums error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch albums"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet5, "onRequestGet");

// api/public/slideshow.ts
async function onRequestGet6(context) {
  const { env } = context;
  const db = env.DB;
  try {
    const images = await db.prepare(`
      SELECT id, title, desktop_url, mobile_url, sort_order
      FROM slideshow_images
      WHERE is_active = 1
      ORDER BY sort_order, created_at
    `).all();
    return new Response(JSON.stringify({
      success: true,
      images: images.results || []
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Get slideshow error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch slideshow images"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet6, "onRequestGet");

// ../.wrangler/tmp/pages-c0R29k/functionsRoutes-0.5548903784734924.mjs
var routes = [
  {
    routePath: "/api/images/admin/slideshow/all",
    mountPath: "/api/images/admin/slideshow",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/images/admin/slideshow/all",
    mountPath: "/api/images/admin/slideshow",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/images/admin/slideshow/all",
    mountPath: "/api/images/admin/slideshow",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/images/admin/slideshow/all",
    mountPath: "/api/images/admin/slideshow",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut]
  },
  {
    routePath: "/api/albums/admin/all",
    mountPath: "/api/albums/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/albums/admin/all",
    mountPath: "/api/albums/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/images/admin/all",
    mountPath: "/api/images/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/images/admin/all",
    mountPath: "/api/images/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/public/albums/:slug",
    mountPath: "/api/public/albums",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/auth/change-password",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/auth/login",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/auth/verify",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/images/upload",
    mountPath: "/api/images",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost7]
  },
  {
    routePath: "/api/public/albums",
    mountPath: "/api/public",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  },
  {
    routePath: "/api/public/slideshow",
    mountPath: "/api/public",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet6]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
