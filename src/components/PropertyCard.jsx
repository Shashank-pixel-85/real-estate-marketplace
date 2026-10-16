import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Ruler, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function PropertyCard({ property, index = 0 }) {
  const { wishlist, comparison, toggleWishlist, toggleComparison } = useApp();
  const saved = wishlist.includes(property.id);
  const compared = comparison.includes(property.id);
  return <article className="property-card" style={{animationDelay:`${index * 70}ms`}}>
    <div className="property-photo"><Link to={`/properties/${property.id}`}><img src={property.image} alt={property.title} loading="lazy"/></Link><span className="property-tag">{property.tag}</span><div className="card-actions"><button className={saved ? "round-action selected" : "round-action"} onClick={() => toggleWishlist(property.id)} aria-label={saved ? "Remove from wishlist" : "Save property"}><Heart size={17} fill={saved ? "currentColor" : "none"}/></button><button className={compared ? "round-action selected" : "round-action"} onClick={() => toggleComparison(property.id)} aria-label={compared ? "Remove from comparison" : "Compare property"}><Scale size={17}/></button></div></div>
    <div className="property-body"><div className="price-line"><strong>{property.priceLabel}</strong><span className={property.type === "Rent" ? "type-pill rent" : "type-pill"}>{property.type === "Rent" ? "For rent" : "For sale"}</span></div><Link to={`/properties/${property.id}`} className="property-name"><h3>{property.title}</h3><ArrowUpRight size={17}/></Link><p className="property-location"><MapPin size={14}/>{property.location}</p><div className="property-specs"><span><BedDouble size={16}/>{property.beds} beds</span><span><Bath size={16}/>{property.baths} baths</span><span><Ruler size={16}/>{property.area.toLocaleString("en-IN")} sq ft</span></div></div>
  </article>;
}