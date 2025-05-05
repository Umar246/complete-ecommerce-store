// src/config/navigationData.js

export const navigationData = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/women/clothing/top",
          imageSrc:
            "https://www.cougar.com.pk/cdn/shop/files/FT2517-BEI_3.webp?v=1739882836&width=533",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "/women/clothing/t-shirt",
          imageSrc:
            "https://evacollections.pk/cdn/shop/files/EvaCollectionsTShirtsBundle.jpg?v=1735818522",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "top" },
            { name: "Dresses", id: "women_dress" },
            { name: "Women Jeans", id: "women_jeans" },
            { name: "Lengha Choli", id: "lengha_choli" },
            { name: "Sweaters", id: "sweater" },
            { name: "T-Shirts", id: "t-shirt" },
            { name: "Jackets", id: "jacket" },
            { name: "Gouns", id: "gouns" },
            { name: "Sarees", id: "saree" },
            { name: "Kurtas", id: "kurtas" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", id: "watch" },
            { name: "Wallets", id: "wallet" },
            { name: "Bags", id: "bag" },
            { name: "Sunglasses", id: "sunglasse" },
            { name: "Hats", id: "hat" },
            { name: "Belts", id: "belt" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", id: "full_nelson" },
            { name: "My Way", id: "my_way" },
            { name: "Re-Arranged", id: "re_arranged" },
            { name: "Counterfeit", id: "counterfeit" },
            { name: "Significant Other", id: "significant_other" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/men/clothing/mens_shirt",
          imageSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTydhrbe3QMJnOelrO65r-zPjg8A-rv2v-nHg&s",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "/men/clothing/mens_t-shirt",
          imageSrc: "data:image/jpeg;base64,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", // truncated
          imageAlt: "Three shirts arranged on table.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Mens Kurtas", id: "mens_kurta" },
            { name: "Shirt", id: "mens_shirt" },
            { name: "Men Jeans", id: "men_jeans" },
            { name: "Sweaters", id: "mens_sweater" },
            { name: "T-Shirts", id: "mens_t-shirt" },
            { name: "Jackets", id: "mens_jacket" },
            { name: "Activewear", id: "mens_activewear" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", id: "mens_watch" },
            { name: "Wallets", id: "mens_wallet" },
            { name: "Bags", id: "mens_bag" },
            { name: "Sunglasses", id: "mens_sunglasses" },
            { name: "Hats", id: "mens_hats" },
            { name: "Belts", id: "mens_belts" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", id: "re-arranged" },
            { name: "Counterfeit", id: "counterfeit" },
            { name: "Full Nelson", id: "full_nelson" },
            { name: "My Way", id: "my_way" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "/" },
    { name: "Stores", href: "/" },
  ],
};
