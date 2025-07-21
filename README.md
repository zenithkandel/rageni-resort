# ✨ Rageni Agro Resort Pvt. Ltd. - Digital Ecosystem ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white)](https://fonts.google.com/)
[![TailwindCSS (Coming Soon)](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Project Overview

Frontend web presence for Rageni Agro Resort Pvt. Ltd.: core site, unit pages, admin dashboard. Focus: clean design, responsiveness, interactive features.

## 🚀 Key Components & Features

The digital ecosystem comprises:

### 1. Main Website: Rageni Agro Resort (`index.html`)

* **Content Sections:** Hero, About, Services, Contact.

* **Design:**

    * Responsive Layout.

    * Parallax Hero Effect.

    * Scroll Animations: `fadeInUp`, `fadeInLeft`, `fadeInRight` (0.8s ease).

* **Forms:** General contact form.

### 2. Event & Hospitality Hub: The Silver Palace (`silver_palace.html`)

* **Features:**

    * Dynamic Image Gallery (Lightbox).

    * Interactive Event Calendar.

    * Booking Form.

* **Contact:**

    * "Show More Numbers" Toggle.

    * Button Color: `#afbbeb`.

    * Button Hover: `#7b96c8`.

* **Location:** Google Map iframe in footer.

### 3. Liquor Supply Partner: KG Suppliers (`kg_suppliers.html`)

* **Functionality:** Ordering form.

    * Fields: Liquor Name, Quantity, Phone, Additional Info.

* **Color Theme:**

    * Primary: `#1A3A5A` (Deep Blue)

    * Secondary: `#4A6B8C` (Muted Gray-Blue)

    * Accent: `#D4AF37` (Rich Amber/Gold)

### 4. Administrative Command Center: Admin Dashboard (`admin_dashboard.html`)

* **Access:** Login page (`username: admin`, `password: password123`).

* **Navigation:** Sidebar.

* **Data Management (In-Memory):**

    * **Messages:** View, mark read/unread, archive/unarchive.

        * Data Source: `messages.json`

    * **Bookings:** View, accept/reject. Accepted bookings update calendar.

        * Data Source: `booking_orders.json`

    * **Liquor Orders:** View, archive/unarchive.

        * Data Source: `liquor_orders.json`

    * **Calendar Manager:** Add, edit, delete events.

        * Data Source: `events_list.json`

    * **Gallery Manager:** Add, edit, delete image URLs/alt text.

        * Data Source: `images.json`

### 5. Anticipation Builder: Coming Soon Page (`rageni_coming_soon.html`)

* **Design:** Minimalist, clean, plain background.

* **Branding:** "Coming Soon" for "Rageni Agro Resort Pvt. Ltd."

* **Contact:** Phone: `9857622800`.

* **Icon:** Font Awesome leaf (`fa-solid fa-leaf`) with `pulse` animation.

## 🛠️ Technologies Used

* **HTML5:** Structure.

* **CSS3:** Styling, layout, animations.

* **Vanilla JavaScript:** Interactive logic, in-memory data handling.

* **Font Awesome (v6.7.2):** Icons.

* **Google Fonts:** `Inter`, `Playfair Display`, `Montserrat`.

* **Tailwind CSS (CDN):** For `rageni_coming_soon.html`.

## 🎨 Design Philosophy & Aesthetics

* **Color Palettes:**

    * **Main & Silver Palace:** Greens (`#2c5530`, `#8fbc8f`), accent (`#ff6b35`). Silver Palace specific: `#afbbeb`, hover `#7b96c8`.

    * **KG Suppliers:** Blues (`#1A3A5A`, `#4A6B8C`), gold accent (`#D4AF37`).

* **Responsiveness:** Fluid adaptation across devices.

* **Animations:** Subtle scroll effects (`0.8s ease`), interactive hovers (`0.3s ease`).

* **Typography:** Google Fonts for readability and hierarchy.

* **Minimalism:** Focused information display.

## 🚀 Getting Started (Local Setup)

1.  **Clone/Download:**

    ```bash
    git clone [Your Repository URL Here - if applicable]
    cd rageni-agro-resort-project

    ```

    *(Or download all files into a structured folder.)*

2.  **Project Structure:**

    ```
    your_project_root/
    ├── index.html
    ├── apps/
    │   ├── silver_palace.html
    │   ├── kg_suppliers.html
    │   ├── admin_dashboard.html
    │   └── rageni_coming_soon.html
    ├── styles/
    │   ├── index.css
    │   ├── silver_palace.css
    │   ├── kg_suppliers.css
    │   └── admin_dashboard.css
    ├── scripts/
    │   ├── index.js
    │   ├── silver_palace.js
    │   ├── kg_suppliers.js
    │   └── admin_dashboard.js
    ├── images/
    │   └── ... (site images)
    ├── messages.json
    ├── booking_orders.json
    ├── liquor_orders.json
    ├── events_list.json
    └── images.json

    ```

3.  **Create JSON Files:**
    Create the following JSON files in your project root (or adjust paths) with sample data:

    * `messages.json`

    * `booking_orders.json`

    * `liquor_orders.json`

    * `events_list.json`

    * `images.json`

4.  **Open in Browser:**
    Open any HTML file directly.

    * **Admin Dashboard Login:** `username: admin`, `password: password123`.

## 📈 Future Enhancements

* **Backend Integration:** Persistent data storage (database), secure authentication, email notifications, image uploads (cloud storage).

* **Advanced Features:** Calendar enhancements (drag-and-drop, recurring events), order tracking, user accounts.

* **API Integration:** Payment gateways, third-party services.

* **Performance:** Further optimizations.

* **SEO:** Enhanced meta tags, structured data.

## 🤝 Contributing

Contributions welcome. Open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

**© 2025 Rageni Agro Resort Pvt. Ltd. All rights reserved**
