import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownUp, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties } from "../data/properties.js";
import { getSubmittedProperties } from "../data/submittedProperties.js";

const PAGE_SIZE = 6;
export default function Listings() {
 const [params,setParams] = useSearchParams();
 const allProperties = useMemo(() => [...getSubmittedProperties(), ...properties], []);
 const [mobileFilters,setMobileFilters] = useState(false);
 useEffect(() => {
  if (!mobileFilters) return undefined;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const handleKeyDown = (event) => {
   if (event.key === "Escape") setMobileFilters(false);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => {
   document.body.style.overflow = previousOverflow;
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [mobileFilters]);
 const [type,setType] = useState(params.get("type") || "Any");
 const [beds,setBeds] = useState("Any");
 const [min,setMin] = useState("");
 const [max,setMax] = useState("");
 const [sort,setSort] = useState("recommended");
 const [page,setPage] = useState(1);
 const query = params.get("q") || "";
 const budget = params.get("budget") || "";
 const results = useMemo(()=>{
  let items = allProperties.filter((p)=>{
   const haystack = `${p.title} ${p.location} ${p.type} ${p.description}`.toLowerCase();
   const matchQuery = query.toLowerCase().split(/\s+/).filter(Boolean).every(word=>haystack.includes(word));
   const matchType = type==="Any" || p.type===type;
   const matchBeds = beds==="Any" || p.beds>=Number(beds);
   const matchMin = !min || p.price>=Number(min);
   const matchMax = !max || p.price<=Number(max);
   const matchBudget = !budget || (budget==="Under ₹1 Cr"&&p.price<10000000)||(budget==="₹1 Cr – ₹2 Cr"&&p.price>=10000000&&p.price<=20000000)||(budget==="₹2 Cr+"&&p.price>20000000)||(budget==="Under ₹50,000/mo"&&p.type==="Rent"&&p.price<50000);
   return matchQuery&&matchType&&matchBeds&&matchMin&&matchMax&&matchBudget;
  });
  if(sort==="low") items=[...items].sort((a,b)=>a.price-b.price);
  if(sort==="high") items=[...items].sort((a,b)=>b.price-a.price);
  if(sort==="area") items=[...items].sort((a,b)=>b.area-a.area);
  return items;
 },[allProperties,query,type,beds,min,max,sort,budget]);
 const pageCount=Math.max(1,Math.ceil(results.length/PAGE_SIZE));
 const visible=results.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
 function clear(){setType("Any");setBeds("Any");setMin("");setMax("");setSort("recommended");setParams({});setPage(1);}
 return <div className="page-shell"><section className="page-hero"><div className="container"><span className="eyebrow">The Estateora collection</span><h1>Find your <em>somewhere.</em></h1><p>Good spaces, thoughtfully selected. Your next chapter could be right here.</p></div></section>
 <section className="container listings-layout"><aside className={mobileFilters?"filters-panel filters-open":"filters-panel"}><div className="filters-title"><h2><SlidersHorizontal size={17}/> Refine your search</h2><button className="plain-button" onClick={clear}>Clear all</button><button className="filter-close" onClick={()=>setMobileFilters(false)} aria-label="Close filters"><X/></button></div>
  <div className="filter-group"><label htmlFor="listing-type">Listing type</label><select id="listing-type" value={type} onChange={e=>{setType(e.target.value);setPage(1)}}><option value="Any">Buy or rent</option><option value="Buy">For sale</option><option value="Rent">For rent</option></select></div>
  <div className="filter-group"><label htmlFor="beds">Bedrooms</label><select id="beds" value={beds} onChange={e=>{setBeds(e.target.value);setPage(1)}}><option value="Any">Any bedrooms</option><option value="1">1+ bedroom</option><option value="2">2+ bedrooms</option><option value="3">3+ bedrooms</option><option value="4">4+ bedrooms</option></select></div>
  <div className="filter-group"><label>Price range (₹)</label><div className="price-inputs"><input type="number" min="0" placeholder="Min price" value={min} onChange={e=>{setMin(e.target.value);setPage(1)}}/><input type="number" min="0" placeholder="Max price" value={max} onChange={e=>{setMax(e.target.value);setPage(1)}}/></div></div>
  <p className="filter-note">Demo listings and prices are sample data.</p><button className="button button-dark apply-filters" onClick={()=>setMobileFilters(false)}>Show {results.length} homes</button>
 </aside><div className="listing-results"><div className="results-toolbar"><div><button className="button button-outline mobile-filter-button" onClick={()=>setMobileFilters(true)}><SlidersHorizontal size={15}/> Filters</button><p><strong>{results.length} homes</strong> to explore{query?` for “${query}”`:""}</p></div><label className="sort-control"><ArrowDownUp size={15}/><select value={sort} onChange={e=>{setSort(e.target.value);setPage(1)}} aria-label="Sort listings"><option value="recommended">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="area">Largest area</option></select></label></div>
  {visible.length?<div className="property-grid listing-grid">{visible.map((p,index)=><PropertyCard key={p.id} property={p} index={index}/>)}</div>:<div className="empty-state"><span><SlidersHorizontal size={25}/></span><h2>No homes match just yet</h2><p>Try adjusting your search or clearing a few filters.</p><button className="button button-dark" onClick={clear}>Clear filters</button></div>}
  {results.length>PAGE_SIZE&&<div className="pagination"><span>Showing {(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,results.length)} of {results.length}</span><div><button disabled={page===1} onClick={()=>setPage(page-1)} aria-label="Previous page"><ChevronLeft size={17}/></button>{Array.from({length:pageCount},(_,i)=><button key={i} className={page===i+1?"current":""} onClick={()=>setPage(i+1)}>{i+1}</button>)}<button disabled={page===pageCount} onClick={()=>setPage(page+1)} aria-label="Next page"><ChevronRight size={17}/></button></div></div>}
 </div></section></div>;
}