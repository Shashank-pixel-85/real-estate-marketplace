import { useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
 const [keyword,setKeyword] = useState("");
 const [type,setType] = useState("Any type");
 const [budget,setBudget] = useState("Any budget");
 const navigate = useNavigate();
 function search(event) {
  event.preventDefault();
  const params = new URLSearchParams();
  if(keyword.trim()) params.set("q",keyword.trim());
  if(type !== "Any type") params.set("type",type);
  if(budget !== "Any budget") params.set("budget",budget);
  navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
 }
 return <form className="search-bar" onSubmit={search}>
  <label className="search-field location-field"><MapPin size={19}/><span><small>Location or keyword</small><input value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Try Bengaluru, villa..." aria-label="Location or keyword"/></span></label>
  <label className="search-field"><span><small>I'm looking to</small><select value={type} onChange={(e)=>setType(e.target.value)} aria-label="Listing type"><option>Any type</option><option>Buy</option><option>Rent</option></select></span><ChevronDown size={15}/></label>
  <label className="search-field"><span><small>Budget</small><select value={budget} onChange={(e)=>setBudget(e.target.value)} aria-label="Budget"><option>Any budget</option><option>Under ₹1 Cr</option><option>₹1 Cr – ₹2 Cr</option><option>₹2 Cr+</option><option>Under ₹50,000/mo</option></select></span><ChevronDown size={15}/></label>
  <button className="button button-dark search-submit"><Search size={17}/> Find a home</button>
 </form>;
}