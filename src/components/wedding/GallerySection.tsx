import { useState, useEffect, useCallback } from "react";
import { Heart, Download, MessageCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo, CommentItem, Translations } from "@/data/wedding-data";
import { photos, API_BASE } from "@/data/wedding-data";

interface GallerySectionProps {
  t: Translations;
}

export default function GallerySection({ t }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likesByPhoto, setLikesByPhoto] = useState<Record<number, number>>({});
  const [commentsByPhoto, setCommentsByPhoto] = useState<Record<number, CommentItem[]>>({});
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [sendingLike, setSendingLike] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    void loadLikes();
    void loadComments(currentPhoto.id);
  }, []);

  useEffect(() => {
    void loadComments(currentPhoto.id);
  }, [currentPhoto.id]);

  async function loadLikes() {
    try {
      const res = await fetch(`${API_BASE}/likes`);
      if (!res.ok) return;
      const data: { photo_id: number; total: number }[] = await res.json();
      const mapped: Record<number, number> = {};
      data.forEach((item) => { mapped[item.photo_id] = item.total; });
      setLikesByPhoto(mapped);
    } catch { /* silently fail for demo */ }
  }

  async function loadComments(photoId: number) {
    try {
      const res = await fetch(`${API_BASE}/comments/${photoId}`);
      if (!res.ok) return;
      const data: CommentItem[] = await res.json();
      setCommentsByPhoto((prev) => ({ ...prev, [photoId]: data }));
    } catch { /* silently fail for demo */ }
  }

  async function handleLike(photoId: number) {
    try {
      setSendingLike(true);
      setHeartAnimating(true);
      setTimeout(() => setHeartAnimating(false), 400);
      const res = await fetch(`${API_BASE}/like/${photoId}`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data: { total_likes: number } = await res.json();
      setLikesByPhoto((prev) => ({ ...prev, [photoId]: data.total_likes }));
    } catch {
      // For demo, increment locally
      setLikesByPhoto((prev) => ({ ...prev, [photoId]: (prev[photoId] || 0) + 1 }));
    } finally {
      setSendingLike(false);
    }
  }

  async function handleCommentSubmit(photoId: number, e: React.FormEvent) {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;
    try {
      setSubmittingComment(true);
      await fetch(`${API_BASE}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo_id: photoId, name: commentName.trim(), message: commentMessage.trim() }),
      });
      setCommentName("");
      setCommentMessage("");
      await loadComments(photoId);
    } catch {
      // For demo, add locally
      const newComment: CommentItem = {
        id: Date.now(),
        photo_id: photoId,
        name: commentName.trim(),
        message: commentMessage.trim(),
        created_at: new Date().toISOString(),
      };
      setCommentsByPhoto((prev) => ({
        ...prev,
        [photoId]: [...(prev[photoId] || []), newComment],
      }));
      setCommentName("");
      setCommentMessage("");
    } finally {
      setSubmittingComment(false);
    }
  }

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") setIsModalOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, nextPhoto, prevPhoto]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Justo ahora";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Hace ${diffH}h`;
    return date.toLocaleDateString();
  }

  return (
    <>
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-center mb-16">
            {t.galleryTitle}
          </h2>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.98 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer image-outline group"
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || `Photo ${photo.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-background rounded-3xl shadow-elevated max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="relative flex-1 min-h-[300px] md:min-h-0 bg-muted/30 flex items-center justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/90 shadow-paper p-2 transition-transform duration-200 hover:-translate-y-px active:scale-95"
                  aria-label={t.close}
                >
                  <X size={16} strokeWidth={1.5} />
                </button>

                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 shadow-paper p-2 transition-transform duration-200 hover:-translate-y-px active:scale-95"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 shadow-paper p-2 transition-transform duration-200 hover:-translate-y-px active:scale-95 md:right-3"
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>

                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.alt || ""}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh]"
                />
              </div>

              {/* Sidebar */}
              <aside className="w-full md:w-[340px] flex flex-col border-t md:border-t-0 md:border-l border-border/50">
                {/* Actions */}
                <div className="flex items-center gap-3 p-5 border-b border-border/50">
                  <Button
                    onClick={() => handleLike(currentPhoto.id)}
                    disabled={sendingLike}
                    variant="ghost"
                    size="sm"
                    className="font-ui text-xs gap-1.5"
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.5}
                      className={`transition-transform ${heartAnimating ? "animate-heart-pop" : ""}`}
                      fill={likesByPhoto[currentPhoto.id] ? "hsl(var(--foreground))" : "none"}
                    />
                    <span className="tabular-nums">{likesByPhoto[currentPhoto.id] || 0}</span>
                  </Button>

                  <a
                    href={currentPhoto.download_url || currentPhoto.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm" className="font-ui text-xs gap-1.5">
                      <Download size={16} strokeWidth={1.5} />
                      {t.download}
                    </Button>
                  </a>
                </div>

                {/* Comments */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <p className="font-display text-sm font-medium">{t.comments}</p>

                  {(commentsByPhoto[currentPhoto.id] || []).length === 0 ? (
                    <p className="font-body text-sm text-muted-foreground">{t.noComments}</p>
                  ) : (
                    commentsByPhoto[currentPhoto.id].map((item) => (
                      <div key={item.id} className="rounded-2xl bg-muted/30 p-4 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-display text-sm font-medium">{item.name}</p>
                          <p className="font-ui text-[10px] text-muted-foreground tabular-nums">
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                        <p className="font-body text-sm text-foreground">{item.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment form */}
                <form
                  onSubmit={(e) => handleCommentSubmit(currentPhoto.id, e)}
                  className="p-5 border-t border-border/50 space-y-3"
                >
                  <input
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl bg-muted/30 px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                  <textarea
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    rows={3}
                    className="w-full rounded-xl bg-muted/30 px-4 py-3 font-body text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    disabled={submittingComment}
                    size="sm"
                    className="w-full font-ui text-xs"
                  >
                    {t.send}
                  </Button>
                </form>
              </aside>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
