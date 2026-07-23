# Quick Reference: Managing Experience Images

## Adding Images to Existing Experience

### Step 1: Add Image File
Place your image in the appropriate folder:
```
public/experiances/[Experience Folder Name]/your-new-image.jpg
```

### Step 2: Update IMAGE_INVENTORY
Open `src/data/experiences.js` and find the `IMAGE_INVENTORY` object:

```javascript
const IMAGE_INVENTORY = {
  "Your Experience Folder": [
    "thumbnail.jpg",           // ← Always keep this
    "existing-image-1.jpg",
    "existing-image-2.jpg",
    "your-new-image.jpg",      // ← Add your new image here
  ],
  // ... other experiences
};
```

### Step 3: Rebuild
```bash
npm run build
```

**Done!** Your new image will automatically appear in the gallery.

---

## Experience Folder Reference

| Experience Slug | Public Folder Name |
|----------------|-------------------|
| `jaipur-at-dawn` | `Jaipur at down` |
| `ridge-and-ramparts` | `Ridge and ramparts` |
| `cosmic-imperial-triad` | `The Cosmic & Imperial Triad` |
| `the-blue-hour` | `The blue hour` |
| `beyond-the-pink` | `Beyond the pink` |
| `farm-and-fire` | `Farm and fire` |
| `living-walled-city` | `The living walled city` |
| `the-lost-kingdom` | `The lost kingdom` |
| `artisans-jaipur` | `the artisian jaipur` |

---

## Replacing Thumbnail

### Important Notes
- Thumbnail MUST be named `thumbnail.jpg`
- Thumbnail is used for both hero image and card image
- If thumbnail is missing, fallback placeholder is used

### To Replace:
1. Delete or rename old thumbnail:
   ```
   public/experiances/[Folder]/thumbnail.jpg
   ```

2. Add new thumbnail with exact name `thumbnail.jpg`

3. Rebuild:
   ```bash
   npm run build
   ```

---

## Supported Image Formats

✅ `.jpg` / `.jpeg`  
✅ `.png`  
✅ `.webp`  

**Recommended**:
- Format: `.jpg` for photos
- Size: 1200px wide minimum
- Quality: 80-90%
- File size: < 500KB per image

---

## Troubleshooting

### Image Not Showing
1. ✅ Check file exists in correct folder
2. ✅ Check exact filename in `IMAGE_INVENTORY`
3. ✅ Rebuild project: `npm run build`
4. ✅ Clear browser cache
5. ✅ Check browser console for errors

### Thumbnail Missing
- Fallback: `/images/placeholder.jpg` is used automatically
- Console warning will appear during build
- Check: `public/experiances/[Folder]/thumbnail.jpg` exists

### Gallery Empty
- Check: `IMAGE_INVENTORY` has images listed (besides thumbnail.jpg)
- Check: Image files actually exist in folder
- Gallery excludes thumbnail automatically

---

## Quick Commands

```bash
# Build project
npm run build

# Start dev server
npm run dev

# Check for errors
npm run build -- --debug
```

---

## File Locations

```
📁 Project Root
├── 📁 public/
│   ├── 📁 experiances/          ← Your image folders here
│   │   ├── 📁 Experience Name/
│   │   │   ├── thumbnail.jpg    ← Required
│   │   │   └── other-images.jpg
│   └── 📁 images/
│       └── placeholder.jpg       ← Fallback image
│
└── 📁 src/
    └── 📁 data/
        └── experiences.js        ← Update IMAGE_INVENTORY here
```

---

## Need Help?

📖 Full documentation:
- `IMAGE_STRUCTURE_UPDATE.md` - Complete guide
- `UPDATE_SUMMARY.md` - Overview of all changes

💡 Common tasks:
- Adding images: See "Step 1-3" above
- New experience: See `IMAGE_STRUCTURE_UPDATE.md` section "For New Experience"
- Troubleshooting: See "Troubleshooting" section above
