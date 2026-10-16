// Demo submissions are stored in this browser and merged with sample listings.
export function getSubmittedProperties() {
  try {
    const submissions = JSON.parse(localStorage.getItem("estateora-submissions") || "[]");
    if (!Array.isArray(submissions)) return [];

    return submissions.map((item, index) => {
      const createdAt = item.createdAt || String(index);
      const numericBeds = Number.parseInt(item.bedrooms, 10);
      const numericBaths = Number.parseInt(item.bathrooms, 10);
      const price = Number(item.price) || 0;
      const isRent = item.type === "Rent";
      const priceLabel = isRent
        ? `${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)}/mo`
        : price >= 10000000
          ? `₹${(price / 10000000).toFixed(2)} Cr`
          : `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price)}`;

      return {
        id: item.id || `submitted-${new Date(createdAt).getTime() || index}`,
        title: item.title || "Untitled property",
        location: item.location || "Location not provided",
        price,
        priceLabel,
        type: isRent ? "Rent" : "Buy",
        beds: Number.isFinite(numericBeds) ? numericBeds : 0,
        baths: Number.isFinite(numericBaths) ? numericBaths : 0,
        area: Number(item.area) || 0,
        tag: "Owner submitted",
        featured: false,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        gallery: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"],
        description: item.description || "This property was submitted through the Estateora demo form.",
        amenities: [],
        agentId: "maya",
        propertyType: item.propertyType || "Apartment",
        submittedBy: item.name || "Property owner",
        submittedEmail: item.email || "",
        submittedPhone: item.phone || "",
      };
    });
  } catch {
    return [];
  }
}
