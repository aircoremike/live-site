# Materials Modal System

This directory contains the HTML files and individual CSS stylesheets for each material modal on the materials page.

## CSS Architecture

The modal system uses a modular CSS architecture:

- **`base-modal.css`**: Contains all shared modal styles (animations, layout, common elements)
- **Individual modal CSS files**: Each material has its own CSS file for distinct styling
  - `stainless.css` - Stainless Steel modal styles
  - `titanium.css` - Titanium modal styles
  - `copper.css` - Copper modal styles
  - `nickel.css` - Nickel Alloy modal styles
  - `tungsten.css` - Tungsten modal styles
  - `hccr.css` - High Carbon Chrome modal styles

Each individual CSS file imports the base styles and adds material-specific customizations:

```css
/* Import base modal styles */
@import url('base-modal.css');

/* Material-specific styling */
#material-modal {
  --material-primary: #color;
  /* Custom styles... */
}
```

## Adding a New Material

To add a new material modal:

1. **Create the modal HTML file** in this `modals/` directory:
   ```html
   <!-- New Material Modal -->
   <link rel="stylesheet" href="modals/newmaterial.css">
   <div id="newmaterial-modal" class="modal-overlay" data-material="newmaterial">
     <div class="modal-container">
       <div class="modal-header">
         <h1>New Material Name</h1>
       </div>
       <div class="modal-content">
         <div class="modal-hero">
           <img src="assets/newmaterial.png" alt="New Material" class="modal-hero-image">
         </div>
         <div class="modal-body">
           <div class="modal-images">
             <div class="modal-image-item">
               <img src="assets/application1.jpg" alt="New Material application">
             </div>
             <!-- Add more images as needed -->
           </div>
           <div class="modal-description">
             <p>Description of the new material...</p>
           </div>
         </div>
       </div>
     </div>
   </div>
   ```

2. **Create the material-specific CSS file** `newmaterial.css`:
   ```css
   /* =====================
      New Material Modal Styles
      Specific styling for the new material modal
      ===================== */

   /* Import base modal styles */
   @import url('base-modal.css');

   /* New Material specific colors and styling */
   #newmaterial-modal {
     --newmaterial-primary: #your-color;
     --newmaterial-secondary: #your-secondary-color;
     --newmaterial-accent: #your-accent-color;
   }

   /* Custom styling for your material */
   #newmaterial-modal .modal-header {
     background: linear-gradient(135deg, #color1 0%, #color2 100%);
   }

   #newmaterial-modal .modal-hero {
     background: linear-gradient(45deg, #color1 0%, #color2 100%);
   }
   ```

3. **Add the material to the configuration** in `materials-config.js`:
   ```javascript
   {
     id: 'newmaterial',
     name: 'New Material Name',
     modalFile: 'newmaterial-modal.html'
   }
   ```

4. **Add a carousel slide** in `materials.html` with the appropriate button:
   ```html
   <div class="carousel-slide" data-slide="X">
     <div class="slide-content">
       <div class="slide-text">
         <div class="slide-title">
           <h2>New Material Name</h2>
         </div>
         <div class="slide-desc">
           <p>Brief description...</p>
           <button class="learn-more-btn" data-material="newmaterial">Learn More</button>
         </div>
       </div>
       <div class="slide-image">
         <img src="assets/newmaterial.png" alt="New Material">
       </div>
     </div>
   </div>
   ```

5. **Add the material image** to the `assets/` directory.

The system will automatically load the new modal and wire up the functionality.

## File Structure

```
modals/
├── README.md
├── base-modal.css          (Shared modal styles)
├── stainless-modal.html    (Stainless Steel modal HTML)
├── stainless.css           (Stainless Steel specific styles)
├── titanium-modal.html     (Titanium modal HTML)
├── titanium.css            (Titanium specific styles)
├── copper-modal.html       (Copper modal HTML)
├── copper.css              (Copper specific styles)
├── nickel-modal.html       (Nickel Alloy modal HTML)
├── nickel.css              (Nickel Alloy specific styles)
├── tungsten-modal.html     (Tungsten modal HTML)
├── tungsten.css            (Tungsten specific styles)
├── hccr-modal.html         (High Carbon Chrome modal HTML)
└── hccr.css                (High Carbon Chrome specific styles)
```

## Benefits

- **SEO-friendly**: Modal content is in HTML and loaded with the page
- **Modular**: Each material has its own HTML and CSS files
- **Scalable**: Easy to add new materials
- **Maintainable**: Content and styles are separated from JavaScript logic
- **Search-friendly**: All content is crawlable by search engines
- **Distinct styling**: Each modal can have unique visual identity
- **Performance**: Only loads the CSS needed for each specific modal

