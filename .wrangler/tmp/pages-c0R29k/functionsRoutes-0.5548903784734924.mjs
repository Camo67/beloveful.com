import { onRequestDelete as __api_images_admin_slideshow_all_ts_onRequestDelete } from "/home/camo/new/beloveful.com/functions/api/images/admin/slideshow/all.ts"
import { onRequestGet as __api_images_admin_slideshow_all_ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/images/admin/slideshow/all.ts"
import { onRequestPost as __api_images_admin_slideshow_all_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/images/admin/slideshow/all.ts"
import { onRequestPut as __api_images_admin_slideshow_all_ts_onRequestPut } from "/home/camo/new/beloveful.com/functions/api/images/admin/slideshow/all.ts"
import { onRequestGet as __api_albums_admin_all_ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/albums/admin/all.ts"
import { onRequestPost as __api_albums_admin_all_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/albums/admin/all.ts"
import { onRequestGet as __api_images_admin_all_ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/images/admin/all.ts"
import { onRequestPost as __api_images_admin_all_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/images/admin/all.ts"
import { onRequestGet as __api_public_albums__slug__ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/public/albums/[slug].ts"
import { onRequestPost as __api_auth_change_password_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/auth/change-password.ts"
import { onRequestPost as __api_auth_login_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/auth/login.ts"
import { onRequestPost as __api_auth_verify_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/auth/verify.ts"
import { onRequestPost as __api_images_upload_ts_onRequestPost } from "/home/camo/new/beloveful.com/functions/api/images/upload.ts"
import { onRequestGet as __api_public_albums_ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/public/albums.ts"
import { onRequestGet as __api_public_slideshow_ts_onRequestGet } from "/home/camo/new/beloveful.com/functions/api/public/slideshow.ts"

export const routes = [
    {
      routePath: "/api/images/admin/slideshow/all",
      mountPath: "/api/images/admin/slideshow",
      method: "DELETE",
      middlewares: [],
      modules: [__api_images_admin_slideshow_all_ts_onRequestDelete],
    },
  {
      routePath: "/api/images/admin/slideshow/all",
      mountPath: "/api/images/admin/slideshow",
      method: "GET",
      middlewares: [],
      modules: [__api_images_admin_slideshow_all_ts_onRequestGet],
    },
  {
      routePath: "/api/images/admin/slideshow/all",
      mountPath: "/api/images/admin/slideshow",
      method: "POST",
      middlewares: [],
      modules: [__api_images_admin_slideshow_all_ts_onRequestPost],
    },
  {
      routePath: "/api/images/admin/slideshow/all",
      mountPath: "/api/images/admin/slideshow",
      method: "PUT",
      middlewares: [],
      modules: [__api_images_admin_slideshow_all_ts_onRequestPut],
    },
  {
      routePath: "/api/albums/admin/all",
      mountPath: "/api/albums/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_albums_admin_all_ts_onRequestGet],
    },
  {
      routePath: "/api/albums/admin/all",
      mountPath: "/api/albums/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_albums_admin_all_ts_onRequestPost],
    },
  {
      routePath: "/api/images/admin/all",
      mountPath: "/api/images/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_images_admin_all_ts_onRequestGet],
    },
  {
      routePath: "/api/images/admin/all",
      mountPath: "/api/images/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_images_admin_all_ts_onRequestPost],
    },
  {
      routePath: "/api/public/albums/:slug",
      mountPath: "/api/public/albums",
      method: "GET",
      middlewares: [],
      modules: [__api_public_albums__slug__ts_onRequestGet],
    },
  {
      routePath: "/api/auth/change-password",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_change_password_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/verify",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_verify_ts_onRequestPost],
    },
  {
      routePath: "/api/images/upload",
      mountPath: "/api/images",
      method: "POST",
      middlewares: [],
      modules: [__api_images_upload_ts_onRequestPost],
    },
  {
      routePath: "/api/public/albums",
      mountPath: "/api/public",
      method: "GET",
      middlewares: [],
      modules: [__api_public_albums_ts_onRequestGet],
    },
  {
      routePath: "/api/public/slideshow",
      mountPath: "/api/public",
      method: "GET",
      middlewares: [],
      modules: [__api_public_slideshow_ts_onRequestGet],
    },
  ]