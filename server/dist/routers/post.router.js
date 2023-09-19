import { Router } from 'express';
import BlogPostController from '../controllers/blogPost.controller.js';
import { upload } from '../middleware/upload_file.middleware.js';
import { protectMiddleware } from '../middleware/protect.middleware.js';
import authAdmin from '../middleware/auth_admin.middleware.js';
const router = Router();
router
    .post('/blog-post', protectMiddleware, authAdmin, upload.single('image'), BlogPostController.createBlogPost)
    .get('/blog-post', BlogPostController.fetchBlogs)
    .post('/blog-post/:id', BlogPostController.fetchSpecificBlogs);
export default router;
//# sourceMappingURL=post.router.js.map